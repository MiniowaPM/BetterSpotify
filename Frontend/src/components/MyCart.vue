<template>
    <div class="my-cart">
      <h1>Your Cart</h1>
      <div v-if="cart.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <div v-for="(album, idx) in cart" :key="idx" class="cart-item">
          <img :src="album.cover" alt="Album cover" class="cart-cover" />
          <div class="cart-details">
            <h3>{{ album.title }}</h3>
            <p>{{ album.artist }}</p>
            <span>{{ album.price }}zł</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyCart",
    props: ["cart"],
  };
  </script>
  
  <style scoped>
    .my-cart {
      padding: 20px;
      text-align: center;
      color: var(--text-color);
    }
  
    .cart-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .cart-cover {
      width: 50px;
      height: auto;
      margin-right: 20px;
    }
  
    .cart-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  
    .cart-item h3 {
      margin: 0;
    }
  
    .cart-item p {
      font-size: 1rem;
      color: var(--second-text-color);
    }
  
    .cart-item span {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--primary-color);
    }
  </style>  