<template>
  <div>
    <div>
      <div class="flex items-center justify-center">
        <p class="font-extrabold mt-10 text-5xl">{{ getCurrentPressure }}</p>
        <!-- <p class="font-extrabold mt-10 text-5xl">1020.24</p> -->
        <div>
          <p>hPa</p>
        </div>
      </div>
      <div>
        <p>1021,4</p>
      </div>
    </div>
    <div>
      <div class="block text-center mt-4">
        <div class="p-2">
          <div class="inline block">
            <span class="text-ice-blue" @click="foo"><i> Max </i></span>
            <span
              ><i> {{ getPeakData("pressure").max.toFixed(2) }} hPa </i></span
            >
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span class="text-ice-blue"><i> Avg </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span class="text-ice-blue"><i> Min </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PressureValues",
  computed: {
    ...mapGetters("pressure", ["getCurrentPressure"]),
    ...mapGetters("peaks", ["getPeakData"]),
  },
  created() {
    // setInterval(this.fetchCurrentTemp, 1000);
  },
  mounted() {
    setInterval(() => {
      this.fetchPeakData();
      this.fetchCurrentPressure();
    }, 5000);
  },
  data() {
    return {
      currentValue: 0.0,
    };
  },
  methods: {
    foo() {
      console.log(this.getPeakData());
    },
    ...mapActions("pressure", ["fetchCurrentPressure"]),
    ...mapActions("peaks", ["fetchPeakData"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rotate-90 {
  --transform-rotate: 90deg;
}
</style>
