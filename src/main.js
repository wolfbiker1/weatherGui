import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/style.scss";

import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://192.168.178.66:7878";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
