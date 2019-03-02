import React, {Component} from 'react';
import {Table,Card,Button,Icon,message,Modal} from 'antd'
import {reqCategory,reqAddCategory,reqUpdateCategory} from '../../api'
import AddCategoryForm from '../../component/addCategoryForm'
import UpdateCategory from '../../component/updateCategory'

export default class Category extends Component {
    state={
        category:[],
        isShowAdd:false,
        isShowUpdate:false,
        categoryUpdate:{}
    }
    componentDidMount(){
        this.getCategory('0')
    }

    getCategory = async (parentId)=>{
       const result = await reqCategory(parentId)
        if(result.status === 0){
           this.setState({
               category:result.data
           })

        }else{
            message.error('获取分类列表失败')
        }
    }

    componentWillMount(){
        this.columns = [{
            title:'品类名称',
            dataIndex:'name',
        },{
            title:'操作',
            width:400,
            render:categoryUpdate=>{
                return <div>
                    <a href="javascript:void(0);" onClick={()=>this.setState({isShowUpdate:true,categoryUpdate})}>修改名称</a>&nbsp;&nbsp;&nbsp;
                    <a href="javascript:void(0);">查看其子品类</a>
                </div>
            }
        }]
    }

    addCategory=async ()=>{
        const reqresult = this.form.getFieldsValue();
        const {category} = this.state
        const {parentId,categoryName} = reqresult;
        const result = await reqAddCategory(parentId,categoryName)
        if(result.status === 0){
            message.success('数据添加成功')
            this.setState({
                isShowAdd:false,
                category:[...category,result.data]
            })
        }else{
            message.error('数据添加出现错误')
            this.setState({
                isShowAdd:false
            })
        }
        this.form.resetFields();
    }

    updateCategory=async ()=>{
        const {category} = this.state
       const categoryName = this.form.getFieldValue('categoryName')
        const {name,_id} = this.state.categoryUpdate
        console.log(name)
        if(categoryName === name){
            message.warning('修改前后数据一致，请重新修改')
        }else{
            const result = await reqUpdateCategory(_id,categoryName)
           if(result.status === 0){
                message.success('修改数据成功')
               console.log(category)
               this.setState({
                   isShowUpdate:false,
                   category:this.state.category.map(item=>{
                       if(item._id === _id){
                           item.name = categoryName
                       }
                       return item
                   })
               })
           }else{
               message.error('修改数据失败')
           }
        }
    }

  render () {
      const {category,isShowAdd,isShowUpdate,categoryUpdate} = this.state
      console.log(category)
    return (
        <div>
            <Card
                title="一级分类列表"
                extra={<Button type="primary" onClick={() => this.setState({isShowAdd: true})}><Icon type="plus"/>添加数据</Button>}
            >
            <Table
                columns={this.columns}
                dataSource={category}
                pagination={{
                    pageSize:6,
                    showSizeChanger:true,
                    pageSizeOptions:['3','6','9'],
                    showQuickJumper:true
                }}
                rowKey='_id'
                loading={category.length === 0}
            />
                <Modal
                    title="添加分类"
                    visible={isShowAdd}
                    onOk={this.addCategory}
                    onCancel={()=>this.setState({isShowAdd:false})}
                    okText='确认'
                    cancelText='取消'
                    defaulValue="0"
                >
                    <AddCategoryForm category={category} setForm={form=>this.form=form}/>
                </Modal>

                <Modal
                    title="更新分类"
                    visible={isShowUpdate}
                    onOk={this.updateCategory}
                    onCancel={()=>this.setState({isShowUpdate:false})}
                    okText='确认'
                    cancelText='取消'
                    width={300}
                >
                    <UpdateCategory categoryName={categoryUpdate.name} setForm={form=>this.form=form}/>
                </Modal>
            </Card>
        </div>
    )
  }
}

