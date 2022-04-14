import axios from "axios";

const state = () => ({
  currentTemp: 0,
  history: [],
});

const getters = {
  getCurrentTemp(state) {
    return state.currentTemp;
  },
  getCurrentHistory(state) {
    return state.history;
  },
};

const mutations = {
  storeCurrentTemp(state, temp) {
    state.currentTemp = temp.value;
    state.history.push({ x: temp.time, y: temp.value });
  },
  storeCurrentHistory(state, history) {
    state.history = history;
  },
};

const actions = {
  fetchCurrentTemp({ commit }) {
    axios.get("/temperature").then((res) => {
      commit("storeCurrentTemp", res.data);
    });
  },
  async fetchHistory({ commit }, field) {
    const mapper = {
      temp: "outdoor_temp",
    };
    return axios.get(`/hist/for/${mapper[field]}`).then((res) => {
      const dataAsJson = [];
      res.data.forEach((res) => {
        dataAsJson.push(JSON.parse(res));
      });
      commit("storeCurrentHistory", dataAsJson);
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
