<template>
  <h2 class="message" v-if="isFavouritesJokes">There aren't favourites jokes</h2>
  <div class="card-container">
      <Card v-for="joke in favouriteList" :joke="joke" @deleteJoke="deleteJoke"/>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Favourites",
  components:{Card},
  computed: {
    favouriteList() {
      return this.$store.getters.getFavorites;
    },
    isFavouritesJokes(){
      return this.$store.getters.getFavorites.length === 0;
    }
  }
  ,
  methods: {
    deleteJoke(id) {
      this.$store.dispatch("deleteFromFavourites", id);
    }
  }
}
</script>