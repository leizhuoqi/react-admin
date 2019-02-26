import React, {Component} from 'react';
import logo from './logo.png'
import './index.less'
import LoginForm from '../../component/form'
export default class Login extends Component {
  render () {
    return (
      <div className="Login-Body">
          <header className="Login-Header">
              <img src={logo} alt="logo"/>
              <h1>React项目: 后台管理系统</h1>
          </header>
          <section className="Login-Form">
            <h2>用户登录</h2>
              <LoginForm/>
          </section>
      </div>
    )
  }
}

