<template>
  <div>
    <div>
      <div class="flex items-center justify-center">
        <!-- <p class="font-extrabold mt-10 text-5xl">{{ getCurrentPressure }}</p> -->
        <p class="font-extrabold mt-10 text-5xl">1020.24</p>
        <div>
          <p>°C</p>
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
            <span class="text-sharp-yellow"><i> Max </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span class="text-sharp-yellow"><i> Avg </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span class="text-sharp-yellow"><i> Min </i></span>
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
  name: "TempValues",
  props: {},
  computed: {
    ...mapGetters("temp", ["getCurrentTemp"]),
  },
  created() {
    // setInterval(this.fetchCurrentTemp, 1000);
  },
  mounted() {
    setInterval(() => {
      this.fetchCurrentTemp();
    }, 5000);
  },
  data() {
    return {
      currentValue: 0.0,
    };
  },
  methods: {
    ...mapActions("temp", ["fetchCurrentTemp"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
