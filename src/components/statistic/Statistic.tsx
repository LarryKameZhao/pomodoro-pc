import * as React from 'react'
import {connect} from 'react-redux'
import './statistic.scss'
import Polygon from './Polygon'
import _ from 'lodash'
import {format} from "date-fns"
interface  IStatisticProps {
  todos: any[]
}
class Statistic extends React.Component<IStatisticProps> {
  constructor(props) {
    super(props)
  }
  get finishedTodos () {
    return this.props.todos.filter(item=>item.completed && !item.deleted)
  }
  get dailyTodos () {
    return  _.groupBy(this.finishedTodos,(todo)=>{
      return format(todo.updated_at,'YYYY-MM-D')
    })
  }
  public render() {
    return (
      <div id="Statistic">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>任务历史
            累计完成{this.finishedTodos.length}
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
})
export default connect(mapStateToProps)(Statistic)