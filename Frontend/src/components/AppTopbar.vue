<template>
  <header class="top-bar">
    <div class="back-forward-buttons">
      <button id="backButton" class="back-btn" @click="goBack" aria-label="Go Back">
        <img src="../assets/back-arrow.png" alt="Back" width="15" height="15" />
      </button>
      <button id="forwardButton" class="forward-btn" @click="goForward" aria-label="Go Forward">
        <img src="../assets/forward-arrow.png" alt="Forward" width="15" height="15" />
      </button>
    </div>
    <input type="text" class="search-box" placeholder="Search..." aria-label="Search" />
    <div class="control-buttons">
      <button id="maximizeButton" class="maximize-btn" @click="toggleMaximize" aria-label="Maximize">
        <img src="../assets/maximize.png" alt="Maximize" width="15" height="15" />
      </button>
      <button id="minimizeButton" class="minimize-btn" @click="minimize" aria-label="Minimize">
        <img src="../assets/minimize.png" alt="Minimize" width="15" height="15" />
      </button>
      <button id="closeButton" class="close-btn" @click="closeApp" aria-label="Close">
        <img src="../assets/close.png" alt="Close" width="15" height="15" />
      </button>
    </div>
  </header>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "AppTopbar",
  methods: {
    goBack() {
      ipcRenderer.send("go-back");
    },
    goForward() {
      ipcRenderer.send("go-forward");
    },
    toggleMaximize() {
      ipcRenderer.send("toggle-maximize");
    },
    minimize() {
      ipcRenderer.send("minimize");
    },
    closeApp() {
      ipcRenderer.send("close-app");
    },
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  background-color: #171719;
  padding: 10px 20px;
  app-region: drag;
}

.back-forward-buttons,
.control-buttons,
.search-box {
  app-region: no-drag;
}

.back-forward-buttons,
.control-buttons {
  display: flex;
  align-items: center;
  gap: 15px;
  border: none;
  border-radius: 50px;
  padding: 10px;
  background-color: #202022;
}

.search-box {
  background-color: #202022;
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  color: #fffafa;
  outline: none;
  width: 30%;
  max-width: 350px;
  font-size: 14px;
}

.back-btn,
.forward-btn,
.control-buttons button {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>