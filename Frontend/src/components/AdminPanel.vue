<template>
    <div class="admin-panel">
        <div class="table-grid">
            <div class="grid-row">
                <div class="user-icon"></div>
                <div class="username"></div>
                <div class="is-admin"></div>
                <div class="select-action-button"></div>
            </div>
            <div class="grid-header">
                <div class="user-icon">User Icon</div>
                <div class="username">Username</div>
                <div class="is-admin">Permisions</div>
                <div class="select-action-button">Confirm/Edit</div>
            </div>
            <div class="grid-row" v-for="user in users" :key="user.id">
                <div class="user-icon"><img :src="user.icon" alt="user-icon"></div>
                <div class="username">{{ user.username }}</div>
                <div class="is-admin">{{ user.isAdmin ? 'Admin' : 'User' }}</div>
                <div class="select-action-button">
                    <button @click="handleAction(user.id)"> Confirm/Edit </button> 
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserImg, getUsersInStudio } from '@/utils/api_handler/user';

export default {
    name : "AdminPanel",
    data() {
        return {
            users: [
                {
                id: '',
                icon: '',
                username: '',
                isAdmin: Boolean,
                },
            ],
        };
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
        handleAction(userId) {
            alert(`Action triggered for ${userId}`);
        },
    },
};
</script>
<style>
.admin-panel {
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.table-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 1fr;
    gap: 8px;
    width: 100%;
    align-items: center;
}

.grid-header {
    font-weight: bold;
    text-align: left;
    display: contents;
    padding: 8px 0;
}

.grid-row {
    display: contents;
    padding: 8px 0;
}

.user-icon img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.username {
    display: flex;
    align-items: center;
    padding: 0 8px;
}

.is-admin {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
}

.select-action-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

button {
    padding: 6px 12px;
    border: 1px solid white;
    border-radius: 4px;
    cursor: pointer;
}

hr {
    grid-column: span 4;
    width: 100%;
    border: none;
    border-top: 1px solid white;
    margin: 8px 0;
}
</style>