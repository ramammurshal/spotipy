import { createStore } from 'vuex';
import { auth } from '@/includes/firebase';

export default createStore({
  state: {
    userLoggedIn: false,
    tab: 'sign_up' as 'sign_up' | 'log_in',
  },
  getters: {},
  mutations: {
    changeTabLogIn: (state) => {
      state.tab = 'log_in';
    },
    changeTabSignUp: (state) => {
      state.tab = 'sign_up';
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      await userCredentials.user?.updateProfile({
        displayName: payload.name,
      });
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuth');
    },
    async signOut({ commit }) {
      await auth.signOut();
      commit('toggleAuth');
    },
  },
});
