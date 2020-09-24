<template lang="html">
    <div id="app" class="container">
        <h1 class="text-center">ToDo App</h1>
        <input
            v-model="todoText"
            type="text"
            class="w-100 p-2"
            placeholder="Type todo"
            @keyup.enter="addTodo"
            >
        <hr />
        <!--
        <input type="checkbox" />
        <span class="ml-3">Buy a Car</span>
        -->
        <Todo
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @toggle-checkbox="toggleCheckbox"
            @click-delete="deleteTodo"
             ></Todo>
            <!-- {{ todos }} -->
    </div>
</template>

<script>
import Todo from '@/components/Todo.vue'

export default {
    components:{
        Todo
    },
    data(){
        return {
            todoText: '',
            todos : [
                {id : 1, text : 'Buy a Car', checked : false},
                {id : 2, text : 'Play Game', checked : false}
            ]
        }
    },
    methods: {
        addTodo(e) {
            this.todos.push({
                id:Math.random(),
                text: e.target.value,
                checked:false
            });
            //console.log(e.target.value);

            this.todoText = '';
        },
        toggleCheckbox({id, checked}){
            //console.log(id, checked);
            const index = this.todos.findIndex(todo => {
                return todo.id === id ;
            });
            this.todos[index].checked = checked;
        },
        deleteTodo(id){
            // const index = this.todos.findIndex(todo => {
            //     return todo.id === id ;
            // });
            // this.todos.splice(index,1);
            this.todos = this.todos.filter(todo => todo.id != id);
        }
    }

}
</script>

<style lang="css" scoped>
</style>
