<template>
    <aside class="sidebar">
      <div class="profile">
        <img src="/profilepicture.jpg" alt="User Avatar" class="avatar" />
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">My Collection</a></li>
          <li><a href="#">New Releases</a></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    name: "AppSidebar",
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #202022;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
  
  .profile {
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  nav li {
    margin: 20px 0;
    text-align: left;
  }
  
  nav a {
    text-decoration: none;
    color: #fffafa;
    font-size: 20px;
    font-weight: 700;
    display: block;
    padding: 5px 10px;
  }
  
  nav a:hover {
    background-color: #2a2a2d;
    border-radius: 5px;
  }
  </style>
  