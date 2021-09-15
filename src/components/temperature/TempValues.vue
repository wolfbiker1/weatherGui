<template>
  <div>
    <div class="flex items-center justify-center">
      <p class="font-extrabold mt-10 text-6xl">{{ getCurrentTemp }}</p>
      <div>
        <p>c</p>
      </div>
    </div>
    <div>
      <p>21,4</p>
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
