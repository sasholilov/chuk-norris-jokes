
<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "MainComponent",
  components: {Header}
}
</script>