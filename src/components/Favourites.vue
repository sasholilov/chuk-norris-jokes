<template>
  <h2 class="message" v-if="areThereFavouritesJokes">There aren't favourites jokes</h2>
  <div class="card-container">
      <Card v-for="joke in favouriteList" :joke="joke" @deleteJoke="deleteJoke"/>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import {useStore} from "@/store/store.js";

export default {
  name: "Favourites",
  components: {Card},
  computed: {
    store() {
      return useStore()
    },
    favouriteList() {
      //return this.$store.getters.getFavorites;
      return this.store.getFavorites;
    },
    areThereFavouritesJokes() {
      //return this.$store.getters.getFavorites.length === 0;
      return this.store.getFavorites.length === 0;
    }
  }
  ,
  methods: {
    deleteJoke(id) {
      //this.$store.dispatch("deleteFromFavourites", id);
      this.store.deleteFromFavourites(id);
    }
  }
}
</script>