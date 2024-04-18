<script setup lang="ts">
const login = ref('')
const password = ref('')
const error = ref('')
const {session, refresh, update, reset} = await useSession()

function connexion() {
  if (!login.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
  } else {
    error.value = ''
    $fetch('/api/connexion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(login.value + ':' + password.value),
      }
    }).then((response) => {
      if (response.connecte) {
        update({connected: true , login: login.value})
        error.value = ''
        navigateTo('/profile')
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
  <div class="text-center w-50 mx-auto mt-13">
    <h1>Connexion</h1>
    <div class="w-50 mx-auto mt-13 d-flex flex-column">
      <v-text-field v-model="login" label="login" required></v-text-field>
      <v-text-field v-model="password" label="Mot de passe" required></v-text-field>
      <v-btn @click="connexion">Connexion</v-btn>
      <p v-if="error">{{ error }}</p>
    </div>
    <router-link to="inscription">Inscription</router-link>
  </div>
</template>

<style scoped>

</style>