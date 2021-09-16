<template>
  <div>
    <div class="flex items-center justify-center">
      <p class="font-extrabold mt-10 text-5xl">{{ getCurrentPressure }}</p>
      <div>
        <p>hPa</p>
      </div>
    </div>
    <div>
      <p>1021,4</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PressureValues",
  computed: {
    ...mapGetters("pressure", ["getCurrentPressure"]),
  },
  created() {
    // setInterval(this.fetchCurrentTemp, 1000);
  },
  mounted() {
    setInterval(() => {
      this.fetchCurrentPressure();
    }, 5000);
  },
  data() {
    return {
      currentValue: 0.0,
    };
  },
  methods: {
    ...mapActions("pressure", ["fetchCurrentPressure"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
