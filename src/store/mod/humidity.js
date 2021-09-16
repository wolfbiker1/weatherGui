import axios from "axios";

const state = () => ({
  currentTemp: 0,
});

const getters = {
  getCurrentTemp(state) {
    return state.currentTemp;
  },
};

const mutations = {
  storeCurrentTemp(state, temp) {
    state.currentTemp = temp;
  },
};

const actions = {
  fetchCurrentTemp({ commit }) {
    axios.get("/temp").then((res) => {
      commit("storeCurrentTemp", res.data);
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
