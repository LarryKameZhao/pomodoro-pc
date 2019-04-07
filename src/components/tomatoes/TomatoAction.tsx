import * as React from 'react'
import './tomatoes.scss'
import { connect } from 'react-redux'
import { Button, Input } from 'antd'
import http from 'src/config/axios'
import CountDown from './CountDown'
interface ITomatoActionProps {
  startTomato: () => void
  unfinishedTomato: any,
  updateTomato: (payload: any[])=>void
}
interface ITomatoActionState {
  description: string
}
class TomatoAction extends React.Component<
  ITomatoActionProps,
  ITomatoActionState
> {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }
  onKeyUp = e => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addDescription()
    }
  }
  addDescription = async () => {
    try {
      const response = await http.put(
        `tomatoes/${this.props.unfinishedTomato.id}`,
        { description: this.state.description, ended_at: new Date() }
      )
      console.log(response)
      this.props.updateTomato(response.data.resource)
      this.setState({ description: '' })
    } catch (e) {
      throw new Error(e)
    }
  }
  public render() {
    let html = <div />
    if (this.props.unfinishedTomato === undefined) {
      html = (
        <Button
          onClick={() => {
            this.props.startTomato()
          }}
          className="start-button"
        >
          start tomato
        </Button>
      )
    } else {
      const started = Date.parse(this.props.unfinishedTomato.started_at)
      const duration = this.props.unfinishedTomato.duration
      const timeNow = new Date().getTime()
      console.log(started)
      if (timeNow - started > duration) {
        html = (
          <div>
            <Input
              value={this.state.description}
              onChange={e => {
                this.setState({ description: e.target.value })
              }}
              onKeyUp={e => this.onKeyUp(e)}
              placeholder="请输入你刚刚完成的任务"
            />
          </div>
        )
      } else if (timeNow - started < duration) {
        const timer = duration - timeNow + started
        html = (
          <div>
            {' '}
            <CountDown timer={timer} duration={duration}/>
          </div>
        )
      }
    }

    return <div className="tomato-action">{html}</div>
  }
}
export default connect()(TomatoAction)
