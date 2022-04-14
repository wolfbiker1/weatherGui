const state = () => ({
  selectedButton: {
    temperature: "graph",
    pressure: "graph",
    brightness: "graph",
    humidity: "graph",
  },
});

const getters = {
  getSelectedButton: (state) => (field) => {
    console.log(field);
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
