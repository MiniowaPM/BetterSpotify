<template>
  <div class="profile-settings">
    <h1>{{ $t("profileSettings.title") }}</h1>
    <div class="profile-picture">
      <h2>{{ $t("profileSettings.profilePicture") }}</h2>
      <div class="profile-container">
        <img
          :src="user.icon"
          alt="Profile Picture"
          class="user-icon"
          @click="triggerFileInput"
        />
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          class="file-input"
          @change="updateProfilePicture"
        />
      </div>
    </div>
    <div class="username">
      <h2>{{ $t("profileSettings.username") }}</h2>
      <input
        v-model="user.username"
        class="username-input"
        :placeholder="$t('profileSettings.enterNewUsername')"
      />
    </div>
    <div class="password">
      <h2>{{ $t("profileSettings.password") }}</h2>
      <input
        v-model="user.password"
        type="password"
        class="password-input"
        :placeholder="$t('profileSettings.enterNewPassword')"
      />
    </div>
    <button class="save-button" @click="saveChanges">
      {{ $t("profileSettings.saveChanges") }}
    </button>
  </div>
</template>

<script>
import { patchUser } from '@/utils/api_handler/user';

export default {
  name: "ProfileSettings",
  data() {
    return {
      user: {
        icon: "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg",
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      //api tutaj na razie tablica
      this.user = {
        icon: "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg", // Example icon
        username: "",
        password: "",
      };
      // const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
      // this.user.icon = getUserImg('me', loginToken)
    },
    triggerFileInput() {
      const fileInput = this.$refs.fileInput;
      fileInput.click();
    },
    updateProfilePicture(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.icon = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveChanges() {
      if (!this.user.username.trim()) {
        alert("Username cannot be empty!");
        return;
      }

      if (this.user.password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
      }
      const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
      patchUser('me',loginToken,this.user.username, this.user.password, undefined)
      alert("Profile updated successfully!");
    },
  },
};
</script>

<style scoped>
.profile-settings {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: var(--text-color);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 10px;
}

.profile-picture {
  margin-bottom: 30px;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.user-icon {
  margin-top: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.file-input {
  display: none;
}

.username-input,
.password-input {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  text-align: center;
  outline: none;
}

.save-button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: var(--background-second-color);
  color: var(--text-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.save-button:hover {
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}

.save-button:disabled {
  background-color: var(--background-hover-color);
  color: var(--second-text-color);
  cursor: not-allowed;
  opacity: 0.6;
  border: 1px solid var(--background-hover-color);
}
</style>
