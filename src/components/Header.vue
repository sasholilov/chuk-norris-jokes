<template>
<header>
  <nav>
    <div class="logo-wrapper">
      <router-link to="/">
        <img src="../assets/images/logo.png" alt="logo"/>
      </router-link>
    </div>
    <div class="menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/jokes">Jokes</router-link></li>
        <li><router-link to="/favourites">Favourites</router-link></li>
      </ul>
    </div>
  </nav>
</header>
</template>

<script>
export default {
  name: "Header",
}
</script>