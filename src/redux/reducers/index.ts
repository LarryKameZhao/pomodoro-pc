import { combineReducers } from 'redux'
import todos from './todoReducers'
import tomatoes from './tomatoReducers'
export default combineReducers({ todos, tomatoes})
