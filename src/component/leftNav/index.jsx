import React, {Component} from 'react';
import {Menu,Icon} from 'antd'
import {NavLink,withRouter} from 'react-router-dom'
import logo from '../../assets/logo.png'
import  './index.less'
import menuList from '../../config/menuConfig'
const SubMenu = Menu.SubMenu
const Item = Menu.Item

 class LeftNav extends Component {
  componentWillMount(){
      this.menu = this.createMenu(menuList)
  }
  createMenu=(menu)=>{
     return menu.map(item=>{
          if(item.children){
              const {pathname} = this.props.location;
              const result = item.children.find(item=>item.key === pathname )
              if(result){
                  this.openKeys = item.key;
              }
              return <SubMenu key={item.key} title={<span><Icon type={item.icon}/>{item.title}</span>}>
                  {
                      this.createMenu(item.children)
                  }
              </SubMenu>
          }else{
              return <Item key={item.key}>
                  <NavLink to={item.key}>
                      <Icon type={item.icon}/>
                      <span>{item.title}</span>
                  </NavLink>
              </Item>
          }
      })
  }
  render () {
      const {pathname} = this.props.location;
    return (
        <div className="left-nav">
          <header>
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
          </header>
          <Menu
          theme="dark"
          mode="inline"
           selectedKeys={[pathname]}
           defaultOpenKeys={[this.openKeys]}

          >
              {
                  this.menu
              }
          </Menu>
        </div>
    )
  }
}
export default withRouter(LeftNav)
