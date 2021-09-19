import Vue from "vue";
import Vuex from "vuex";
import temp from "./mod/temp";
import pressure from "./mod/pressure";
import brightness from "./mod/brightness";
import humidity from "./mod/humidity";
import peaks from "./mod/peaks";
import measurements from "./mod/measurements";
import history from "./mod/history";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    temp,
    brightness,
    pressure,
    humidity,
    peaks,
    measurements,
    history,
  },
});
