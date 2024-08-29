<template>
  <div class="jokes-container">
    <div class="joke-actions">
      <select v-model="category">
        <option value="" disabled selected>Choose category</option>
        <option v-for="cat in categories" :value="cat">{{toCapitalize(cat)}}</option>
      </select>
      <button @click="newJoke">Get another one
        <span class="from-category">from {{category ? category : 'random'}} category</span>
      </button>
    </div>
    <Spinner v-if="loading" />
    <div v-else class="joke">
      <p>{{joke.jokeText}}</p>
      <i class="fa fa-star" :class="{'active':isFavorite}" @click="toFavorites(joke)"></i>
    </div>
  </div>
</template>


<!--Composition API-->
<script setup>
import {useStore} from "@/store/store.js";
import Spinner from "@/components/Spinner.vue";
import {ref, computed, onMounted,} from "vue";

const category = ref('');
const store = useStore();

const newJoke = function() {
  store.fetchJoke(category.value);
}

const toCapitalize = function (text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const toFavorites = function(joke){
  store.addToFavourites(joke);
}

const joke = computed (() =>  store.getJoke);
const categories = computed(() =>  store.getCategories );
const loading = computed(() =>  store.getLoading);
const isFavorite = computed(()=> store.getIsFavorite);

onMounted(()=>{
  store.fetchJoke();
  store.fetchCategories();
})

</script>

<!--Options API-->
<!--<script>-->
<!--import {useStore} from "@/store/store.js";-->
<!--import Spinner from "@/components/Spinner.vue";-->

<!--export default {-->
<!--  name: "Jokes",-->
<!--  components:{Spinner},-->
<!--  data() {-->
<!--    return {-->
<!--      category: '',-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    newJoke() {-->
<!--      //this.$store.dispatch("fetchJoke", this.category)-->
<!--      this.store.fetchJoke(this.category)-->

<!--    },-->
<!--    toCapitalize(text) {-->
<!--      return `${text[0].toUpperCase()}${text.slice(1)}`;-->
<!--    },-->
<!--    toFavorites (joke) {-->
<!--      //this.$store.dispatch("addToFavourites", joke)-->
<!--      this.store.addToFavourites(joke)-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    store() {-->
<!--      return useStore()-->
<!--    },-->
<!--    joke() {-->
<!--      //return this.$store.getters.getJoke;-->
<!--      return this.store.getJoke;-->
<!--    },-->
<!--    categories() {-->
<!--      //return this.$store.getters.getCategories;-->
<!--      return this.store.getCategories;-->
<!--    },-->
<!--    loading() {-->
<!--      //return this.$store.getters.getLoading;-->
<!--      return this.store.getLoading;-->
<!--    },-->
<!--    isFavorite(){-->
<!--      //return this.$store.getters.getIsFavorite;-->
<!--      return this.store.getIsFavorite;-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--   //this.$store.dispatch("fetchJoke");-->
<!--   //this.$store.dispatch("fetchCategories");-->
<!--    this.store.fetchJoke();-->
<!--    this.store.fetchCategories()-->
<!--  }-->
<!--}-->
<!--</script>-->
