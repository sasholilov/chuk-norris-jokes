<template>
  <div class="errors-container">
    <p class="error" v-for="error in errors">{{error}}</p>
  </div>
</template>

<script setup>
import { defineProps} from 'vue'

const props = defineProps(['errors'])

</script>