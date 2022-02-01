const state = () => ({
  selectedButton: {
    temperature: "chart",
    pressure: "graph",
    brightness: "graph",
    humidity: "graph",
  },
});

const getters = {
  getSelectedButton: (state) => (field) => {
    return state.selectedButton[field];
  },
};

const mutations = {
  setSelectedButton(state, payload) {
    state.selectedButton[payload.field] = payload.pressedButton;
  },
};

const actions = {};

export default { namespaced: true, state, getters, actions, mutations };
