<template>
  <div>
    <header class="text-center m-2">
      <h1 class="text-3xl text-white">Air Pressure</h1>
    </header>
    <section>
      <div class="pressureval pl-2 m-2 mt-8">
        <MeasurementValues
          :color="'text-ice-blue'"
          :field="'pressure'"
          :unit="'hPa'"
        />
      </div>

      <article class="p-2 m-2">
        <!-- <PressureGraph /> -->
        <MeasurementGraphs
          :apiRoute="'pressure'"
          :field="'pressurePlot'"
          :strokeColor="'#00ccff'"
          :areaColor="'#cfe4ff'"
          :plotId="'pressureGraph'"
        />
      </article>
    </section>

    <footer class="text-center m-2">
      <ControlBar
        :hoverColor="'hover:bg-ice-blue'"
        :borderColor="'border-ice-blue'"
        :field="'pressure'"
      />
    </footer>
  </div>
</template>

<script>
import MeasurementGraphs from "./graphs/MeasurementGraphs.vue";
import MeasurementValues from "./values/MeasurementValues.vue";
import ControlBar from "./control/ControlBar.vue";
export default {
  name: "PressureMain",
  props: {
    msg: String,
  },
  components: {
    MeasurementGraphs,
    MeasurementValues,
    ControlBar,
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
pressureval {
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
