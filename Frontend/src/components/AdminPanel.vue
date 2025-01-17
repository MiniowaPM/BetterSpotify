<template>
  <div class="admin-panel">
    <h1>Admin Panel</h1>
    <table class="user-table">
      <thead>
        <tr>
          <th>User Icon</th>
          <th>Username</th>
          <th>Status</th>
          <th>Edit/Confirm</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in users" :key="user.id">
          <td>
            <img :src="user.icon" alt="User icon" class="user-icon" />
          </td>
          <td>
            <input
              v-if="user.isEditing"
              v-model="user.username"
              class="username-input"
            />
            <span v-else>{{ user.username }}</span>
          </td>
          <td>
            <span v-if="!user.isEditing" class="admin-status">
              <span v-if="user.isAdmin">Admin</span>
              <span v-else>User</span>
            </span>
            <span v-if="user.isEditing && !canToggleAdmin(user)">Admin</span>
            <select
              v-if="user.isEditing && canToggleAdmin(user)"
              v-model="user.isAdmin"
              class="status-dropdown"
            >
              <option :value="true">Admin</option>
              <option :value="false">User</option>
            </select>
          </td>
          <td>
            <button
              class="edit-button"
              @click="toggleEditMode(idx)"
              :class="{ confirm: user.isEditing }"
            >
              {{ user.isEditing ? "Confirm" : "Edit" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUserImg, getUsersInStudio } from '@/utils/api_handler/user';

export default {
  name: "AdminPanel",
  data() {
    return {
      users: [
        {
          id: '',
          icon: '',
          username: '',
          isAdmin: Boolean,
          isEditing: false,
        },
      ],
    };
  },
  computed: {
    adminCount() {
      return this.users.filter((user) => user.isAdmin).length;
    },
  },
  async mounted(){
        const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
        const usersInStudio = await getUsersInStudio(loginToken)
        this.users = await Promise.all(usersInStudio.map(async (user) => {
            const userIcon = await getUserImg(user.id, loginToken)
            return {
                id: user.id,
                icon: `data:${userIcon.mime_type};base64,${userIcon.base64_data}`,
                username: user.username,
                isAdmin: user.is_admin,
            }
        }))
    },
  methods: {
    toggleEditMode(index) {
      const user = this.users[index];
      if (user.isEditing) {
        user.isEditing = false;
        console.log(`Changes confirmed for ${user.username}`);
      } else {
        user.isEditing = true;
      }
    },
    canToggleAdmin(user) {
        const adminCount = this.users.filter(u => u.isAdmin).length;
        return adminCount > 1 || !user.isAdmin;
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
</style>
