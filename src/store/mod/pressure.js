import axios from "axios";

const state = () => ({
  currentPressure: 0,
  history: [],
});

const getters = {
  getCurrentPressure(state) {
    return state.currentPressure;
  },
  getCurrentHistory(state) {
    return state.history;
  },
};

const mutations = {
  storeCurrentPressure(state, pressure) {
    state.currentPressure = pressure;
  },
  storeCurrentHistory(state, history) {
    state.history = history;
  },
};

const actions = {
  fetchCurrentPressure({ commit }) {
    axios.get("/pressure").then((res) => {
      commit("storeCurrentPressure", res.data);
    });
  },
  async fetchHistory({ commit }) {
    return axios.get("/foo").then((res) => {
      // let foo = res.data.split(",").map(res => ({ x: res[0], y: res[1] } ));
      const dataAsJson = [];
      res.data.forEach((res) => {
        dataAsJson.push(JSON.parse(res));
      });
      commit("storeCurrentHistory", dataAsJson);
      // for (let r of res.data) {
      // }
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
