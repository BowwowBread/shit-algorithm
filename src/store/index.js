import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  loadingState: false,
};

const mutations = {
  loadingOn(state) {
    state.loadingState = true;
  },
  loadingOff(state) {
    state.loadingState = false;
  },
};

const actions = {
  loadingOn: ({ commit }) => commit('loadingOn'),
  loadingOff: ({ commit }) => commit('loadingOff'),
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
