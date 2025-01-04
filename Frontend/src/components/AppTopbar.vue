<template>
  <header class="top-bar">
    <div class="back-forward-buttons">
      <button id="backButton" class="back-btn" @click="goBack" aria-label="Go Back">
        <i class="fa-regular fa-chevron-left" alt="Back"></i>
      </button>
      <button id="forwardButton" class="forward-btn" @click="goForward" aria-label="Go Forward">
        <i class="fa-regular fa-chevron-right" alt="Forward"></i>
      </button>
    </div>
    <input type="text" class="search-box" placeholder="Search..." aria-label="Search" />
    <div class="control-buttons">
      <button id="minimizeButton" class="minimize-btn" @click="minimize" aria-label="Minimize">
        <i class="fa-regular fa-window-minimize" alt="Minimize"></i>
      </button>
      <button id="maximizeButton" class="maximize-btn" @click="toggleMaximize" aria-label="Maximize">
        <i class="fa-regular fa-expand" alt="Maximize"></i>
      </button>
      <button id="closeButton" class="close-btn" @click="closeApp" aria-label="Close">
        <i class="fa-regular fa-xmark" alt="Close"></i>
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

<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  background-color: #171719;
  padding: 18px 18px;
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
  background-color: #202022;
  border-radius: 50px;
}

.search-box {
  background-color: #202022;
  border: none;
  border-radius: 50px;
  padding: 10px 15px;
  color: #fffafa;
  font-size: 15px;
  outline: none;
  width: 30%;
  max-width: 350px;
}

.back-btn,
.forward-btn,
.control-buttons button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  color: #fffafa;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.back-btn:hover,
.forward-btn:hover,
.minimize-btn:hover,
.maximize-btn:hover,
.close-btn:hover {
  background-color: #2a2a2d;
  border-radius: 25px;
}
</style>