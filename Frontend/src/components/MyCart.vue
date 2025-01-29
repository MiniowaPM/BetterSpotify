<template>
  <div class="my-cart">
    <h1>{{ $t('myCart.title') }}</h1>
    <p v-if="cart.length === 0" class="empty-cart-text">
      {{ $t('myCart.emptyCart') }}
    </p>
    <div v-else>
      <div class="cart-items">
        <div
          v-for="(item, index) in cart"
          :key="index"
          class="cart-item"
          @click="viewAlbumDetail(item)"
        >
          <img :src="item.cover" alt="Album cover" class="album-cover" />
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p class="artist">{{ item.artist }}</p>
            <span class="price">{{ item.price }}zł</span>
          </div>
          <button class="remove-button" @click.stop="removeFromCart(index)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="cart-summary">
        <p class="balance">{{ $t('myCart.balance', { balance: userBalance }) }}</p>
        <p class="total">{{ $t('myCart.total', { total: cartTotal.toFixed(2) }) }}</p>
        <div class="actions">
          <button class="clear-button" @click="clearCart">{{ $t('myCart.clearCart') }}</button>
          <button 
            class="checkout-button"
            :disabled="!isAdmin || cartTotal > userBalance" 
            
            @click="checkout"
          >
            {{ cartTotal > userBalance ? $t('myCart.insufficientBalance') : $t('myCart.checkout') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWallet, postPurchaseAlbum } from '@/utils/api_handler/album';

export default {
  name: "MyCart",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      userBalance: '',
    };
  },
  async mounted(){
    try{
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      const UserWalletData = await getWallet(loginToken)
      this.userBalance = UserWalletData.wallet
    } catch(error){
      console.error('Error fetching user data:', error);
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    removeFromCart(index) {
      this.$emit("remove-from-cart", index);
    },
    clearCart() {
      this.$emit("clear-cart");
    },
    async checkout() {
      const loginToken = JSON.parse(sessionStorage.getItem('loginToken'));
      for (let album of this.cart){
        await postPurchaseAlbum(album.id, loginToken)
      }
      this.clearCart();
    },
    viewAlbumDetail(album) {
      this.$router.push({
        name: "AlbumDetail",
        params: { albumId: album.id },
        query: { showAddSong: false },
      });
    }
  },
};
</script>

<style scoped>
.my-cart {
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

.empty-cart-text {
  font-size: 1.2rem;
  color: var(--second-text-color);
}

.cart-items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: var(--background-second-color);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid var(--background-hover-color);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cart-item:hover {
  background-color: var(--background-color);
}

.album-cover {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 15px;
}

.item-info {
  flex: 1;
  text-align: left;
}

.item-info h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.item-info .artist {
  font-size: 1rem;
  color: var(--second-text-color);
}

.item-info .price {
  font-size: 1.1rem;
  font-weight: bold;
}

.remove-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--second-text-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.remove-button:hover {
  color: var(--contrast-color);
}

.cart-summary {
  text-align: left;
  background-color: var(--background-second-color);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--background-hover-color);
}

.cart-summary p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.clear-button,
.checkout-button {
  font-family: "Hanken Grotesk", sans-serif;
  padding: 10px 20px;
  background-color: var(--background-second-color);
  color: var(--text-color);
  border: 1px solid var(--background-hover-color);
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover,
.checkout-button:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.clear-button:hover {
  background-color: var(--background-color);
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}

.checkout-button:hover {
  background-color: var(--background-color);
  border-color: #4caf50;
  color: #4caf50;
}

.checkout-button:disabled {
  cursor: not-allowed;
}

.checkout-button:disabled:hover {
  border-color: var(--contrast-color);
  color: var(--contrast-color);
}
</style>
