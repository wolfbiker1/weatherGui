<template>
  <div id="app" class="bg-dark-gray">
    <!-- <div id="app"> -->
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  created() {
    console.log("bar");
    setInterval(() => {
      this.fetchTemp();
      this.fetchPressure();
      this.fetchHumidity();
      this.fetchBrightness();
    }, 5000);
  },
  methods: {
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
