import * as React from 'react';
import {Button} from "antd";
interface IRouter {
  history: any;
}
class Index extends React.Component<IRouter> {
  constructor(props: any) {
    super(props)
  }
  login = ()=>{
    console.log('login')
    this.props.history.push('/signup')
  }
  public render() {
    return (
      <div className="index">index
        <Button onClick={this.login}>登录</Button>
      </div>
    )
  }
}
export default Index;