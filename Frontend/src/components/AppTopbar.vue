<template>
  <header class="top-bar">
    <div class="side-controls left-controls">
      <div class="back-forward-buttons">
        <button
          id="backButton"
          class="back-btn"
          @click="goBack"
          :aria-label="$t('goBack')"
        >
          <i class="fa-regular fa-chevron-left" :alt="$t('goBack')"></i>
        </button>
        <button
          id="forwardButton"
          class="forward-btn"
          @click="goForward"
          :aria-label="$t('goForward')"
        >
          <i class="fa-regular fa-chevron-right" :alt="$t('goForward')"></i>
        </button>
      </div>
    </div>
    <input
      type="text"
      class="search-box"
      :placeholder="$t('searchPlaceholder')"
      aria-label="$t('searchPlaceholder')"
    />
    <div class="side-controls right-controls">
      <div class="wallet">
        <button
          id="walletButton"
          class="wallet-btn"
          @click="toggleWalletInfo"
          :aria-label="$t('wallet')"
        >
          <i class="fa-solid fa-wallet"></i>
        </button>
        <div v-if="isWalletInfoVisible" class="wallet-info">
          <div class="wallet-balance">
            <p id="balance-headline">{{ $t('accountBalance') }}</p>
            <div class="balance-row">
              <p>{{ studioBalance }}zł</p>
              <button class="add-funds-btn" @click="addFunds" v-if="isAdmin">
                <i class="fa-solid fa-circle-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="control-buttons">
        <button
          id="minimizeButton"
          class="minimize-btn"
          @click="minimize"
          :aria-label="$t('minimize')"
        >
          <i class="fa-thin fa-window-minimize" :alt="$t('minimize')"></i>
        </button>
        <button
          id="maximizeButton"
          class="maximize-btn"
          @click="toggleMaximize"
          :aria-label="$t('maximize')"
        >
          <i class="fa-light fa-expand" :alt="$t('maximize')"></i>
        </button>
        <button
          id="closeButton"
          class="close-btn"
          @click="closeApp"
          :aria-label="$t('close')"
        >
          <i class="fa-light fa-xmark" :alt="$t('close')"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "AppTopbar",
  data() {
    return {
      isWalletInfoVisible: false,
      studioBalance: 0,
      isAdmin: false
    };
  },
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
    toggleWalletInfo() {
      this.isWalletInfoVisible = !this.isWalletInfoVisible;
    },
    addFunds() {
      if (this.studioBalance + 50 > 10000) {
        alert(`Cannot add more funds. Maximum balance is 10000.`);
      } else {
        this.studioBalance += 50;
      }
    },
    handleOutsideClick(event) {
      const walletInfoElement = this.$el.querySelector('.wallet-info');
      const controlButtonsElement = this.$el.querySelector('.control-buttons');
      if (
        walletInfoElement &&
        !walletInfoElement.contains(event.target) &&
        !event.target.closest('.wallet-btn') &&
        !controlButtonsElement.contains(event.target)
      ) {
        this.isWalletInfoVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
};
</script>

<style>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-second-color);
  padding: 18px;
  position: fixed;
  top: 0;
  left: 200px;
  width: calc(100% - 200px);
  z-index: 1000;
  app-region: drag;
}

.left-controls,
.right-controls {
  display: flex;
  align-items: center;
  app-region: no-drag;
}

.back-forward-buttons,
.control-buttons,
.wallet {
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  border-radius: 25px;
}

.search-box {
  font-family: "Hanken Grotesk", serif;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--background-color);
  border: none;
  border-radius: 25px;
  padding: 10px 15px;
  color: var(--text-color);
  font-size: 15px;
  outline: none;
  width: 30%;
  max-width: 350px;
  app-region: no-drag;
}

.back-btn,
.forward-btn,
.wallet-btn,
.control-buttons button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-color);
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.back-btn,
.forward-btn,
.minimize-btn,
.maximize-btn,
.wallet-btn,
.close-btn {
  transition: background-color 0.3s ease;
  border-radius: 25px;
}

.back-btn:hover,
.forward-btn:hover,
.minimize-btn:hover,
.maximize-btn:hover,
.close-btn:hover,
.wallet-btn:hover {
  background-color: var(--background-hover-color);
}

.wallet {
  position: relative;
  color: var(--text-color);
  height: 40px;
  width: 40px;
  margin-right: 10px;
  cursor: default;
  white-space: nowrap;
}

.wallet-info {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 15px;
  padding: 10px;
  white-space: nowrap;
  z-index: 1000;
}

.wallet-balance {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#balance-headline {
  font-weight: bold;
}

.balance-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.add-funds-btn {
  background: none;
  color: var(--contrast-color);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s ease;
}

.add-funds-btn:hover {
  color: var(--contrast-hover-color);
}
</style>
