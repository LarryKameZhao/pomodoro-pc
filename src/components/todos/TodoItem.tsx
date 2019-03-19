import * as React from 'react'
import { Checkbox, Icon } from 'antd'
import classNames from 'classnames'
import './todoItem.scss'
interface ITodoItemProps {
  description: string
  completed: boolean
  id: number
  update: (id: number, prams: any) => void
  editing: boolean
  toEditing: (id: number) => void
}
interface ITodoItemState {
  editText: string
}
class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props) {
    super(props)
    this.state = {
      editText: this.props.description
    }
  }
  update = (params: any) => {
    this.props.update(this.props.id, params)
  }
  toEditing = () => {
    this.props.toEditing(this.props.id)
  }
  keyUpHandle = (e) => {
    if (e.keyCode ===13 && this.state.editText !== '') {
      this.update({description: this.state.editText})
    }
  }
  public render() {
    const Editing = (
      <div className="editing">
        <input type="text" value={this.state.editText} 
          onChange={e=>this.setState({editText: e.target.value})}
          onKeyUp={this.keyUpHandle}
        />
        <div className="iconWrapper">
          <Icon className="icon"  type="enter"/>
          <Icon className="icon" type="delete" theme="filled" 
          onClick={e=>this.update({deleted: true})}/>
        </div>
      </div>
    )
    const Text = (
      <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>
    )
    const todoItemClass = classNames({
      completed: this.props.completed,
      editing: this.props.editing,
      'todo-item': true,
    })
    return (
      <div className={todoItemClass}>
        <Checkbox
          checked={this.props.completed}
          onChange={e => this.update({ completed: e.target.checked })}
        />
        {
          this.props.editing ? Editing : Text
        }
      </div>
    )
  }
}
export default TodoItem
