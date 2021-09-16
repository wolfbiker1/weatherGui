<template>
  <div class="inline-flex gap-6">
    <!-- <div class="inner">1</div> -->
    <!-- <div class="inner">2</div> -->
    <!-- <div class="inner">3</div> -->
    <button
      class="
        hover:bg-soft-gray
        text-gray-300
        font-bold
        py-1
        px-4
        border border-ice-blue
        rounded
      "
    >
      min
    </button>
    <button
      class="
        hover:bg-ice-blue
        text-gray-300
        font-bold
        py-1
        px-4
        border border-ice-blue
        rounded
      "
    >
      avg
    </button>
    <button
      class="
        hover:bg-blue-700
        text-gray-300
        font-bold
        py-1
        px-4
        border border-ice-blue
        rounded
      "
    >
      max
    </button>
  </div>
</template>

<script>
export default {
  name: "PressureControlBar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.inner {
  position: absolute;
}
</style>
