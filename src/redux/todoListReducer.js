import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  SET_EDITABLE_TODO,
  CLEAR_EDITABLE_TODO,
} from './types'

let initialState = {
  list: localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [],
}
let index = null
export default function todoListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, list: [...state.list, action.payload] }
    case REMOVE_TODO:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload),
      }
    case EDIT_TODO:
      index = state.list.findIndex((item) => item.id === action.payload.id)
      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          action.payload,
          ...state.list.slice(index + 1),
        ],
      }
    case TOGGLE_TODO:
      index = state.list.findIndex((item) => item.id === action.payload)
      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          { ...state.list[index], completed: !state.list[index].completed },
          ...state.list.slice(index + 1),
        ],
      }
    case SET_EDITABLE_TODO:
      return { ...state, editableTodo: action.payload }
    case CLEAR_EDITABLE_TODO:
      return { ...state, editableTodo: null }
    default:
      return state
  }
}
