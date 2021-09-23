import axios from "axios";
// function dateTimeNow() {
//   const now = new Date();
//   const offsetMs = now.getTimezoneOffset() * 60 * 1000;
//   const dateLocal = new Date(now.getTime() - offsetMs);
//   return dateLocal
//     .toISOString()
//     .slice(0, 19)
//     .replace(/-/g, "-")
//     .replace("T", " ");
// }

function dateTimeOffset(hours) {
  let off = new Date();
  off.setHours(off.getHours() - hours);
  const offsetMs = off.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(off.getTime() - offsetMs);
  return dateLocal
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, "-")
    .replace("T", " ");
}

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

    // JUST FOR DEBUG
    state.history[payload.field].reverse()
  },
};

const actions = {
  async fetchHistory({ commit }, field) {

    // defines right edge of graph, 0 means now
    const borderRight = dateTimeOffset(3).split(" ");

    // how many hours show from the past
    const borderLeft = dateTimeOffset(8).split(" ");
    const mapper = {
      temp: "outdoor_temp",
      pressure: "pressure",
      humidity: "humidity",
      brightness: "brightness",
    };
    // return axios.get(`/hist/for/${mapper[field]}`).then((res) => {
    //   const dataAsJson = [];
    //   res.data.forEach((res) => {
    //     dataAsJson.push(JSON.parse(res));
    //   });
    //   commit("storeCurrentHistory", { field: field, data: dataAsJson });
    // });
    return axios
      .get(
        `/hist_range/${mapper[field]}/${borderLeft[0]}/${borderLeft[1]}/${borderRight[0]}/${borderRight[1]}`
      )
      .then((res) => {
        const dataAsJson = [];
        console.log(res);
        res.data.forEach((res) => {
          dataAsJson.push(JSON.parse(res));
        });
        commit("storeCurrentHistory", { field: field, data: dataAsJson });
      });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
