<template>
  <div class="card">
  <p>{{ joke.jokeText }}</p>
  <i class="fa fa-star" :class="{'active':joke.isFav}" @click="handleDeleteJoke"></i>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ['joke'],
  emits: ['deleteJoke'],
  methods: {
    handleDeleteJoke() {
      this.$emit('deleteJoke', this.joke.id);
    }
  }
}
</script>