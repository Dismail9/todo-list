import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  SET_EDITABLE_TODO,
  CLEAR_EDITABLE_TODO,
} from './types'

export function addTodo(newTodo) {
  return {
    type: ADD_TODO,
    payload: newTodo,
  }
}

export function removeTodo(todoId) {
  return {
    type: REMOVE_TODO,
    payload: todoId,
  }
}

export function editTodo(updateTodo) {
  return {
    type: EDIT_TODO,
    payload: updateTodo,
  }
}

export function toggleTodo(todoId) {
  return {
    type: TOGGLE_TODO,
    payload: todoId,
  }
}

export function setEditableTodo(todo) {
  return {
    type: SET_EDITABLE_TODO,
    payload: todo,
  }
}

export function clearEditableTodo() {
  return {
    type: CLEAR_EDITABLE_TODO,
  }
}
