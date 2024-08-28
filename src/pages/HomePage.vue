<template>
<Hero></Hero>
</template>

<script>
import Hero from '../components/Hero.vue';
export default {
  name: 'App',
  components: {
    Hero
  },
  data() {
    return {
      test: '',
    }
  }
}
</script>