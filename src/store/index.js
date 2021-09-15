import Vue from "vue";
import Vuex from "vuex";
import temp from "./mod/temp";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    temp,
  },
});
