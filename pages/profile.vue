<script setup lang="ts">


const {session, refresh, update, reset} = await useSession()
const login = ref(session.value.login)

function deconnexion() {
  reset()
  navigateTo('/connexion')
}

function toBeers(){
  navigateTo('/beers')
}

definePageMeta({
  middleware: async function(to, from) {
    const {session, refresh, update, reset} = await useSession()
    if (!session.value.connected) { // si l’utilisateur n’est pas connecté
      return navigateTo('/connexion');
    }
  },
});

</script>

<template>
  <div class="text-center w-50 mx-auto mt-13">
    <h1>Profile</h1>
    <div class="w-50 mx-auto mt-13 d-flex flex-column">
      <v-btn @click="toBeers">Voir les bières</v-btn>
      <h3 class="mb-5 mt-5">{{login}}</h3>
      <v-btn @click="deconnexion">Deconnexion</v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>