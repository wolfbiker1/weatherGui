<template>
  <div id="app" class="bg-dark-gray">
    <!-- <div id="app"> -->
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  created() {
    this.setupCurrentDate();
    setInterval(() => {
      this.fetchTemp();
      this.fetchPressure();
      this.fetchHumidity();
      this.fetchBrightness();
    }, 5000);
  },
  methods: {
    ...mapMutations("history", ["setupCurrentDate"]),
    ...mapActions("measurements", [
      "fetchTemp",
      "fetchPressure",
      "fetchHumidity",
      "fetchBrightness",
    ]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
