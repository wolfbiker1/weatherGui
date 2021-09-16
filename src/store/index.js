import Vue from "vue";
import Vuex from "vuex";
import temp from "./mod/temp";
import pressure from "./mod/pressure";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    temp,
    pressure,
  },
});
