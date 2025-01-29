<template>
  <div class="login-container">
    <div class="login-form">
      <h2>{{ isRegistering ? "Register" : "Login" }}</h2>

      <form @submit.prevent="handleFormSubmit">
        <div class="form-group">
          <label for="username">{{
            isRegistering ? "Username" : "Login"
          }}</label>
          <input
            v-model="login"
            type="text"
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

        <div v-if="isRegistering">
          <div class="form-group">
            <label for="studioName">Studio Name</label>
            <input
              v-model="studioName"
              type="text"
              id="studioName"
              required
              placeholder="Enter your studio name"
              class="input-field"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <button type="submit" class="submit-button">
          {{ isRegistering ? "Register" : "Login" }}
        </button>
      </form>

      <p class="register-link">
        {{
          isRegistering ? "Already have an account?" : "Don't have an account?"
        }}
        <a @click.prevent="toggleForm" class="register-link-text">
          {{ isRegistering ? "Login" : "Register" }}
        </a>
      </p>
    </div>

    <!-- Terms of Use button -->
    <div class="terms-button">
      <button @click="openTermsOfUse" class="terms-button-icon">
        <i class="fas fa-file-alt"></i>
        <!-- Icon for Terms of Use -->
      </button>
    </div>

    <!-- Modal for Terms of Use -->
    <div v-if="showTermsModal" class="terms-modal">
      <div class="modal-content">
        <span class="close" @click="closeTermsOfUse">&times;</span>
        <h3>Terms of Use</h3>
        <div class="terms-content">
          <!-- Display Terms of Use content from text -->
          <pre>{{ termsOfUse }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";

export default {
  name: "AuthPage",
  setup() {
    const router = useRouter();
    const login = ref("");
    const password = ref("");
    const studioName = ref(""); // Added for registration
    const errorMessage = ref("");
    const isRegistering = ref(false); // State to toggle between login and register
    const showTermsModal = ref(false); // Modal visibility for Terms of Use
    const termsOfUse = ref(""); // Store Terms of Use text

    const fetchTermsOfUse = () => {
        ipcRenderer.invoke("read-terms-file").then((data) => {
            termsOfUse.value = data;
        }).catch((error) => {
            console.error(error);
            termsOfUse.value = "Error loading Terms of Use.";
        });
    };

    // Open the Terms of Use modal
    const openTermsOfUse = () => {
      fetchTermsOfUse();
      showTermsModal.value = true;
    };

    // Close the Terms of Use modal
    const closeTermsOfUse = () => {
      showTermsModal.value = false;
    };

    const handleFormSubmit = () => {
      if (isRegistering.value) {
        // Handle registration logic here
        if (login.value && password.value && studioName.value) {
          console.log(
            "Registered with:",
            login.value,
            password.value,
            studioName.value
          );
          // Simulate successful registration
          ipcRenderer.send("register-success");
          router.push("/"); // Redirect after registration
        } else {
          errorMessage.value = "All fields are required for registration.";
        }
      } else {
        // Handle login logic here
        if (login.value === "posac" && password.value === "password123") {
          // Successfully logged in, send a signal to Electron
          ipcRenderer.send("login-success");
          router.push("/"); // Navigate to the home page after successful login
        } else {
          errorMessage.value = "Invalid login or password";
        }
      }
    };

    const toggleForm = () => {
      isRegistering.value = !isRegistering.value; // Toggle the form between login and register
    };

    return {
      login,
      password,
      studioName,
      errorMessage,
      isRegistering,
      handleFormSubmit,
      toggleForm,
      openTermsOfUse,
      closeTermsOfUse,
      showTermsModal,
      termsOfUse,
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
  background-color: var(
    --background-color
  ); /* Same background color as other pages */
}

.login-form {
  background-color: var(
    --background-second-color
  ); /* Consistent with your other forms */
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
  color: var(
    --primary-text-color
  ); /* Use the same color for text as in other pages */
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
  background-color: var(
    --primary-hover-color
  ); /* Hover effect for submit button */
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
.terms-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.terms-button-icon {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
}

.terms-button-icon:hover {
  background-color: var(--primary-hover-color);
}

/* Modal for Terms of Use */
.terms-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  overflow-y: auto;
}

.close {
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.terms-content {
  white-space: pre-wrap;
  font-size: 1rem;
  color: #333;
  margin-top: 20px;
}
</style>
