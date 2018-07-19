import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate'
import Form from './components/Form'
import TodoItemList from './components/TodoItemList'

class App extends Component {
  id = 3; // 이미 1,2,3이 존재하므로 3으로 지정

  state = {
    input : '',
    todos : [
      {id:0, text : '리액트 소개 1', checked : false},
      {id:1, text : '리액트 소개 2', checked : true},
      {id:2, text : '리액트 소개 3', checked : false}
    ]
  }

  handleChange = (e) => {
    this.setState({
      input : e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state ;
    this.setState({
      input : '',
      todos : todos.concat({
        id : this.id++,
        text : input,
        checked : false
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌러진 키가 Enter 이면 handleCreate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

handleToggle = (id) => {
  const { todos } = this.state;

  // 파라메터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
  const index = todos.findIndex(todo => todo.id === id);

  const selected = todos[index]; //선택한 객체
  this.setState({
    todos : [
      ...todos.slice(0, index),
      {
        ...selected,
        checked : !selected.checked
      },
      ...todos.slice(index + 1, todos.length)
    ]
  });
  /*
      const nextTodos = [...todos]; //배열을 복사
      nextTodos[index] = {
        ...selected,
        checked : !selected.checked
      };

      this.setState({
        todos : nextTodos
      });
  */
}
  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            />
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
