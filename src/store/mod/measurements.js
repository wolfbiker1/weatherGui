import axios from "axios";

const state = () => ({
  measurements: {
    temp: 0,
    pressure: 0,
    humidity: 0,
    brightness: 0,
  },
});

const getters = {
  getMeasurement: (state) => (field) => {
    return state.measurements[field];
  },
};

const mutations = {
  storeMeasurement(state, payload) {
    state.measurements[payload.field] = payload.value;
  },
};

const actions = {
  fetchTemp({ commit }) {
    axios.get("/temp").then((res) => {
      commit("storeMeasurement", { field: "temp", value: res.data.value });
      commit(
        "history/addHistoryEntry",
        { field: "temp", value: res.data },
        { root: true }
      );
    });
  },
  fetchPressure({ commit }) {
    axios.get("/pressure").then((res) => {
      commit("storeMeasurement", { field: "pressure", value: res.data.value });
      commit(
        "history/addHistoryEntry",
        { field: "pressure", value: res.data },
        { root: true }
      );
    });
  },
  fetchHumidity({ commit }) {
    axios.get("/humidity").then((res) => {
      commit("storeMeasurement", { field: "humidity", value: res.data.value });
      commit(
        "history/addHistoryEntry",
        { field: "humidity", value: res.data },
        { root: true }
      );
    });
  },
  fetchBrightness({ commit }) {
    axios.get("/brightness").then((res) => {
      commit("storeMeasurement", {
        field: "brightness",
        value: res.data.value,
      });
      commit(
        "history/addHistoryEntry",
        { field: "brightness", value: res.data },
        { root: true }
      );
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
