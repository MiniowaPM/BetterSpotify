<template>
  <div class="loginT">
    <h1>Logowanie</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Nazwa użytkownika" required />
      <input v-model="password" type="password" placeholder="Hasło" required />
      <button type="submit">Zaloguj</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        // Przykład wywołania API do logowania
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          this.$router.push('/home'); // Przekierowanie po zalogowaniu
        } else {
          this.errorMessage = data.message; // Wyświetlenie błędu
        }
      } catch (error) {
        this.errorMessage = 'Wystąpił błąd podczas logowania.';
      }
    },
  },
};
</script>

<style>
.loginT {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
