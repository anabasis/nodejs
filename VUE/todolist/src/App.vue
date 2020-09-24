<template lang="html">
    <div id="app" class="container">
        <h1 class="text-center">ToDo App</h1>
        <CompletedTodo :todos="todos" />
        <AddTodo
        @add-todo="addTodo"
        ></AddTodo>
        <hr />
        <TodoList
            :todos="todos"
            @toggle-checkbox="toggleCheckbox"
            @click-delete="deleteTodo"
        ></TodoList>
        {{ todos }}
    </div>
</template>

<script>
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import CompletedTodo from '@/components/CompletedTodo';

export default {
    components: {
        TodoList,
        AddTodo,
        CompletedTodo
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
        addTodo(value) {
            this.todos.push({
                id:Math.random(),
                text: value,
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
