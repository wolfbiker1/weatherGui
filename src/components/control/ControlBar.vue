<template>
  <div class="inline-flex gap-6">
    <button class="font-bold py-1 px-4 mb-1 rounded">
      <span class="ml-8 mr-8" @click="foo">
        <i class="fas fa-chevron-left" :class="isSelected('minus')"></i>
      </span>
      <span
        class="ml-8 mr-8"
        @click="selectGraph({ field: field, pressedButton: 'chart' })"
      >
        <i
          class="fas fa-chart-bar"
          :class="[
            this.getSelectedButton(field) === 'chart' ? this.textColor : 'red',
          ]"
        ></i>
      </span>
      <span
        class="ml-8 mr-8"
        @click="selectGraph({ field: field, pressedButton: 'graph' })"
      >
        <i
          class="fas fa-chart-line"
          :class="[
            this.getSelectedButton(field) === 'graph' ? this.textColor : 'red',
          ]"
        ></i>
      </span>
      <span class="ml-8 mr-8" @click="foo()">
        <i class="fas fa-chevron-right" :class="isSelected('plus')"></i>
      </span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: {
    field: String,
    textColor: String,
    hoverColor: String,
  },
  mounted() {
    setTimeout(() => {
      //this.getAvailableDates(this.field);
      //this.isReady = true;
    }, 1000);
  },
  computed: {
    ...mapGetters("history", ["getBoundary", "getAvailableDates"]),
    ...mapGetters("control", ["getSelectedButton"]),
  },
  methods: {
    ...mapActions("history", ["fetchAvailableDates"]),
    ...mapMutations("control", ["setSelectedButton"]),
    selectGraph(payload) {
      this.setSelectedButton(payload);
      this.$forceUpdate();
    },
    isSelected(buttonName) {
      return this.getSelectedButton(this.field) === buttonName;
    },
    foo() {
      console.log(this.getSelectedButton("temperature"));
    },
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
