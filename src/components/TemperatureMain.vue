<template>
  <div>
    <header class="text-center m-2">
      <h1 class="text-3xl text-white"><i>Temperature</i></h1>
    </header>
    <section>
      <div class="pressureval pl-2 m-2 mt-8">
        <MeasurementValues
          :color="'text-sharp-yellow'"
          :field="'temperature'"
          :unit="'°C'"
        />
      </div>

      <article class="p-2 m-2 ml-12">
        <div v-if="getSelectedButton('temperature') === 'graph'">
          <MeasurementGraphs
            :apiRoute="'temperature'"
            :field="'tempPlot'"
            :strokeColor="'#fcd408'"
            :areaColor="'#cfe4ff'"
            :plotId="'tempGraph'"
          />
        </div>
        <div v-else-if="getSelectedButton('temperature') === 'chart'">
          <MeasurementBarChart
            :apiRoute="'temperature'"
            :field="'tempPlot'"
            :strokeColor="'#fcd408'"
            :areaColor="'#cfe4ff'"
            :plotId="'tempGraph'"
          />
        </div>
      </article>
    </section>

    <footer class="text-center p-2">
      <ControlBar
        :hoverColor="'hover:bg-sharp-yellow'"
        :textColor="'text-sharp-yellow'"
        :field="'temperature'"
      />
    </footer>
  </div>
</template>

<script>
import MeasurementGraphs from "./graphs/MeasurementGraphs.vue";
import MeasurementBarChart from "./graphs/MeasurementBarChart.vue";

import MeasurementValues from "./values/MeasurementValues.vue";
import ControlBar from "./control/ControlBar.vue";
import {mapGetters} from 'vuex';

export default {
  name: "TemperatureMain",
  props: {
    msg: String,
  },
  components: {
    MeasurementGraphs,
    MeasurementBarChart,
    MeasurementValues,
    ControlBar,
  },
  computed: {
    ...mapGetters("control", ["getSelectedButton"]),
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
