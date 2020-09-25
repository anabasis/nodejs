<template lang="html">
    <div>
        Completed Todo : {{ numberOfCompletedTodo }}
        <!-- {{todos}} -->
    </div>
</template>

<script>
export default {
    computed : {
        todos() {
          return this.$store.state.todos;
        },
        numberOfCompletedTodo() {
            return this.todos.filter(todo =>todo.checked).length;
        }
    }
}
</script>

<style lang="css" scoped>
</style>
