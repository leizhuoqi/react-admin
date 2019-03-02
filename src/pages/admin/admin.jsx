import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import {Layout} from 'antd'
import LeftNav from '../../component/leftNav'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Bar from '../bar'
import Category from '../category'
import Home from '../home'
import Line from '../line'
import Pie from '../pie'
import Product from '../product'
import Role from '../role'
import User from '../user'
import MemoryUtils from '../../utils/memoryUtils'
const {Sider,Content} = Layout
export default class Admin extends Component {

   render () {
       const {user} = MemoryUtils
       if(!user || !user._id){
           // this.props.history.replace('/login')
           return <Redirect to="/login"/>
       }
    return (
        <Layout style={{minHeight:'100vh'}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header/>
              <Content style={{padding:18}}>
                  <Switch>
                      <Route path="/home" component={Home}/>
                      <Route path="/category" component={Category}/>
                      <Route path='/product' component={Product}/>
                      <Route path='/role' component={Role}/>
                      <Route path='/user' component={User}/>
                      <Route path="charts/pie" conponent={Pie}/>
                      <Route path="charts/line" conponent={Line}/>
                      <Route path="charts/bar" conponent={Bar}/>
                  </Switch>
              </Content>
            <Footer/>
          </Layout>
        </Layout>
    )
  }
}

