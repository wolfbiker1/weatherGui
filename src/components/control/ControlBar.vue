<template>
  <div class="inline-flex gap-6">
    <button
      class="
        hover:bg-soft-gray
        text-gray-300
        font-bold
        py-1
        px-4
        border
        rounded
      "
      :class="color"
    >
      -24h
    </button>
    <button
      class="hover:bg-ice-blue text-gray-300 font-bold py-1 px-4 border rounded"
      :class="color"
    >
      trend
    </button>
    <button
      class="hover:bg-blue-700 text-gray-300 font-bold py-1 px-4 border rounded"
      :class="color"
    >
      +
    </button>
    <button
      class="hover:bg-blue-700 text-gray-300 font-bold py-1 px-4 border rounded"
      :class="color"
    >
      -
    </button>

    <div class="dropdown inline-block relative">
      <button
        :class="color"
        class="
          text-gray-300
          font-semibold
          py-1
          px-1
          border
          rounded
          inline-flex
          items-center
        "
      >
        <span class="mr-1">Dropdown</span>
      </button>
      <ul class="dropdown-menu bg-blue-700 absolute hidden text-gray-700 pt-1">
        <li class="">
          <a
            class="
              rounded-t
              bg-gray-200
              hover:bg-gray-400
              py-2
              px-4
              block
              whitespace-no-wrap
            "
            href="#"
            >One</a
          >
        </li>
        <li class="">
          <a
            class="
              bg-gray-200
              hover:bg-red-400
              py-2
              px-4
              block
              whitespace-no-wrap
            "
            href="#"
            >Two</a
          >
        </li>
        <li class="">
          <a
            class="
              rounded-b
              bg-gray-200
              hover:bg-gray-400
              py-2
              px-4
              block
              whitespace-no-wrap
            "
            href="#"
            >Three is the magic number</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    field: String,
    color: String,
  },
  mounted() {
    this.fetchAvailableDates(this.field);
  },
  computed: {
    ...mapGetters("history", ["getBoundary"]),
  },
  methods: {
    ...mapActions("history", ["fetchAvailableDates"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
