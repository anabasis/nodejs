<template lang="html">
  <div id="app" class="container">
      <h1 class="text-center">Todo App</h1>
      <TodoCnt />
      <AddTodo/>
      <hr />
      <TodoList/>
  </div>

</template>


<script>
// @ ROOT부터 페키지 검색
import TodoCnt from '@/components/todo/TodoCnt';
import AddTodo from '@/components/todo/AddTodo';
import TodoList from '@/components/todo/TodoList';

export default {
  components: {
      TodoCnt,
      AddTodo,
      TodoList
  }
}
</script>

<style lang="css" scoped>
</style>
