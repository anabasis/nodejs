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
// @ ROOT부터 페키지 검색
import CompletedTodo from '@/components/CompletedTodo';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import UserList from '@/components/UserList';

export default {
    components: {
        CompletedTodo,
        AddTodo,
        TodoList,
        UserList
    }
}
</script>

<style lang="css" scoped>
</style>
