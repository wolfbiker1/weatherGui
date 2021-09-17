<template>
  <div class="inline-flex gap-6">
    <button
      class="
        hover:bg-soft-gray
        text-gray-300
        font-bold
        py-1
        px-4
        border border-sharp-green
        rounded
      "
    >
      -24h
    </button>
    <button
      class="
        hover:bg-ice-blue
        text-gray-300
        font-bold
        py-1
        px-4
        border border-sharp-green
        rounded
      "
    >
      trend
    </button>
    <button
      class="
        hover:bg-blue-700
        text-gray-300
        font-bold
        py-1
        px-4
        border border-sharp-green
        rounded
      "
    >
      +
    </button>
    <button
      class="
        hover:bg-blue-700
        text-gray-300
        font-bold
        py-1
        px-4
        border border-sharp-green
        rounded
      "
    >
      -
    </button>
  </div>
</template>

<script>
export default {
  name: "HumidityControlBar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
