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
            todos: state => state.todos,
            users: state => state.users
        })
        // users(){
        //         return this.$store.state.users;
        // },
        // todos(){
        //         return this.$store.state.todos;
        // }
    },
    methods: {
        ...mapActions({
            getUsers: 'getUsersAction' // map `this.add()` to `this.$store.dispatch('increment')`
        })
        // getUsers(){
        //     this.$store.dispatch('getUsersAction');
        // }
    }
}
</script>

<style lang="css" scoped>
</style>
