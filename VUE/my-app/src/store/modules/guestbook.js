export default {
    namespaced: true,
    // 모듈이 독립적으로 재사용되기 원한다면, namespaced: true를 사용하면 됩니다.
    // 모듈이 등록 될 때, 해당 모듈의 모든 getter, action, mutation은 자동으로 모듈의 경로를 기반으로 네임스페이스가 지정됩니다

    state : {
        guestbooks : [
            {id : 1, title : 'Title 1', content : 'TEST TEST TEST TEST' , createdate : '', udpatedate : '', checked : true},
            {id : 2, title : 'Title 2', content : 'TEST TEST TEST TEST' , createdate : '', udpatedate : '', checked : false}
        ]
    },

    mutations : {
      /*
        ADD_GUESTBOOK(state, value){
          state.guestbooks.push({
              id: Math.random(),
              title : value,
              title : value,
              title : value,
              title : value,
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
        */
    },

    actions : { // 비동기
        // 표준 양식
        // addTodoAction(context, value){
        //   console.log(value);
        // }
        /*
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
        }
        */
    },

    getters:{
      /*
        numberOfCompletedTodo: state => {
            return state.todos.filter(todo =>todo.checked).length;
        }
    }
    */
}
