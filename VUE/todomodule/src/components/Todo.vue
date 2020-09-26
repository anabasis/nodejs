<template lang="html">
    <div class="mb-2 d-flex">
        <!-- {{ todo.checked }} -->
        <input
            type="checkbox"
            :checked="todo.checked"
            @change="toggleCheckbox"
            />
        <span
        class="ml-3 flex-grow-1"
        :class="todo.checked ? 'text-muted' : '' "
        :style="todo.checked ? 'text-decoration:line-through' : '' "
        >
            {{todo.text}}
        </span>
        <button
            class="btn btn-danger btn-sm"
            @click="clickDelete"
            >Delete</button>
            {{ numberOfCompletedTodo }}
    </div>
</template>

<script>
export default {
    props : {
        todo : {
            type : Object,
            required : true
        }
    },
    computed: {
        numberOfCompletedTodo() {
            //return this.$store.getters.numberOfCompletedTodo;
            return this.$store.getters['todo/numberOfCompletedTodo'];
        }
    },
    methods : {
        toggleCheckbox(e){
            // this.$store.commit('TOGGLE_TODO', {
            //    id : this.todo.id,
            //    checked : e.target.checked
            // });  // mutations
            this.$store.dispatch('todo/toggleTodoAction', {
                 id : this.todo.id,
                 checked : e.target.checked
            })
        },
        clickDelete(){
            // this.$store.commit('DELETE_TODO', this.todo.id);
            this.$store.dispatch('todo/deleteTodoAction', this.todo.id);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
