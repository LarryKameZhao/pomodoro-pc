import {ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO} from './actionTypes'
export const addTodo = (payload:any) => {
  console.log(payload)
  return {
    type: ADD_TODO,
    payload
  }
}
export const initTodos = (payload:any []) => {
  return {
    type:INIT_TODOS,
    payload
  }
}
export const updateTodo = (payload:number) => {
  return {
    type: UPDATE_TODO,
    payload
  }
}
export const editingTodo = (payload:number) => {
  return {
    type: EDIT_TODO,
    payload
  }
}