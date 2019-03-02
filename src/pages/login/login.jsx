import React, {Component} from 'react';
import logo from '../../assets/logo.png'
import './index.less'
import LoginForm from '../../component/form'
import {reqLogin} from  '../../api'
import {setItem} from '../../utils/storageUtils'
import MemoryUtils from '../../utils/memoryUtils'
export default class Login extends Component {
    state={
        errMsg:''
    }
    login=async (username,password)=>{
        const result = await reqLogin(username,password)
        console.log(result)
        if(result.status === 0){
            console.log(1)
            setItem(result.data)
            MemoryUtils.user = result.data
            console.log(111)
            this.props.history.replace('/home')
        }else{
            console.log(result)
            this.setState({

                errMsg:result.msg
            })
        }
    }
  render () {
        const {errMsg} =this.state;
        const height = errMsg ? 30 :0 ;
    return (
      <div className="Login-Body">
          <header className="Login-Header">
              <img src={logo} alt="logo"/>
              <h1>React项目: 后台管理系统</h1>
          </header>
          <section className="Login-Form">
              <div className="errMsg" style={{height}}>{errMsg}</div>
            <h2>用户登录</h2>
              <LoginForm login={this.login}/>
          </section>
      </div>
    )
  }
}

