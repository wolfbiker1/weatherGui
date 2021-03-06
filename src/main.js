import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/style.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://192.168.178.66:7878";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
