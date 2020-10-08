export default {
    namespaced: true,
    // 모듈이 독립적으로 재사용되기 원한다면, namespaced: true를 사용하면 됩니다.
    // 모듈이 등록 될 때, 해당 모듈의 모든 getter, action, mutation은 자동으로 모듈의 경로를 기반으로 네임스페이스가 지정됩니다

    state : {
        todos : [
            {id : 1, text : 'Buy a Car', checked : true},
            {id : 2, text : 'Play Game', checked : false},
            {id : 3, text : 'TEST TEST', checked : true}
        ]
    },

    mutations : {
        ADD_TODO(state, value){
          state.todos.push({
              id: Math.random(),
              text: value,
              checked:false
          });
        },
        TOGGLE_TODO(state, {id, checked}){
          //console.log(id, checked);
          const index = state.todos.findIndex( Todo => {
              return Todo.id === id ;
          });
          state.todos[index].checked = checked;
        },
        DELETE_TODO(state, TodoId){
          const index = state.todos.findIndex( Todo => {
              return Todo.id === TodoId ;
          });
          state.todos.splice(index,1);
          //this.todos = this.todos.filter(Todo => Todo.id != id);
        }
    },

    actions : { // 비동기
        // 표준 양식
        // addTodoAction(context, value){
        //   console.log(value);
        // }
        addTodoAction({ commit }, value){
          //console.log(value);
          commit('ADD_TODO',value);
          // setTimeout(function(){
          //   commit('ADD_TODO',value);
          //   }, 500);
        },
        toggleTodoAction({commit} , payload){
          commit('TOGGLE_TODO',payload);
          // setTimeout(function(){
          //   commit('TOGGLE_TODO',payload);
          // }, 500);
        },
        deleteTodoAction({commit}, TodoId){
          commit('DELETE_TODO',TodoId);
          // setTimeout(function(){
          //   commit('DELETE_TODO',TodoId);
          // }, 500);
        }
    },

    getters:{
        numberOfCompletedTodo: state => {
            return state.todos.filter(Todo =>Todo.checked).length;
        }
    }
}
