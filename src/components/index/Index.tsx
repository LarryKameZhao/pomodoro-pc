import * as React from 'react'
import http from 'src/config/axios'
import {Button} from 'antd'
interface IRouter {
	history: any
}
interface IIndexState {
  user: any
}
class Index extends React.Component<IRouter, IIndexState> {
	constructor(props: any) {
    super(props)
    this.state = ({
      user: {}
    })
	}
	login = () => {
		console.log('login')
		this.props.history.push('/signup')
	}
	async componentWillMount() {
    await this.getMe()
  }
  getMe = async () => {
    try {
      const response = await http('me')
      console.log(response)
      if (response.status === 200) {
        this.setState({user: response.data})
      }
      else {
        this.props.history.push('/login')
      }
    }catch(e) {
      console.log(e)
    }
  }
  logout = ()=> {
    localStorage.setItem('x-token', '')
    this.props.history.push('/login')
  }
	public render() {
		return (
			<div className="index">
        <p>欢迎, {this.state.user && this.state.user.account}</p>
        <Button type="primary" onClick={this.logout}>登出</Button>
      </div>
		)
	}
}
export default Index
