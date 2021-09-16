<template>
  <div>
    <header class="text-center">
      <h2>Pressure</h2>
    </header>
    <section>
      <div class="pressureval p-4">
        <PressureValues />
      </div>

      <article class="p-3">
        <!-- <p>haee</p> -->
        <PressureGraph />
      </article>
    </section>

    <footer class="text-center">
      <PressureControlBar />
    </footer>
  </div>
</template>

<script>
import PressureValues from "./pressure/PressureValues.vue";
import PressureGraph from "./pressure/PressureGraph.vue";
import PressureControlBar from "./pressure/PressureControlBar.vue";

export default {
  name: "PressureMain",
  props: {
    msg: String,
  },
  components: {
    PressureValues,
    PressureGraph,
    PressureControlBar,
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
