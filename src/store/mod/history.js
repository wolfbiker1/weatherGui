import axios from "axios";

const fields = ["temperature", "pressure", "humidity", "brightness"];

// const borders = [
//   "left", "right"]

// unit -> hours
const defaultBackwardCnt = 12;

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
  barChart: {
    temperature: [],
    pressure: [],
    humidity: [],
    brightness: [],
  },
  history: {
    temperature: [],
    pressure: [],
    humidity: [],
    brightness: [],
  },
  trends: {
    temperature: 0.0,
    pressure: 0.0,
    humidity: 0.0,
    brightness: 0.0,
  },
  dates: {
    temperature: [],
    pressure: [],
    humidity: [],
    brightness: [],
  },
  timeRange: {
    temperature: {
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
  getBarChart: (state) => (field) => {
    return state.barChart[field];
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
      date_of_record: payload.value.time,
      value: payload.value.value,
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
      state.timeRange[field]["left"].date = dateOffset;
      state.timeRange[field]["left"].time = timeOffset;
      state.timeRange[field]["right"].date = dateNow;
      state.timeRange[field]["right"].time = timeNow;
    }
  },
  storeCurrentHistory(state, payload) {
    state.history[payload.field] = payload.data;
  },
  storeTrendValue(state, payload) {
    state.trends[payload.field] = payload.trendValue;
  },
  storeBarChart(state, payload) {
    state.barChart[payload.field] = payload.barChartValues;
  },
};

const actions = {
  fetchAvailableDates({ commit }) {
    axios.get(`/available_dates`).then((res) => {
      commit("setBorders", JSON.parse(res.data));
    });
  },
  async fetchTrend({ commit }, field) {
    return axios.get(`/trend/for/${field}`).then((res) => {
      commit("storeTrendValue", { field: field, trendValue: res.data });
    });
  },
  async fetchBarChartHistory({ commit }, field) {
    return axios.get(`/barchart/for/${field}`).then((res) => {
      const dataAsJson = [];
      res.data.forEach((res) => {
        dataAsJson.push(JSON.parse(res));
      });
      commit("storeBarChart", { field: field, barChartValues: dataAsJson });
    });
  },
  async fetchHistory({ commit, state }, field) {
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
