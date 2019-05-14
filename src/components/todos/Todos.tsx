import * as React from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import http from 'src/config/axios'
import { connect } from 'react-redux'
import { updateTodo } from '../../redux/action'
import './todos.scss'

class Todos extends React.Component<any> {
  constructor(props) {
    super(props)
  }
  addTo = async (params: any) => {
    try {
      const response = await http.post('todos', params)
      console.log(response)
    } catch (e) {
      throw new Error(e)
    }
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter(t => !t.completed)
  }
  get completedTodos() {
    return this.unDeletedTodos.filter(t => t.completed)
  }
  get unDeletedTodos() {
    return this.props.todos.filter(t => !t.deleted)
  }


  public render() {
    return (
      <div className="todos">
        <TodoInput />
        <div className="todo-main">
          {this.unCompletedTodos.map(t => {
            return <TodoItem key={t.id} {...t} />
          })}

        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
})
const mapStateActions = {
  updateTodo,

}
export default connect(
  mapStateToProps,
  mapStateActions
)(Todos)
