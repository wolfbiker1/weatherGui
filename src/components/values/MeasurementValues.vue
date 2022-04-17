<template>
  <div>
    <div>
      <div class="flex items-center justify-center">
        <p class="font-extrabold mt-10 text-white text-5xl">
          {{ getMeasurement(field) }}
        </p>
        <div class="flex items-center justify-center">
          <p class="text-white">{{ unit }}</p>
        </div>
      </div>
      <div>
        <span class="mt-14 text-gray-smooth">
          <i v-if="getMeasurement(field) > getPastValues(field).value">
            +
            {{
              (getMeasurement(field) - getPastValues(field).value).toFixed(2)
            }}</i
          >
          <i v-else>
            -
            {{
              Math.abs(
                (getMeasurement(field) - getPastValues(field).value).toFixed(2)
              )
            }}</i
          >
          <i> {{ unit }} </i>
        </span>
      </div>
      <div>
        <span>
          <i
            class="fas fa-arrow-up"
            :class="color"
            v-if="getTrend(field) > 0.0"
          ></i>
          <i
            class="fas fa-arrow-right"
            :class="color"
            v-else-if="getTrend(field) === 0.0"
          ></i>
          <i class="fas fa-arrow-down" :class="color" v-else></i>
        </span>
      </div>
    </div>
    <div>
      <div class="block text-center mt-4">
        <div class="p-2">
          <div class="inline block">
            <span :class="color"><i> Max </i></span>
            <span class="text-gray-smooth">
              <i> {{ getPeakData(field).max[0].toFixed(2) }} {{ unit }} </i>
            </span>
            <!-- <span class="text-gray-smooth tooltip">
              <i class="tooltiptext"> {{ getPeakData(field).max[1] }}</i>
            </span> -->
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span :class="color"><i> Avg </i></span>
            <span class="text-gray-smooth"
              ><i> {{ getPeakData(field).avg[0].toFixed(2) }} {{ unit }} </i></span
            >
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span :class="color"><i> Min </i></span>
            <span class="text-gray-smooth">
              <i> {{ getPeakData(field).min[0].toFixed(2) }} {{ unit }} </i>
            </span>
            <!-- <span class="">
              <i> ({{ getPeakData(field).min[1] }})</i>
            </span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MeasurementValues",
  props: {
    field: String,
    unit: String,
    color: String,
  },
  computed: {
    ...mapGetters("measurements", ["getMeasurement"]),
    ...mapGetters("history", ["getTrend", "getPastValues"]),
    ...mapGetters("peaks", ["getPeakData"]),
  },
  mounted() {
    this.fetchPeakData();
    this.fetchTrend(this.field);
    this.fetchPastValue(this.field);
    // setInterval(() => {
    //   this.fetchCurrentHumidity();
    // }, 5000);
  },
  data () {
    return {
      showTooltip: false,
    }
  },
  methods: {
    ...mapActions("peaks", ["fetchPeakData"]),
    ...mapActions("history", ["fetchTrend", "fetchPastValue"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
