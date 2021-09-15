<template>
  <div>
    <header class="text-center">
      <h2>TEMP</h2>
    </header>
    <section>
      <div class="tempval p-4">
        <TempValues />
      </div>

      <article class="p-3">
        <TempGraph />
      </article>
    </section>

    <footer class="text-center p-2">
      <TempControlBar />
    </footer>
  </div>
</template>

<script>
import TempValues from "./temperature/TempValues.vue";
import TempGraph from "./temperature/TempGraph.vue";
import TempControlBar from "./temperature/TempControlBar.vue";

export default {
  name: "TemperatureMain",
  props: {
    msg: String,
  },
  components: {
    TempValues,
    TempGraph,
    TempControlBar,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* Container for flexboxes */
section {
  display: -webkit-flex;
  display: flex;
}

/* Style the navigation menu */
tempval {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  // background: #ccc;
  // padding: 20px;
}

article {
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
}
</style>
