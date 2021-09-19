<template>
  <div>
    <header class="text-center m-2">
      <h1 class="text-3xl">Outdoor Temperature</h1>
    </header>
    <section>
      <div class="pressureval pl-2 m-2 mt-8">
        <TempValues />
      </div>

      <article class="p-2 m-2">
        <MeasurementGraphs
          :apiRoute="'temp'"
          :field="'tempPlot'"
          :strokeColor="'#fcd408'"
          :areaColor="'#cfe4ff'"
          :plotId="'tempGraph'"
        />
      </article>
    </section>

    <footer class="text-center p-2">
      <TempControlBar />
    </footer>
  </div>
</template>

<script>
import TempValues from "./temperature/TempValues.vue";
import TempControlBar from "./temperature/TempControlBar.vue";
import MeasurementGraphs from "./graphs/MeasurementGraphs.vue";
export default {
  name: "TemperatureMain",
  props: {
    msg: String,
  },
  components: {
    TempValues,
    // TempGraph,
    TempControlBar,
    MeasurementGraphs,
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
