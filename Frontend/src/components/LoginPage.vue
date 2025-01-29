<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
  
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Username</label>
            <input
              v-model="login"
              type="login"
              id="login"
              required
              placeholder="Enter your username"
              class="input-field"
            />
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              class="input-field"
            />
          </div>
  
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  
          <button type="submit" class="submit-button">Login</button>
        </form>
  
        <p class="register-link">
          Don't have an account? 
          <router-link to="/register" class="register-link-text">Register</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ipcRenderer } from "electron";
  import { loginToken } from "@/utils/api_handler/user";

  export default {
    name: "LoginPage",
    setup() {
      const router = useRouter();
      const login = ref("");
      const password = ref("");
      const errorMessage = ref("");
  
      const handleLogin = async() => {
        const savedLoginToken = await loginToken(login.value,password.value);
        if (savedLoginToken && savedLoginToken.token_type == 'bearer' ) {
          // Successfully logged in, send a signal to Electron
          ipcRenderer.send("login-success", savedLoginToken);
          router.push("/"); // Navigate to the home page after successful login
        } else {
          errorMessage.value = "Invalid login or password";
        }
      };
      return {
        login,
        password,
        errorMessage,
        handleLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--background-color); /* Same background color as other pages */
  }
  
  .login-form {
    background-color: var(--background-second-color); /* Consistent with your other forms */
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    color: var(--primary-text-color); /* Use the same color for text as in other pages */
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-size: 1.1rem;
    color: var(--second-text-color); /* Same secondary color for labels */
    margin-bottom: 8px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    font-size: 1.1rem;
    border: 1px solid var(--background-hover-color);
    border-radius: 5px;
    background-color: var(--background-color);
    color: var(--text-color);
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .input-field:focus {
    border-color: var(--primary-color);
  }
  
  .error-message {
    color: var(--contrast-color); /* Make error message stand out */
    font-size: 1rem;
    margin-top: 10px;
    text-align: center;
  }
  
  .submit-button {
    width: 100%;
    padding: 12px;
    font-size: 1.2rem;
    background-color: var(--primary-color); /* Primary button color */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: var(--primary-hover-color); /* Hover effect for submit button */
  }
  
  .register-link {
    text-align: center;
    margin-top: 20px;
  }
  
  .register-link-text {
    color: var(--primary-color); /* Same primary color for the link */
    font-weight: bold;
    text-decoration: none;
  }
  
  .register-link-text:hover {
    text-decoration: underline; /* Underline on hover for the link */
  }
  </style>
  