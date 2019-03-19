import * as React from 'react'
import { Checkbox } from 'antd'
interface ITodoItemProps {
  description: string,
  completed: boolean,
  id:number,
  update: (id:number,prams: any)=> void
}
class TodoItem extends React.Component<any, ITodoItemProps> {
  constructor(props) {
    super(props)
  }
  update = (params:any)=>{
    this.props.update(this.props.id, params)
  }
  public render() {
    return (
      <div className="todo-item">
        <Checkbox checked={this.props.completed}
          onChange ={e=>this.update({completed: e.target.checked})}
        />
        <span>{this.props.description}</span>
      </div>
    )
  }
}
export default TodoItem
