<template>
  <div class="admin-panel">
    <h1>{{ $t('adminPanelSettings.title') }}</h1>
    <div class="studio-name">
      <span v-if="!isStudioNameEditing">{{ studioName }}</span>
      <input
        v-if="isStudioNameEditing"
        v-model="studioName"
        class="studio-name-input"
      />
      <button class="edit-studio-name-button" @click="toggleStudioNameEditMode">
        <i class="fa-solid fa-pen"></i>
      </button>
    </div>
    <button
      class="add-user-button"
      @click="addNewUser"
      :disabled="isAnyUserEditing"
    >
      {{ $t('adminPanelSettings.addNewUser') }}
    </button>
    <table class="user-table">
      <thead>
        <tr>
          <th>{{ $t('adminPanelSettings.userIcon') }}</th>
          <th>{{ $t('adminPanelSettings.username') }}</th>
          <th>{{ $t('adminPanelSettings.password') }}</th>
          <th>{{ $t('adminPanelSettings.status') }}</th>
          <th>{{ $t('adminPanelSettings.editConfirm') }}</th>
          <th>{{ $t('adminPanelSettings.delete') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="user.id">
          <td>
            <div class="profile-container">
              <img
                :src="user.icon"
                alt="User icon"
                class="user-icon"
                :style="{ cursor: user.isEditing ? 'pointer' : 'default' }"
                @click="user.isEditing && triggerFileInput(idx)"
              />
              <input
                type="file"
                accept="image/*"
                :ref="el => fileInputs[idx] = el"
                class="file-input"
                @change="updateProfilePicture($event, idx)"
              />
            </div>
          </td>
          <td>
            <input
              v-if="user.isEditing"
              v-model="user.username"
              class="username-input"
              :key="user.id"
            />
            <span v-else>{{ user.username }}</span>
          </td>
          <td>
            <input
              v-if="user.isEditing"
              type="password"
              v-model="user.password"
              placeholder="Enter new password"
              class="password-input"
            />
            <span v-else>*****</span>
          </td>
          <td>
            <span v-if="!user.isEditing" class="admin-status">
              <span v-if="user.isAdmin">{{ $t('adminPanelSettings.admin') }}</span>
              <span v-else>{{ $t('adminPanelSettings.user') }}</span>
            </span>
            <span v-if="user.isEditing && !canToggleAdmin(user)">{{ $t('adminPanelSettings.admin') }}</span>
            <select
              v-if="user.isEditing && canToggleAdmin(user)"
              v-model="user.isAdmin"
              class="status-dropdown"
            >
              <option :value="true">{{ $t('adminPanelSettings.admin') }}</option>
              <option :value="false">{{ $t('adminPanelSettings.user') }}</option>
            </select>
          </td>
          <td>
            <button
              class="edit-button"
              @click="toggleEditMode(idx)"
              :class="{ confirm: user.isEditing }"
              :disabled="!user.isEditing && isEditingAnyUser"
            >
              {{ user.isEditing ? $t('adminPanelSettings.confirm') : $t('adminPanelSettings.edit') }}
            </button>
          </td>
          <td>
            <button class="delete-button" @click="deleteUser(idx)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="newUser">
          <td>
            <img
            :src="newUser.icon"
            alt="User icon"
            class="user-icon"
            :style="{ cursor: 'pointer' }"
            @click="triggerFileInput('new')"
            />
            <input
            type="file"
            class="file-input"
            accept="image/*"
            :ref="el => fileInputs['new'] = el"
            @change="updateProfilePicture($event, 'new')"
            />
          </td>
          <td><input v-model="newUser.username" class="username-input" /></td>
          <td><input type="password" v-model="newUser.password" class="password-input" /></td>
          <td>
            <select v-model="newUser.isAdmin" class="status-dropdown">
              <option :value="true">{{ $t('adminPanelSettings.admin') }}</option>
              <option :value="false">{{ $t('adminPanelSettings.user') }}</option>
            </select>
          </td>
          <td>
            <button class="edit-button confirm" @click="confirmAddUser()">
              {{ $t('adminPanelSettings.confirm') }}
            </button>
          </td>
          <td>
            <button class="delete-button" @click="newUser = null">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { patchStudio } from "@/utils/api_handler/album";
import { deleteUser, getUserImg, getUsersInStudio, patchUser, postUser } from "@/utils/api_handler/user";

export default {
  name: "AdminPanel",
  data() {
    return {
      studioName: "STudioooo",
      isStudioNameEditing: false,
      users: [
        {
          id: "",
          icon: "",
          username: "",
          password: "",
          isAdmin: Boolean,
          isEditing: false,
        },
      ],
      newUser: null,
      fileInputs: {},
    };
  },
  mounted() {
    this.fetchUserData()
    window.addEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    async fetchUserData(){
      const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
      const usersInStudio = await getUsersInStudio(loginToken);
      this.users = await Promise.all(
        usersInStudio.map(async (user) => {
          const userIcon = await getUserImg(user.id, loginToken);
          return {
            id: user.id,
            icon: `data:${userIcon.mime_type};base64,${userIcon.base64_data}`,
            username: user.username,
            password: "",
            isAdmin: user.is_admin,
            studioFk: user.studio_fk,
          };
        })
      );
    },
    handleKeyDown(event) {
      if (event.ctrlKey && event.key === "u") {
        event.preventDefault();
        this.addNewUser();
      }
    },
    toggleStudioNameEditMode() {
      this.isStudioNameEditing = !this.isStudioNameEditing;
      if (this.isStudioNameEditing == false){
        const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
        patchStudio(this.users.at(1).studioFk, loginToken, this.studioName, undefined);
      }
    },
    async toggleEditMode(index) {
      if (this.newUser) {
        this.confirmAddUser();
        return;
      }

      const user = this.users[index];

      if (!user.username.trim()) {
        alert("Username cannot be empty!");
        return;
      }

      const duplicate = this.users.some(
        (u, i) => u.username === user.username && i !== index
      );
      if (duplicate) {
        alert("Username is already taken!");
        return;
      }

      if (user.isEditing) {
        if (user.password.length < 6) {
          alert("Password must be at least 6 characters.");
          return;
        }
        user.isEditing = false;
        const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
        await patchUser(user.id, loginToken, user.username, user.password, user.isAdmin);
        this.fetchUserData();
      } else {
        user.isEditing = true;
      }
    },
    canToggleAdmin(user) {
      const adminCount = this.users.filter((u) => u.isAdmin).length;
      return adminCount > 1 || !user.isAdmin;
    },
    addNewUser() {
      if (this.newUser) return;
      this.newUser = {
        id: "",
        icon: "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg",
        username: "",
        password: "",
        isAdmin: false,
        isEditing: true,
      };
    },
    confirmAddUser() {
      if (!this.newUser.username.trim()) {
        alert("Username cannot be empty!");
        return;
      }

      const duplicate = this.users.some(user => user.username === this.newUser.username);
      if (duplicate) {
        alert("Username is already taken!");
        return;
      }

      if (this.newUser.password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      if (this.newUser) {
        this.newUser.isEditing = false;
        const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
        postUser(this.newUser.username, this.newUser.password, loginToken);
        this.fetchUserData();
        this.newUser = null;
      }
    },
    deleteUser(index) {
      const user = this.users[index];
      if (user.isAdmin) {
        alert("You cannot delete an admin user.");
        return;
      }
      if (confirm("Are you sure you want to delete this user?")) {
        const loginToken = JSON.parse(sessionStorage.getItem("loginToken"));
        deleteUser(user.id, loginToken);
        this.fetchUserData();
      }
    },
    triggerFileInput(index) {
      if (this.fileInputs[index]) {
        this.fileInputs[index].click();
      }
    },
    updateProfilePicture(event, index) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (index === "new") {
          this.newUser.icon = e.target.result; 
        } else {
          this.users[index].icon = e.target.result; 
        }
      };
      reader.readAsDataURL(file);
    },
  },
  computed: {
    isAnyUserEditing() {
    return this.users.some((user) => user.isEditing);
    },
    isEditingAnyUser() {
      return this.users.some((user) => user.isEditing);
    },
  },
};
</script>

<style scoped>
.admin-panel {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--text-color);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.add-user-button {
  padding: 10px 20px;
  margin-bottom: 20px;
  font-family: "Hanken Grotesk", sans-serif;
  background-color: var(--background-second-color);
  color: var(--text-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.add-user-button:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  white-space: nowrap;
  width: 25%;
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid var(--background-hover-color);
}

.user-table th {
  background-color: var(--background-second-color);
}

.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.admin-status {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.username-input,
.status-dropdown {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  font-size: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  text-align: center;
  outline: none;
}

.status-dropdown {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100px;
}

.edit-button {
  padding: 10px 20px;
  font-family: "Hanken Grotesk", sans-serif;
  background-color: var(--background-second-color);
  color: var(--text-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.edit-button:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}

.edit-button.confirm {
  background-color: var(--background-second-color);
  color: var(--text-color);
  border: 1px solid var(--background-hover-color);
}

.edit-button.confirm:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--background-color);
  border-color: #4caf50;
  color: #4caf50;
}

.file-input {
  display: none;
}

.edit-button:disabled {
  background-color: var(--background-hover-color);
  color: var(--second-text-color);
  cursor: not-allowed;
  opacity: 0.6;
  border: 1px solid var(--background-hover-color);
  transition: all 0.3s ease;
}

.edit-button:disabled:hover {
  background-color: var(--background-hover-color);
  color: var(--second-text-color);
  box-shadow: none;
  border-color: var(--background-hover-color);
}

.delete-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--second-text-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.delete-button:hover {
  color: var(--contrast-color);
}

.password-input {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  font-size: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  text-align: center;
  outline: none;
}

.studio-name {
  margin-bottom: 20px;
}

.studio-name span {
  font-size: 1.2rem;
  margin-right: 10px;
}

.studio-name-input {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px;
  margin-right: 13px;
  font-size: 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  color: var(--text-color);
  text-align: center;
  outline: none;
  width: 200px;
}

.edit-studio-name-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.edit-studio-name-button:hover {
  color: var(--contrast-color);
}

.add-user-button:disabled {
  background-color: var(--background-hover-color);
  color: var(--second-text-color);
  cursor: not-allowed;
  opacity: 0.6;
  border: 1px solid var(--background-hover-color);
  transition: all 0.3s ease;
}

.add-user-button:disabled:hover {
  background-color: var(--background-hover-color);
  color: var(--second-text-color);
  box-shadow: none;
  border-color: var(--background-hover-color);
}
</style>
