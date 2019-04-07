import { ADD_TOMATO, UPDATE_TOMATO, INIT_TOMATOES } from '../actionTypes'

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  }
}

export const updateTomato = (payload: any) => {
  return {
    type: UPDATE_TOMATO,
    payload
  }
}

export const initTomatoes = (payload: any[]) => {
	console.log('in initTomato action')
	console.log(payload)
  return {
    type: INIT_TOMATOES,
    payload
  }
}
