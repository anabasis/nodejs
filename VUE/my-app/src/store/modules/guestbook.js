export default {
    namespaced: true,
    // 모듈이 독립적으로 재사용되기 원한다면, namespaced: true를 사용하면 됩니다.
    // 모듈이 등록 될 때, 해당 모듈의 모든 getter, action, mutation은 자동으로 모듈의 경로를 기반으로 네임스페이스가 지정됩니다

    state : {
        guestbooks : [
            {id : 1, title : 'Guestbook 1', content : 'Guestbook Content 1', userid : 'admin', createdate : '', updatedate : '',  checked : true},
            {id : 2, title : 'Guestbook 2', content : 'Guestbook Content 2', userid : 'user', createdate : '', updatedate : '', checked : false},
            {id : 3, title : 'Guestbook 3', content : 'Guestbook Content 3', userid : 'user2', createdate : '', updatedate : '', checked : true}
        ]
    },

    mutations : {
        // ADD_GUESTBOOK(state, value){
        //   state.guestbooks.push({
        //       id: Math.random(),
        //       text: value,
        //       checked:false
        //   });
        // },
        TOGGLE_GUESTBOOK(state, {id, checked}){
          //console.log(id, checked);
          const index = state.guestbooks.findIndex( Guestbook => {
              return Guestbook.id === id ;
          });
          state.guestbooks[index].checked = checked;
        },
        DELETE_GUESTBOOK(state, GuestbookId){
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
        // addGuestbookAction({ commit }, value){
        //   //console.log(value);
        //   commit('ADD_GUESTBOOK',value);
        //   // setTimeout(function(){
        //   //   commit('ADD_GUESTBOOK',value);
        //   //   }, 500);
        // },
        toggleGuestbookAction({commit} , payload){
          commit('TOGGLE_GUESTBOOK',payload);
          // setTimeout(function(){
          //   commit('TOGGLE_GUESTBOOK',payload);
          // }, 500);
        },
        deleteGuestbookAction({commit}, GuestbookId){
          commit('DELETE_GUESTBOOK',GuestbookId);
          // setTimeout(function(){
          //   commit('DELETE_GUESTBOOK',GuestbookId);
          // }, 500);
        }
    },

    getters:{
        numberOfCompletedGuestbook: state => {
            return state.guestbooks.filter(Guestbook =>Guestbook.checked).length;
        }
    }
}
