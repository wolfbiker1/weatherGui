import axios from "axios";

const state = () => ({
  currentPressure: 0,
  history: [],
  // chart, bar
  selectedButton: "chart",
});

const getters = {
  getCurrentPressure(state) {
    return state.currentPressure;
  },
  getSelectedButton(state) {
    return state.selectedButton;
  },
  getCurrentHistory(state) {
    return state.history;
  },
};

const mutations = {
  setSelectedButton(state, pressedButton) {
    state.selectedButton = pressedButton;
  },
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
