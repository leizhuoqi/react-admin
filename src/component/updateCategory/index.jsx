import React, {Component} from 'react';
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
 class UpdateCategory extends Component {
    static propTypes = {
        categoryName:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
  render () {
        const {getFieldDecorator} = this.props.form;
        const {categoryName} = this.props
      console.log(categoryName)
    return (
        <Form>
            <Item>
                {
                    getFieldDecorator(
                       'categoryName',
                       {
                           initialValue:categoryName
                       }
                    )(
                        <Input />
                    )
                }
            </Item>
        </Form>
    )
  }
}

export default Form.create()(UpdateCategory)