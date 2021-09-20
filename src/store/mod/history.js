import axios from "axios";
const state = () => ({
  history: {
    temp: [],
    pressure: [],
    humidity: [],
    brightness: [],
  },
});

const getters = {
  getHistory: (state) => (field) => {
    return state.history[field];
  },
};

const mutations = {
  addHistoryEntry(state, payload) {
    state.history[payload.field].push({
      x: payload.value.time,
      y: payload.value.value,
    });
  },
  storeCurrentHistory(state, payload) {
    state.history[payload.field] = payload.data;
  },
};

const actions = {
  async fetchHistory({ commit }, field) {
    const mapper = {
      temp: "outdoor_temp",
      pressure: "pressure",
      humidity: "humidity",
      brightness: "brightness",
    };
    return axios.get(`/hist/for/${mapper[field]}`).then((res) => {
      const dataAsJson = [];
      res.data.forEach((res) => {
        dataAsJson.push(JSON.parse(res));
      });
      commit("storeCurrentHistory", { field: field, data: dataAsJson });
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
