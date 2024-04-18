<template>
  <div class="w-75 mx-auto">
    <h1 class="text-center">Liste des bières</h1>
    <v-text-field
      v-model="search"
      label="Rechercher une bière"
      @input="searchBeers"></v-text-field>
    <div v-if="!loading && beersList.length">
      <ul>
      <li v-for="beer in beersList" :key="beer.id">
        <label>{{ beer.name }}</label>
        <p>{{ beer.price }}</p>
      </li>
      </ul>
      <v-pagination
          v-model="currentPage"
          :length="tailleListe"
          :total-visible="7"
          @click="paginate">
      </v-pagination>
    </div>
    <p v-if="loading">Chargement en cours...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { useBeersStore } from '~/store/store'

const {session, refresh, update, reset} = await useSession()


definePageMeta({
  middleware: async function(to, from) {
    const {session, refresh, update, reset} = await useSession()
    if (!session.value.connected) { // si l’utilisateur n’est pas connecté
      return navigateTo('/connexion');
    }
  },
});

const currentPage = ref(1)
const search = ref('')
const beersStore = useBeersStore()
const { fetchBeers, loading, error } = beersStore
const beersList = ref([])
const beersSearchList = ref([])
const tailleListe = ref(0)
await fetchBeers()


onMounted(async () => {
  beersList.value = beersStore.beersList
  beersSearchList.value = beersStore.beersList
  tailleListe.value = Math.ceil(beersList.value.length / 5)
  paginate()
})
function paginate() {
  const start = (currentPage.value - 1) * 5
  const end = start + 5
  beersList.value = beersSearchList.value.slice(start, end)
}

function searchBeers() {
  beersSearchList.value = beersStore.beersList.filter(beer => beer.name.toLowerCase().includes(search.value.toLowerCase()))
  tailleListe.value = Math.ceil(beersSearchList.value.length / 5)
  currentPage.value = 1
  paginate()
}


</script>

<style scoped>

label{
  margin-top: 15px;
  margin-bottom: 0;
}
p{
  margin-top: 0;
  margin-bottom: 15px;
  color: #666;
}

</style>