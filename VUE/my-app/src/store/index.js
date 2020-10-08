import Vue from 'vue';
import Vuex from 'vuex';
import guestbook from './modules/guestbook.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      // todo : todo,
      // user : user
      // 선언변수 : Import 가 같은 경우 하나만 입력 가능
      guestbook
  }
})
