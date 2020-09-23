<template lang="html">
    <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-checkbox="toggleCheckbox"
        @click-delete="deleteTodo"
         ></Todo>
</template>

<script>
export default {
    props : {
        todo :
    }
}
</script>

<style lang="css" scoped>
</style>
