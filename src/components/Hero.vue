

<template>
  <div class="hero-container">
    <div class="hero-text">
      <h2>If you want to laugh at some of the best Chuck Norris jokes,
        you’re in the right place.
      </h2>
      <router-link to="/jokes">
        <button>Get jokes</button>
      </router-link>
    </div>
    <div class="hero-image">
      <img src="../assets/images/hero-image.png" alt="hero image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
}
</script>