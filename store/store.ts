import { defineStore } from 'pinia'

export const useBeersStore = defineStore('beers', {
    state: () => ({
        beers: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchBeers() {
            this.loading = true;
            try {
                const response = await fetch('https://api.sampleapis.com/beers/ale');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                this.beers = data;
            } catch (error) {
                this.error = error as any;
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        beersList: state => state.beers,

    },
})
