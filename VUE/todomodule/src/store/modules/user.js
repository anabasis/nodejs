import axios from 'axios';

export default {
    namespaced: true,
    // 모듈이 독립적으로 재사용되기 원한다면, namespaced: true를 사용하면 됩니다.
    // 모듈이 등록 될 때, 해당 모듈의 모든 getter, action, mutation은 자동으로 모듈의 경로를 기반으로 네임스페이스가 지정됩니다
    state : {
        users : []
    },

    mutations : {
        SET_USER(state, users){
          state.users = users;
        }
    },

    actions : {
        getUsersAction({commit}){
                axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
                    commit('SET_USER', res.data,);
                    //console.log(res);
                    //this.users = res.data;
                });
        }
    }
}
