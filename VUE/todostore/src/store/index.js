import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {   // 데이터 세팅
    todos : [
        {id : 1, text : 'Buy a Car', checked : false},
        {id : 2, text : 'Play Game', checked : false}
    ],
    users : []
  },
  mutations: {   // 변경사항 적용 // 동기화
    SET_USER(state, users){
      state.users = users;
    },
    ADD_TODO(state, value){
      state.todos.push({
          id: Math.random(),
          text: value,
          checked:false
      });
    },
    TOGGLE_TODO(state, {id, checked}){
      //console.log(id, checked);
      const index = state.todos.findIndex( todo => {
          return todo.id === id ;
      });
      state.todos[index].checked = checked;
    },
    DELETE_TODO(state, todoId){
      const index = state.todos.findIndex( todo => {
          return todo.id === todoId ;
      });
      state.todos.splice(index,1);
      //this.todos = this.todos.filter(todo => todo.id != id);
    }
  },
  actions: {  // 비동기

    // 표준 양식
    // addTodoAction(context, value){
    //   console.log(value);
    // }
    addTodoAction({ commit }, value){
      console.log(value);
      setTimeout(function(){
        commit('ADD_TODO',value);
    }, 500);
    },
    toggleTodoAction({commit} , payload){
      setTimeout(function(){
        commit('TOGGLE_TODO',payload);
      }, 500);
    },
    deleteTodoAction({commit}, todoId){
      setTimeout(function(){
        commit('DELETE_TODO',todoId);
      }, 500);
    },
    getUsersAction({commit}){
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
                commit('SET_USER', res.data);
              //console.log(res);
              //this.users = res.data;
          });
    }
  },
  getters:{
      numberOfCompletedTodo: state => {
          return state.todos.filter(todo =>todo.checked).length;
      }
  }
})
