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

// function dateTimeOffset(hours) {
//   let off = new Date();
//   off.setHours(off.getHours() - hours);
//   const offsetMs = off.getTimezoneOffset() * 60 * 1000;
//   const dateLocal = new Date(off.getTime() - offsetMs);
//   return dateLocal
//     .toISOString()
//     .slice(0, 19)
//     .replace(/-/g, "-")
//     .replace("T", " ");
// }

const state = () => ({
  history: {
    temp: [],
    pressure: [],
    humidity: [],
    brightness: [],
  },
  timeRange: {
    temp: {
      left: {
        date: "2021-09-27",
        time: "08:07:01",
      },
      right: {
        date: "2021-09-27",
        time: "12:07:01",
      },
    },
    pressure: {
      left: {
        date: "2021-09-27",
        time: "08:07:01",
      },
      right: {
        date: "2021-09-27",
        time: "12:07:01",
      },
    },
    humidity: {
      left: {
        date: "2021-09-27",
        time: "08:07:01",
      },
      right: {
        date: "2021-09-27",
        time: "12:07:01",
      },
    },
    brightness: {
      left: {
        date: "2021-09-27",
        time: "08:07:01",
      },
      right: {
        date: "2021-09-27",
        time: "12:07:01",
      },
    },
  },
});

const getters = {
  getHistory: (state) => (field) => {
    return state.history[field];
  },
  getBoundary: (state) => (field) => {
    return state.timeRange[field];
  },
};

const mutations = {
  setLeftBorder(state, payload) {
    state.timeRange[payload.field] = payload.valueLeft;
  },
  setRightBorder(state, payload) {
    state.timeRange[payload.field] = payload.valueRight;
  },
  addHistoryEntry(state, payload) {
    state.history[payload.field].push({
      x: payload.value.time,
      y: payload.value.value,
    });
  },
  storeCurrentHistory(state, payload) {
    state.history[payload.field] = payload.data;

    // JUST FOR DEBUG
    state.history[payload.field].reverse();
  },
};

const actions = {
  fetchAvailableDates({ commit }, field) {
    axios.get(`/available_dates/for/${field}`).then((res) => {
      commit("setLeftBorder", { field: field, valueLeft: res.data[0].date });
      commit("setRightBorder", { field: field, valueRight: res.data[0].date });
    });
  },
  async fetchHistory({ commit, state }, field) {
    // defines right edge of graph, 0 means now
    // const borderRight = dateTimeOffset(state.timeRange[field].right).split(" ");

    // how many hours show from the past
    // const borderLeft = dateTimeOffset(state.timeRange[field].left).split(" ");

    // return axios.get(`/hist/for/${mapper[field]}`).then((res) => {
    //   const dataAsJson = [];
    //   res.data.forEach((res) => {
    //     dataAsJson.push(JSON.parse(res));
    //   });
    //   commit("storeCurrentHistory", { field: field, data: dataAsJson });
    // });
    return axios
      .get(
        `/hist_range/${field}/${state.timeRange[field].left.date}/${state.timeRange[field].left.time}/${state.timeRange[field].right.date}/${state.timeRange[field].right.time}`
      )
      .then((res) => {
        const dataAsJson = [];
        res.data.forEach((res) => {
          dataAsJson.push(JSON.parse(res));
        });
        commit("storeCurrentHistory", { field: field, data: dataAsJson });
      });
  },
};

export default { namespaced: true, state, getters, actions, mutations };
