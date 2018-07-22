import React, { Component } from 'react';
import Todos from 'components/Todos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';

class TodosContainer extends Component {
  (...)
}

export default connect(
  ({ todo }) => ({
    // 일반 객체 다루듯이 다루면 됩니다.
    input: todo.input,
    todos: todo.todos
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodosContainer);
