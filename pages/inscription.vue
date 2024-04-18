<script setup lang="ts">
const login = ref('')
const password = ref('')
const error = ref('')
const {session, refresh, update, reset} = await useSession()

function inscription() {
  if (!login.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
  } else {
    error.value = ''
    $fetch('/api/inscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login: login.value, password: password.value})
    }).then((response) => {
      if (response.users) {
        error.value = ''
        navigateTo('/beers')
      } else {
        error.value = 'Login ou mot de passe incorrect'
      }
    }).catch((error) => {
      error.value = 'Erreur lors de la connexion'
    })
  }
}


</script>

<template>
  <div class="mt-13 text-center w-50 mx-auto">
    <h1>Inscription</h1>
    <div class="w-50 mx-auto mt-13 d-flex flex-column">
      <v-text-field v-model="login" label="login" required></v-text-field>
      <v-text-field v-model="password" label="Mot de passe" required></v-text-field>
      <v-btn @click="inscription">Inscription</v-btn>
      <p v-if="error">{{ error }}</p>
      <router-link to="connexion">Connexion</router-link>
    </div>

  </div>
</template>

<style scoped>

</style>