import axios from "axios";

const fields = ["temp", "pressure", "humidity", "brightness"];

// const borders = [
//   "left", "right"]

// unit -> hours
const defaultBackwardCnt = 3;

function dateTimeNow() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  return dateLocal
    .toISOString()
    .slice(0, 19)
    .replace(/-/g, "-")
    .replace("T", " ");
}

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
  dates: {
    temp: [],
    pressure: [],
    humidity: [],
    brightness: [],
  },
  timeRange: {
    temp: {
      left: {
        date: "2021-10-03",
        time: "08:07:01",
      },
      right: {
        date: "2021-10-03",
        time: "12:07:01",
      },
    },
    pressure: {
      left: {
        date: "2021-10-03",
        time: "08:07:01",
      },
      right: {
        date: "2021-10-03",
        time: "12:07:01",
      },
    },
    humidity: {
      left: {
        date: "2021-10-03",
        time: "08:07:01",
      },
      right: {
        date: "2021-10-03",
        time: "12:07:01",
      },
    },
    brightness: {
      left: {
        date: "2021-10-03",
        time: "08:07:01",
      },
      right: {
        date: "2021-10-03",
        time: "12:07:01",
      },
    },
  },
});

const getters = {
  getHistory: (state) => (field) => {
    return state.history[field];
  },
  getAvailableDates: (state) => (field) => {
    return JSON.parse(state.dates[field]);
  },
  getBoundary: (state) => (field) => {
    return state.timeRange[field];
  },
};

const mutations = {
  setBorders(state, payload) {
    Object.assign(state.dates, payload);
  },
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
  setupCurrentDate(state) {
    const dtNow = dateTimeNow().split(" ");
    const dateNow = dtNow[0];
    const timeNow = dtNow[1];

    const dtOffset = dateTimeOffset(defaultBackwardCnt).split(" ");
    const dateOffset = dtOffset[0];
    const timeOffset = dtOffset[1];
    for (const field of fields) {
      // for (const border of borders) {
      state.timeRange[field]["left"].date = dateOffset;
      state.timeRange[field]["left"].time = timeOffset;
      state.timeRange[field]["right"].date = dateNow;
      state.timeRange[field]["right"].time = timeNow;
      // }
    }
  },
  storeCurrentHistory(state, payload) {
    state.history[payload.field] = payload.data;

    // JUST FOR DEBUG
    // state.history[payload.field].reverse();
  },
};

const actions = {
  fetchAvailableDates({ commit }) {
    axios.get(`/available_dates/`).then((res) => {
      commit("setBorders", JSON.parse(res.data));
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
