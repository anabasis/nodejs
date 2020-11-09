<<<<<<< HEAD
import Vue from 'vue';
import Vuex from 'vuex';
import todo from './modules/guestbook.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      // todo : todo,
      // user : user
      // 선언변수 : Import 가 같은 경우 하나만 입력 가능
      guestbook
  }
})
=======
import Vue from 'vue';
import Vuex from 'vuex';
import guestbook from './modules/guestbook.js';
import todo from './modules/todo.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      // todo : todo,
      // user : user
      // 선언변수 : Import 가 같은 경우 하나만 입력 가능
      guestbook,
      todo
  }
})
>>>>>>> 9cce1114ef3816712297122856d95d284a8504f5
