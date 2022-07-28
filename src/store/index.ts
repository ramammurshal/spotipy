import { createStore } from 'vuex';
import { auth } from '@/includes/firebase';
import { Howl } from 'howler';
import helper from '@/includes/helper';

export default createStore({
  state: {
    userLoggedIn: false,
    tab: 'sign_up' as 'sign_up' | 'log_in',
    current_song: {} as any,
    sound: {} as any,
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
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
    startSong: (state, payload) => {
      state.current_song = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
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
    async startSong({ commit, state, dispatch }, payload) {
      if (this.state.sound instanceof Howl) {
        this.state.sound.unload();
      }
      commit('startSong', payload);
      state.sound.play();
      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleSong({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress() {
      this.state.seek = helper.formatTime(this.state.sound.seek());
      this.state.duration = helper.formatTime(this.state.sound.duration());

      this.state.playerProgress = `${
        (this.state.sound.seek() / this.state.sound.duration()) * 100
      }%`;

      if (this.state.sound.playing()) {
        requestAnimationFrame(() => {
          this.dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      const { x, width } = payload.currentTarget.getBoundingClientRect();

      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
});
