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
    state.currentPressure = pressure.value;
    state.history.push({ x: pressure.time, y: pressure.value });
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
  async fetchHistory({ commit }, field) {
    return axios.get(`/hist/for/${field}`).then((res) => {
      const dataAsJson = [];
      res.data.forEach((res) => {
        dataAsJson.push(JSON.parse(res));
      });
      commit("storeCurrentHistory", dataAsJson);
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
