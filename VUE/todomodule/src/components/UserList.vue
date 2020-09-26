<template lang="html">
    <div>
      User List
      <hr/>
      <div v-for="user in users" :key="user.id">
      {{ user.name }}
      </div>
      <hr/>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';

export default {
    created(){  // 많이 사용함
      this.getUsers();
    },
    computed: {
        ...mapState({
            todos: state => state.todo.todos,
            users: state => state.user.users
        })
        // users(){
        //         return this.$store.state.users;
        // },
        // todos(){
        //         return this.$store.state.todos;
        // }
    },
    methods: {
       //  methods: {
       //     ...mapActions([ 'method1', 'method2' ]),
       //     ...mapActions('module1', [ 'method1', 'method2' ]),
       //     ...mapActions('module2', { mod2method1: 'method1', mod2method2: 'method2' })
       // }
        ...mapActions('user',{ getUsers : 'getUsersAction' })
        // ...mapActions({
        //     getUsers: 'getUsersAction' // map `this.add()` to `this.$store.dispatch('increment')`
        // });
        // getUsers(){
        //     this.$store.dispatch('getUsersAction');
        // }
    }
}
</script>

<style lang="css" scoped>
</style>
