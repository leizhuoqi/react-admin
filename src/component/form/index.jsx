import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Form,Input,Button,Icon,message} from 'antd'
const {Item} = Form
class MyForm extends Component {
    static propTypes = {
        login:PropTypes.func.isRequired
    }
    checkPassword=(rules,value,callback)=>{
     if(!value){
         callback('必须输入密码')
     }else if(value.length<4){
         callback('密码不能小于4位')
     }else if(value.length>16){
         callback('密码不能大于16位')
     }else if(!/^[a-zA-Z0-9_]+$/){
         callback('密码必须由大小写字母、数字、下划线组成')
     }else{
         callback()
     }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.props.form)
        const {validateFields,resetFields} = this.props.form;
        validateFields(async (error,values)=>{
            if(!error){
                const {username,password} = values;
                console.log(values)
                this.props.login(username,password)
            }else{
               resetFields(['password'])
                const errMsg = Object.values(error).reduce((prev,curr)=>prev+curr.errors[0].message+' ','')
                message.error(errMsg)
            }
        })
    }
  render () {
      const {getFieldDecorator} =this.props.form;
    return (
        <Form className="form-container" onSubmit={this.handleSubmit}>
            <Item>
                {
                    getFieldDecorator('username',{
                        rules: [{ required: true, message: '请输入用户名!' },
                            {max:16,message:'用户名不能大于16位'},
                            {min:4,message:'用户名不能小于4位'},
                            {whitespace:true,message:'不能含有空格等非法字符串'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须由大小写字母、数字、下划线组成'}
                            ],
                        }
                    )(<Input type="user" prefix={<Icon type="user" />} placeholder="请输入用户名" />)
                }

            </Item>
            <Item>
                {
                    getFieldDecorator('password', {
                        rules:[{validator:this.checkPassword}]}
                    )(<Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码"/>)
                }
            </Item>
            <Item>
                <Button className="form-submit" htmlType="submit" type="primary">登录</Button>
            </Item>
        </Form>   
    )
  }
}
const LoginForm = Form.create()(MyForm)
export default LoginForm;
