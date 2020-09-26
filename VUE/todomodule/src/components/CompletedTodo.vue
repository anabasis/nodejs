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
            //alert(this.$store.getters['todo/numberOfCompletedTodo']);
            return this.$store.getters['todo/numberOfCompletedTodo'];
        }
    }
}
</script>
<style lang="css" scoped>
</style>
