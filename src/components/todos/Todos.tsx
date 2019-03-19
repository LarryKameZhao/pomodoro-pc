import * as React from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import http from 'src/config/axios'
import './todos.scss'
interface ITodoItemState{
  todos: any[]
}
class Todos extends React.Component<any,ITodoItemState> {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  addTo = async (params: any) => {
    try {
      const response = await http.post('todos', params)
      console.log(response)
    } catch (e) {
      throw new Error(e)
    }
  }
  getTodos = async () => {
    try {
      const response = await http.get('todos')
      const todos = response.data.resources.map(t=>Object.assign({}, t,{editing: false}))
      console.log(todos)
      console.log('........')
      this.setState({
        todos
      })
    }catch(e){
      throw new Error(e)
    }
  }
  updateTodo = async(id:number,params:any)=>{
    const {todos} = this.state
    try{
      const response = await http.put(`todos/${id}`,params)
      const newTodos = todos.map(t=>{
        if(id === t.id) {
          return response.data.resource
        } else {
          return t
        }
      })
      this.setState({todos: newTodos})
    }catch(e) {
      throw new Error(e)
    }
  }
  toEditing = (id:number) => {
    const {todos} = this.state
    const newTodos = todos.map(t=>{
      if(id === t.id) {
        return Object.assign({},t,{editing:true})
      } else {
        return Object.assign({},t,{editing:false})
      }
    })
    this.setState({
      todos: newTodos
    })
  }
  get unCompletedTodos () {
    return this.unDeletedTodos.filter(t=>!t.completed)
  }
  get completedTodos () {
    return this.unDeletedTodos.filter(t=>t.completed)
  }
  get unDeletedTodos () {
    return this.state.todos.filter(t=>!t.deleted)
  }
  
  componentDidMount() {
    this.getTodos()
  }
  public render() {
    return (
      <div className="todos">
        <TodoInput addTodo={params => this.addTo(params)} />
        <div className="todo-main">
          {
            this.unCompletedTodos.map((item,index)=>{
              return <TodoItem key={item.id} {...item}
                update = {this.updateTodo}
                toEditing = {this.toEditing}
              />
            })
          }
          {
            this.completedTodos.map((item,index)=>{
              return <TodoItem key={item.id} {...item}
                update = {this.updateTodo}
                toEditing = {this.toEditing}
              />
            })
          }
          
        </div>
      </div>
    )
  }
}
export default Todos
