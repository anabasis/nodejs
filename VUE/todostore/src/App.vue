<template lang="html">
    <div id="app" class="container">
        <h1 class="text-center">ToDo App</h1>
        <CompletedTodo />
        <AddTodo/>
        <hr />
        <TodoList/>
        <!-- {{ todos }} -->
        <UserList/>
    </div>
</template>

<script>
import CompletedTodo from '@/components/CompletedTodo';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import UserList from '@/components/UserList';

export default {
    components: {
        CompletedTodo,
        AddTodo,
        TodoList,
        UserList
    },
    data(){
        return {
            todoText: ''
        }
    }
}
</script>

<style lang="css" scoped>
</style>
