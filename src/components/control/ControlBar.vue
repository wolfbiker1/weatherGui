<template>
  <div class="inline-flex gap-6">
    <button class="font-bold py-1 px-4 mb-1 rounded" :class="[borderColor]">
      <!-- <div> -->
      <span class="ml-8 mr-8">
        <i class="fas fa-minus" :class="borderColor"></i>
      </span>
      <span class="ml-8 mr-8">
        <i class="fas fa-arrow-up" :class="borderColor"></i>
      </span>
      <span class="ml-8 mr-8">
        <i class="fas fa-chart-bar" :class="borderColor"></i>
      </span>
      <span class="ml-8 mr-8">
        <i class="fas fa-chart-line" :class="borderColor"></i>
      </span>
      <span class="ml-8 mr-8" :class="borderColor">
        <i class="fas fa-plus" :class="borderColor"></i>
      </span>
      <!-- </div> -->
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    field: String,
    borderColor: String,
    hoverColor: String,
  },
  mounted() {
    setTimeout(() => {
      this.getAvailableDates(this.field);
      this.isReady = true;
    }, 1000);
  },
  computed: {
    ...mapGetters("history", ["getBoundary", "getAvailableDates"]),
  },
  methods: {
    ...mapActions("history", ["fetchAvailableDates"]),
    setDate() {},
  },
  data() {
    return {
      isReady: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
