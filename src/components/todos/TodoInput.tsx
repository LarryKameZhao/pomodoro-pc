import * as React from 'react'
import { Input, Icon } from 'antd'
interface ITodoInputState {
  description: string
}
interface ITodoInputProps {
  addTodo: (params: any) => void
}
class TodoInput extends React.Component<any, ITodoInputState, ITodoInputProps> {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }
  onChangeUserName = e => {
    this.setState({ description: e.target.value })
  }
  onKeyUp = e => {
    if (e.keyCode === 13 && this.state.description !== '') {
      console.log('commit')
      this.addTodo()
      this.setState({ description: '' })
    }
  }
  addTodo = () => {
    this.props.addTodo({ description: this.state.description })
    this.setState({ description: '' })
  }
  render() {
    const { description } = this.state
    const suffix = description ? (
      <Icon type="plus" onClick={this.addTodo} />
    ) : (
      <span />
    )
    return (
      <div className="todo-input">
        <Input
          placeholder="添加你的新事项吧"
          suffix={suffix}
          value={description}
          onChange={e => this.setState({ description: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}
export default TodoInput
