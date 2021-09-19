<template>
  <div>
    <header class="text-center m-2">
      <h1 class="text-3xl">Humidity</h1>
    </header>
    <section>
      <div class="pressureval pl-2 m-2 mt-8">
        <HumidityValues />
      </div>

      <article class="p-2 m-2">
        <!-- <HumidityGraph /> -->
        <MeasurementGraphs
          :apiRoute="'humidity'"
          :field="'humidityPlot'"
          :strokeColor="'#08fc34'"
          :areaColor="'#cfe4ff'"
          :plotId="'humidityGraph'"
        />
      </article>
    </section>

    <footer class="text-center p-2">
      <HumidityControlBar />
    </footer>
  </div>
</template>

<script>
import HumidityValues from "./humidity/HumidityValues.vue";
import HumidityControlBar from "./humidity/HumidityControlBar.vue";
import MeasurementGraphs from "./graphs/MeasurementGraphs.vue";
export default {
  name: "HumidityMain",
  props: {
    msg: String,
  },
  components: {
    HumidityValues,
    HumidityControlBar,
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
