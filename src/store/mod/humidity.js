import axios from "axios";

const state = () => ({
  currentHumidity: 0,
  history: [],
});

const getters = {
  getCurrentHumidity(state) {
    return state.currentHumidity;
  },
  getCurrentHistory(state) {
    return state.history;
  },
};

const mutations = {
  storeCurrentHumidity(state, humidity) {
    state.currentHumidity = humidity.value;
    state.history.push({ x: humidity.time, y: humidity.value });
  },
  storeCurrentHistory(state, history) {
    state.history = history;
  },
};

const actions = {
  fetchCurrentHumidity({ commit }) {
    axios.get("/humidity").then((res) => {
      commit("storeCurrentHumidity", res.data);
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
