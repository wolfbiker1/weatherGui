const state = () => ({
  selectedButton: {
    temperature: "graph",
    pressure: "chart",
    brightness: "chart",
    humidity: "plus",
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
