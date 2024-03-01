<template>
  <div id="app">
    <NavigationSection />
    <router-view />
    <FooterSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FooterSection from "./components/FooterSection.vue";
import NavigationSection from "./components/NavigationSection.vue";

export default defineComponent({
  name: "App",
  components: {
    FooterSection,
    NavigationSection,
  },
});
</script>

<style>
#app {
  max-height: 20em;
  max-width: 70em;
  box-sizing: border-box;
  padding: 20px;
}
</style>
