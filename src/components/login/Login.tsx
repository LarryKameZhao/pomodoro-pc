import * as React from 'react'
import { Input, Icon, Button } from 'antd'
import {Link} from 'react-router-dom'
import './login.scss'
import http from 'src/config/axios'

interface IloginState {
  account: string,
  password: string
}
class Login extends React.Component<any, IloginState> {
  constructor(props) {
    super(props)
    this.state = {
      account:'',
      password: ''
    }
  }
  submit = async ()=> {
    const { account, password } = this.state
    try {
      await http.post('sign_in/user', {
        account,
        password
      }).then((res)=>{
        console.log('登录成功')
        console.log(res.statusText)
        if (res.statusText === 'OK') {
          this.props.history.push('/')
        }
      })
    } catch(e) {
      throw new Error(e)
    }
  }
  onChangeAccount = (e) => {
    this.setState({
      account:e.target.value
    })
  }
  onChangePassword = (e) => {
    this.setState({
      password:e.target.value
    })
  }
	public render() {
    const {password, account} = this.state
		return (
			<div className="login">
				<h1>登录 pomodoro</h1>
				<Input
          placeholder="请输入你的用户名"
          onChange={this.onChangeAccount}
          value={account}
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				/>
				<Input.Password value={password} placeholder="请输入密码"  onChange={this.onChangePassword}/>
				
				<Button type="primary" className="loginButton" onClick={this.submit}>
					登录
				</Button>
        <p>如果你没有账号，请立即 <Link to="/signup">注册</Link></p>
			</div>
		)
	}
}
export default Login
