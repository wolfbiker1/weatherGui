import axios from "axios";

const state = () => ({
  peakData: {
    //   "pressure": {
    //       "max": 0.00,
    //       "avg": 0.00,
    //       "min": 0.00,
    //   }
  },
  isEmpty: true,
});

const getters = {
  getPeakData: (state) => (field) => {
    if (!state.peakData[field]) {
      const foo = {
        field: {
          max: 0.0,
          avg: 0.0,
          min: 0.0,
        },
      };
      console.log(foo);
      return {
        field: {
          max: 0.0,
          avg: 0.0,
          min: 0.0,
        },
      };
    }
    return state.peakData[field];
  },
  isEmpty(state) {
    state.isEmpty;
  },
};

const mutations = {
  storePeakData(state, peakData) {
    state.peakData = peakData;
    state.isEmpty = false;
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
