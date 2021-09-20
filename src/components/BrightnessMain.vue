<template>
  <div>
    <header class="text-center m-2">
      <h1 class="text-3xl text-white">Brightness</h1>
    </header>
    <section>
      <div class="pressureval pl-2 m-2 mt-8">
        <MeasurementValues
          :color="'text-sharp-red'"
          :field="'brightness'"
          :unit="'lux'"
        />
      </div>

      <article class="p-2 m-2">
        <MeasurementGraphs
          :apiRoute="'brightness'"
          :field="'brightnessPlot'"
          :strokeColor="'#fc0808'"
          :areaColor="'#cfe4ff'"
          :plotId="'brightnessGraph'"
        />
      </article>
    </section>

    <footer class="text-center p-2">
      <BrightnessControlBar />
    </footer>
  </div>
</template>

<script>
import MeasurementValues from "./values/MeasurementValues.vue";
import BrightnessControlBar from "./brightness/BrightnessControlBar.vue";
import MeasurementGraphs from "./graphs/MeasurementGraphs.vue";
export default {
  name: "BrightnessMain",
  props: {
    msg: String,
  },
  components: {
    MeasurementGraphs,
    MeasurementValues,
    BrightnessControlBar,
  },
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
