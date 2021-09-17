<template>
  <div class="home">
    <div class="flex items-center justify-center h-screen">
      <div class="container md:container md:mx-auto">
        <div class="grid grid-cols-2 gap-4">
          <div class="border-4 border-gray-600">
            <TemperatureMain />
          </div>
          <div class="border-4 border-gray-600">
            <PressureMain />
          </div>
          <!-- <div class="border-4 border-gray-600">
            <p>yes</p>
          </div>
          <div class="border-4 border-gray-600">
            <p>yes</p>
          </div> -->
          <div class="border-4 border-gray-600">
            <BrightnessMain />
          </div>
          <div class="border-4 border-gray-600">
            <HumidityMain />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TemperatureMain from "@/components/TemperatureMain.vue"; // @ is an alias to /src
import PressureMain from "@/components/PressureMain.vue"; // @ is an alias to /src
import BrightnessMain from "@/components/BrightnessMain.vue"; // @ is an alias to /src
import HumidityMain from "@/components/HumidityMain.vue"; // @ is an alias to /src

export default {
  name: "Frontpage",
  components: {
    TemperatureMain,
    PressureMain,
    BrightnessMain,
    HumidityMain,
  },
};
</script>
