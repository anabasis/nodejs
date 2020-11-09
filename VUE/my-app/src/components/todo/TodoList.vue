<template lang="html">
    <div>
    <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
         ></Todo>
     </div>
</template>

<script>
import Todo from '@/components/todo/Todo.vue';

export default {
    components: {
            Todo
    },
    computed: {
      todos(){
        //return this.$store.state.todos;
        return this.$store.state.todo.todos;
      }
    }
}
</script>

<style lang="css" scoped>
</style>
