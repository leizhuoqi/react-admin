
import React, {Component} from 'react';
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs'
import MemoryUtils from '../../utils/memoryUtils'
import menuList from  '../../config/menuConfig';
import {reqWeather} from '../../api'
import './index.less'

 class Header extends Component {
   state={
       time:dayjs().format('YYYY MM DD HH:mm:ss'),
       dayPictureUrl:"http://api.map.baidu.com/images/weather/day/qing.png",
       weather:'晴'
   }
    logout=()=>{
        Modal.confirm({
            title: '您确定是否登出账号',
                content: '退出去就要重新输入账号咯',
                onOk:()=>{
                console.log(this)
                this.props.history.replace('/login')
            },

        })
    }
   componentWillMount(){
       this.getTime()
       this.getWeather()
   }
  getTitle=(menu)=>{
        const {pathname} = this.props.location;
      for (let i = 0; i <menu .length; i++) {
          let item = menu[i]
          if(item.children){
              const result = this.getTitle(item.children)
              if(result){
                  return result
              }
          }else{
              if(item.key === pathname){
                  return item.title

              }
          }
      }
  }
  getTime=()=>{
    this.intervalId = setInterval(()=>{
        this.setState({
            time:dayjs().format('YYYY MM DD HH:mm:ss')
        })
    },1000)
  }
  getWeather=()=>{
     reqWeather('北京')
         .then(res=>{
             this.setState({
                 dayPictureUrl:res.dayPictureUrl,
                 weather:res.weather
             })
         })
  }
  componentWillUnmount(){
       clearInterval(this.intervalId)
  }
  render () {
      const {username} = MemoryUtils.user
      const title = this.getTitle(menuList)
      const {time,dayPictureUrl,weather} = this.state

    return (
        <div className="Header">
            <Row className="Header-top">
                <span>
                    您好，<a href="javascript:void(0);">{username}</a>
                </span>
                <a href="javascript:void(0);" className="logOut" onClick={this.logout}>登出</a>
            </Row>
            <Row className="Header-bottom">
                <Col span={6} className='header-bottom-left'>{title}</Col>
                <Col span={18} className='header-bottom-right'>
                    <span>{time}</span>
                    <img src={dayPictureUrl} alt="天气图片"/>
                    <span>{weather}</span>
                    </Col>
            </Row>
        </div>
    )
  }
}
export default withRouter(Header)
