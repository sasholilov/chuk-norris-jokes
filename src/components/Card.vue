<template>
  <div class="card">
  <p>{{ joke.jokeText }}</p>
  <i class="fa fa-star" :class="{'active':joke.isFav}" @click="handleDeleteJoke"></i>
  </div>
</template>


<!--Composition API-->
<script setup>
import {defineEmits, defineProps} from 'vue'
const emit = defineEmits(['deleteJoke']);
const props = defineProps(['joke']);
const handleDeleteJoke = function () {
  emit('deleteJoke', props.joke.id);
}
</script>

<!--Options API-->
<!--<script>-->
<!--export default {-->
<!--  name: "Card",-->
<!--  props: ['joke'],-->
<!--  emits: ['deleteJoke'],-->
<!--  methods: {-->
<!--    handleDeleteJoke() {-->
<!--      this.$emit('deleteJoke', this.joke.id);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->