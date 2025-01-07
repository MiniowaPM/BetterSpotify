<template>
  <div class="homepage">
    <img
      src="../assets/profilepicture.jpg"
      alt="User Avatar"
      class="avatarhome"
    />
    <h1 class="welcome">Welcome, nickname!</h1>
    <p class="msg">This is studio_name studio</p>
    <div class="features">
      <div class="feature">
        <router-link to="/my-collection">
          <i class="fa-solid fa-book"></i>
          <h2>My Collection</h2>
          <p class="description">
            Access and manage your personal collection effortlessly.
          </p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/explore">
          <i class="fa-solid fa-music"></i>
          <h2>Explore</h2>
          <p class="description">
            Stay updated with the latest and trending items.
          </p>
        </router-link>
      </div>
      <div class="feature">
        <router-link to="/cart">
          <i class="fa-solid fa-cart-shopping-fast"></i>
          <h2>Cart</h2>
          <p class="description">
            Make your shopping experience quick and effortless.
          </p>
        </router-link>
      </div>
      <div class="feature">
        <i class="fa-solid fa-star"></i>
        <h2>Favorites</h2>
        <p class="description">Quickly access your favorite items.</p>
      </div>
      <div class="feature">
        <i class="fa-solid fa-cog"></i>
        <h2>Settings</h2>
        <p class="description">Customize your experience and preferences.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.avatarhome {
  border-radius: 50%;
  width: 75px;
  height: auto;
}

.homepage {
  padding: 20px;
  text-align: center;
  color: var(--text-color);
}

.welcome {
  font-size: 2.5rem;
  margin-top: 15px;
  margin-bottom: 20px;
}

.msg,
.description {
  font-size: 1.2rem;
}

.msg {
  margin-bottom: 24px;
}

.description {
  margin-bottom: 20px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.feature {
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.feature i {
  margin-top: 10px;
  font-size: 2rem;
  color: var(--contrast-color);
  margin-bottom: 10px;
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1rem;
  color: var(--second-text-color);
}

.feature a {
  text-decoration: none;
  color: var(--text-color);
}
</style>
