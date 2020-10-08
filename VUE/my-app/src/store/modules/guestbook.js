export default {
    namespaced: true,
    // 모듈이 독립적으로 재사용되기 원한다면, namespaced: true를 사용하면 됩니다.
    // 모듈이 등록 될 때, 해당 모듈의 모든 getter, action, mutation은 자동으로 모듈의 경로를 기반으로 네임스페이스가 지정됩니다

    state : {
        guestbooks : [
            {id : 1, text : 'Buy a Car', checked : true},
            {id : 2, text : 'Play Game', checked : false},
            {id : 3, text : 'TEST TEST', checked : true}
        ]
    },

    mutations : {
        ADD_Guestbook(state, value){
          state.guestbooks.push({
              id: Math.random(),
              text: value,
              checked:false
          });
        },
        TOGGLE_Guestbook(state, {id, checked}){
          //console.log(id, checked);
          const index = state.guestbooks.findIndex( Guestbook => {
              return Guestbook.id === id ;
          });
          state.guestbooks[index].checked = checked;
        },
        DELETE_Guestbook(state, GuestbookId){
          const index = state.guestbooks.findIndex( Guestbook => {
              return Guestbook.id === GuestbookId ;
          });
          state.guestbooks.splice(index,1);
          //this.guestbooks = this.guestbooks.filter(Guestbook => Guestbook.id != id);
        }
    },

    actions : { // 비동기
        // 표준 양식
        // addGuestbookAction(context, value){
        //   console.log(value);
        // }
        addGuestbookAction({ commit }, value){
          console.log(value);
          setTimeout(function(){
            commit('ADD_Guestbook',value);
            }, 500);
        },
        toggleGuestbookAction({commit} , payload){
          setTimeout(function(){
            commit('TOGGLE_Guestbook',payload);
          }, 500);
        },
        deleteGuestbookAction({commit}, GuestbookId){
          setTimeout(function(){
            commit('DELETE_Guestbook',GuestbookId);
          }, 500);
        }
    },

    getters:{
        numberOfCompletedGuestbook: state => {
            return state.guestbooks.filter(Guestbook =>Guestbook.checked).length;
        }
    }
}
