import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

let id = 0; // todo 아이템에 들어갈 고유 값 입니다

// Record 함수는 Record 형태 데이터를 만드는 함수를 반환합니다.
// 따라서, 만든 다음에 뒤에 () 를 붙여줘야 데이터가 생성됩니다.
const initialState = Record({
  input: '',
  todos: List()
})();

// Todo 아이템의 형식을 정합니다.
const TodoRecord = Record({
  id: id++,
  text: '',
  checked: false
})

export default handleActions({
  [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
  [INSERT]: (state, { payload: text }) => {
    // TodoRecord 를 사용해야 아이템도 Record 형식으로 조회 가능합니다.
    // 빠져있는 값은, 기본값을 사용하게 됩니다 (checked: false)
    const item = TodoRecord({ id: id++, text });
    return state.update('todos', todos => todos.push(item));
  },
  [TOGGLE]: (state, { payload: id }) => {
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.updateIn(['todos', index, 'checked'], checked => !checked);
  },
  [REMOVE]: (state, { payload: id }) => {
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.deleteIn(['todos', index]);
  }
}, initialState);
