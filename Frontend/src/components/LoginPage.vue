<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      login() {
        const validUsername = "123";
        const validPassword = "123";
  
        if (this.username === validUsername && this.password === validPassword) {
          // Proceed to main app screen
          this.$router.push({ name: "home" });  // Or show main window in Electron
        } else {
          this.errorMessage = "Invalid username or password.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  .error-message {
    color: red;
    font-size: 0.9rem;
  }
  </style>  