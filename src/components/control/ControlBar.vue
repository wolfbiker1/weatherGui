<template>
  <div class="inline-flex gap-6">
    <button
      class="text-gray-300 font-bold py-1 px-4 border rounded"
      :class="[borderColor, hoverColor]"
    >
      -24h
    </button>
    <button
      class="text-gray-300 font-bold py-1 px-4 border rounded"
      :class="[borderColor, hoverColor]"
    >
      trend
    </button>

    <div class="dropdown inline-block relative">
      <button
        :class="borderColor"
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
        <span class="mr-1" v-if="isReady">Start Date</span>
        <span class="mr-1" v-else>Loading...</span>
      </button>
      <ul
        v-if="isReady"
        class="dropdown-menu absolute hidden text-gray-700 pt-1"
      >
        <li v-for="x in getAvailableDates(field)" :key="x">
          <span
            class="text-gray-300 hover:bg-gray-700"
            :class="[borderColor]"
            @click="setDate()"
          >
            {{ x }}
          </span>
        </li>
      </ul>
    </div>

    <div class="dropdown inline-block relative">
      <button
        :class="borderColor"
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
        <span class="mr-1" v-if="isReady">End Date</span>
        <span class="mr-1" v-else>Loading...</span>
      </button>
      <ul
        v-if="isReady"
        class="dropdown-menu absolute hidden text-gray-700 pt-1"
      >
        <li v-for="x in getAvailableDates(field)" :key="x">
          <span
            class="text-gray-300 hover:bg-gray-700"
            :class="[borderColor]"
            @click="setDate()"
          >
            {{ x }}
          </span>
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
    borderColor: String,
    hoverColor: String,
  },
  mounted() {
    // this.fetchAvailableDates(this.field);
    setTimeout(() => {
      this.getAvailableDates(this.field);
      this.isReady = true;
    }, 1000);
    // console.log(this.getAvailableDates());
  },
  computed: {
    ...mapGetters("history", ["getBoundary", "getAvailableDates"]),
  },
  methods: {
    ...mapActions("history", ["fetchAvailableDates"]),
    setDate() {
      console.log("foo...");
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
