<template lang="html">
    <div>
        Completed Todo : {{ numberOfCompletedTodo }}
        <!-- {{Todos}} -->
    </div>
</template>

<script>
export default {
    computed : {
        numberOfCompletedTodo() {
            //alert(this.$store.getters['Todo/numberOfCompletedTodo']);
            return this.$store.getters['todo/numberOfCompletedTodo'];
        }
    }
}
</script>
<style lang="css" scoped>
</style>
