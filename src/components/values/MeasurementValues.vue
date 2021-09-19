<template>
  <div>
    <div>
      <div class="flex items-center justify-center">
        <p class="font-extrabold mt-10 text-5xl">{{ getMeasurement(field) }}</p>
        <!-- <p class="font-extrabold mt-10 text-5xl">1020.24</p> -->
        <div>
          <p>{{ unit }}</p>
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
            <span :class='color'><i> Max </i></span>
            <span
              ><i> 1023,21 {{ unit }} </i></span
            >
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span  :class='color'><i> Avg </i></span>
            <span
              ><i> 1023,21 {{ unit }} </i></span
            >
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span  :class='color'><i> Min </i></span>
            <span
              ><i> 1023,21 {{ unit }} </i></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MeasurementValues",
  props: {
    field: String,
    unit: String,
    color: String
  },
  computed: {
    ...mapGetters("measurements", ["getMeasurement"]),
  },
  mounted() {
    setInterval(() => {
      this.fetchCurrentHumidity();
    }, 5000);
  },
  methods: {
    ...mapActions("humidity", ["fetchCurrentHumidity"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
