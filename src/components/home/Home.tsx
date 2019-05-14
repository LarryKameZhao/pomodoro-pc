import * as React from 'react';
import {Dropdown, Icon, Menu} from "antd";
import axios from 'src/config/axios';
import history from 'src/config/history'
import './home.scss'
import Todos from 'src/components/todos/Todos'
import Tomatoes from 'src/components/tomatoes/Tomatoes'
import Statistic from 'src/components/statistic/Statistic'
import { initTodos} from '../../redux/action'
import {initTomatoes} from "../../redux/actions/tomatoAction"
import {connect} from 'react-redux'
import http from "../../config/axios";


interface IIndexState {
  user: any
}

const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="user"/>个人设置</Menu.Item>
    <Menu.Item key="2" onClick={logout}><Icon type="logout"/>注销</Menu.Item>
  </Menu>
);

class Home extends React.Component<any, IIndexState> {

  constructor(props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }
  getTodos = async () => {
    try {
      const response = await http.get('todos')
      const todos = response.data.resources.map(t =>
        Object.assign({}, t, { editing: false })
      )
      this.props.initTodos(todos)
    } catch (e) {
      throw new Error(e)
    }
  }
  async componentWillMount() {
    await this.getMe()
    await this.getTodos()
    await this.getTomatoes()
  }
  getTomatoes = async ()=>{
    try {
      const response = await axios.get('tomatoes')
      this.props.initTomatoes(response.data.resources)
    }catch (e) {
      throw new Error(e)
    }
  }

  getMe = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data})
  }

  render() {
    return (
      <div className="home" id="Home">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
						<span>
							{this.state.user && this.state.user.account}
              <Icon type="down" style={{marginLeft: 8}}/>
						</span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes/>
          <Todos/>
        </main>
        <Statistic/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
  ...ownProps
})
const mapStateActions = {
  initTodos,
  initTomatoes
}
export default connect(mapStateToProps, mapStateActions)(Home);