<template>
  <div>
    <div>
      <div class="flex items-center justify-center">
        <p class="font-extrabold mt-10 text-5xl">{{ getCurrentBrightness }}</p>
        <!-- <p class="font-extrabold mt-10 text-5xl">1020.24</p> -->
        <div>
          <p>lux</p>
        </div>
      </div>
      <div>
        <p>1021,4</p>
      </div>
    </div>
    <div>
      <div class="block text-center mt-4">
        <div class="p-2">
          <div class="inline block">
            <span class="text-sharp-red"><i> Max </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span class="text-sharp-red"><i> Avg </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
        <div class="p-2">
          <div class="inline block">
            <span class="text-sharp-red"><i> Min </i></span>
            <span><i> 1023,21 hPa </i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BrightnessValues",
  computed: {
    ...mapGetters("brightness", ["getCurrentBrightness"]),
  },
  props: {
    msg: String,
  },
  mounted() {
    setInterval(() => {
      this.fetchCurrentBrightness();
    }, 5000);
  },
  methods: {
    ...mapActions("brightness", ["fetchCurrentBrightness"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
