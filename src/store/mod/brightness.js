import axios from "axios";

const state = () => ({
  currentBrightness: 0,
  history: [],
});

const getters = {
  getCurrentBrightness(state) {
    return state.currentBrightness;
  },
  getCurrentHistory(state) {
    return state.history;
  },
};

const mutations = {
  storeCurrentBrightness(state, brightness) {
    state.currentBrightness = brightness.value;
    state.history.push({ x: brightness.time, y: brightness.value });
  },
  storeCurrentHistory(state, history) {
    state.history = history;
  },
};

const actions = {
  fetchCurrentBrightness({ commit }) {
    axios.get("/brightness").then((res) => {
      commit("storeCurrentBrightness", res.data);
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
