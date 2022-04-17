import axios from "axios";

const state = () => ({
  peakData: {
    pressure: {
      max: [0.0, "0.0"],
      avg: [0.0, "0.0"],
      min: [0.0, "0.0"],
    },
    temperature: {
      max: [0.0, "0.0"],
      avg: [0.0, "0.0"],
      min: [0.0, "0.0"],
    },
    humidity: {
      max: [0.0, "0.0"],
      avg: [0.0, "0.0"],
      min: [0.0, "0.0"],
    },
    brightness: {
      max: [0.0, "0.0"],
      avg: [0.0, "0.0"],
      min: [0.0, "0.0"],
    },
  },
  isEmpty: true,
});

const getters = {
  getPeakData: (state) => (field) => {
    if (!state.peakData[field]) {
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
    peakData.forEach((p) => {
      const ct = JSON.parse(p);
      const header = Object.keys(ct)[0];
      const ident = ct[header].ident;
      const val = ct[header].content.val;
      const date = ct[header].content.date;
      state.peakData[header][ident][0] = val;
      state.peakData[header][ident][1] = date;
    });
    state.isEmpty = false;
  },
};

const actions = {
  fetchPeakData({ commit }) {
    axios.get("/peaks").then((res) => {
      commit("storePeakData", res.data);
    });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
