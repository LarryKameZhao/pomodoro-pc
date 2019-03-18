import * as React from 'react'
import TodoInput from './TodoInput'
import http from 'src/config/axios'
import './todos.scss'
class Todos extends React.Component {
  addTo = async (params: any) => {
    try {
      const response = await http.post('todos', params)
      console.log(response)
    } catch (e) {
      throw new Error(e)
    }
  }
  public render() {
    return (
      <div className="todos">
        <TodoInput addTodo={params => this.addTo(params)} />
      </div>
    )
  }
}
export default Todos
