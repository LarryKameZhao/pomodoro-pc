import * as React from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import http from 'src/config/axios'
import './todos.scss'
interface ITodoItemState{
  todos: any[];
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
    console.log('getTodos')
    try {
      const response = await http.get('todos')
      console.log(response.data)
      this.setState({
        todos: response.data.resources
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
  componentDidMount() {
    this.getTodos()
  }
  public render() {
    return (
      <div className="todos">
        <TodoInput addTodo={params => this.addTo(params)} />
        <main>
          {
            this.state.todos.map((item,index)=>{
              return <TodoItem key={item.id} {...item}
                update = {this.updateTodo}
              />
            })
          }
        </main>
      </div>
    )
  }
}
export default Todos
