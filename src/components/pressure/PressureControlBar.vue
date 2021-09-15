<template>
  <div class="inline-flex">
    <button
      class="
        bg-dark-gray
        hover:bg-gray-400
        font-bold
        py-1
        px-1
        rounded-l
        border border-gray-font
      "
    >
      Min
    </button>
    <button
      class="
        bg-dark-gray
        hover:bg-gray-400
        font-bold
        py-1
        px-1
        border border-gray-font
      "
    >
      Avg
    </button>
    <button
      class="
        bg-dark-gray
        hover:bg-gray-400
        font-bold
        py-1
        px-1
        rounded-r
        border border-gray-font
      "
    >
      Max
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
<style scoped lang="scss"></style>
