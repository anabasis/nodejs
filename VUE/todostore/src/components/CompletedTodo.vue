<template lang="html">
    <div>
        Completed Todo : {{ numberOfCompletedTodo }}
        <!-- {{todos}} -->
    </div>
</template>

<script>
export default {
    computed : {
        numberOfCompletedTodo() {
            return this.$store.getters.numberOfCompletedTodo;
        }
    }
}
</script>

<style lang="css" scoped>
</style>
