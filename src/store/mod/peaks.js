import axios from "axios";

const state = () => ({
  peakData: {},
});

const getters = {
  getPeakData: (state) => (field) => {
    console.log("go");
    return state.peakData[field];
  },
};

const mutations = {
  storePeakData(state, peakData) {
    state.peakData = peakData;
  },
};

const actions = {
  fetchPeakData({ commit }) {
    axios.get("/peaks").then((res) => {
      let peakData = {};
      res.data.forEach((element) => {
        const ct = JSON.parse(element);
        const header = Object.keys(ct)[0];
        peakData[header] = ct[header].content;
      });
      commit("storePeakData", peakData);
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
