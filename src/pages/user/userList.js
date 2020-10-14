import React, { Component } from 'react'
import { getUser,deleteUserHandler } from "@api";
import { withRouter } from 'react-router-dom';
import { Table,Form, Input,Row,Col, Select,Icon, Button ,Modal,message} from 'antd';
import { TableWarp } from "./styled";


const FormItem = Form.Item;
const { Option } = Select;
const {confirm} = Modal

@withRouter
@Form.create()
class UserList extends Component {
  constructor(){
    super()
    this.state = {
      table:{},
      parameter:{},
      loading:true
    }
  }
  componentDidMount(){
    this.updateTable(1)
  }
  updateTable=async (_page=1,_limit=5)=>{
    this.setState({
      loading:true
    })
    const {parameter} = this.state
    let params = {
      _page,
      _limit,
      ...parameter
    }
    const count = await getUser({...parameter})
    getUser(params).then(res=>{
        this.setState({
          table:{
            dataSource:res,
            count:count.length,
            current:_page
          },
          loading:false
        })
    })
  }
  modificationHandler = (record)=>{
    this.props.history.push(`/userList/detail/${record.id}`)
  }
  deleteHandler = (record)=>{
    const {table:{current}} = this.state
    confirm({
      title: '警告',
      content: '确定是否删除',
      okText:"确认",
      cancelText:"取消",
      onOk:()=>{
        deleteUserHandler(record.id).then(v=>{
          this.updateTable(current)
          message.success('删除成功')
        })
      },
    });
  }
  setColumns = ()=>{
    return [
      {
        title: '用户编号',
        dataIndex: 'code',
        key: 'code',
        width: 200,
      },
      {
        title: '用户账号',
        dataIndex: 'userId',
        key: 'userId',
        width: 200,
      },
      {
        title: '用户密码',
        dataIndex: 'password',
        key: 'password',
        width: 200,
        render: text =><span>{text.slice(0,-3)}***</span> 
      },
      {
        title: '用户电话',
        dataIndex: 'call',
        key: 'call',
        width: 200
      },
      {
        title: '用户姓名',
        dataIndex: 'userName',
        key: 'userName',
        width: 200
      },
      {
        title: '用户年龄',
        dataIndex: 'age',
        key: 'age',
        width: 200
      },
      {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        width: 200
      },
      {
        title: '用户修改次数',
        dataIndex: 'alterNum',
        key: 'alterNum',
        width: 200
      },
      {
        width: 100,
        title: '修改',
        key: 'modification',
        render: (text,record) => <span className='fixedSpan' onClick={()=>this.modificationHandler(record)}>修改</span>,
        fixed: 'right',
      },
      {
        width: 100,
        title: '删除',
        key: 'delete',
        render: (text,record) => <span className='fixedSpan' onClick={()=>this.deleteHandler(record)}>删除</span>,
        fixed: 'right',
      }
    ];
  }
  handleTableChange = (page, pageSize) => {
    this.updateTable(page);
  };
  onSubmit = ()=>{
    this.props.form.validateFields((err,value)=>{
      if(err){
        return
      }
      let parameter = {}
      parameter[value.type] = value.value
      this.setState({
        parameter
      },()=>{
        this.updateTable()
      })
    })
  }
  clearSearchValues = ()=>{
    this.props.form.resetFields()
  }
  goAddUser = ()=>{
    this.props.history.push('/userList/detail')
  }
  onFocus = ()=>{
    if(!this.props.form.getFieldValue('type')){
      message.warning('请先选择查询条件')
      return
    }
  }
  render() {
    const {table,loading} = this.state
    const {
      form: { getFieldDecorator }
    } = this.props
    const type = [
      {
        dicCode:'code',
        dicName:'用户编号'
      },
      {
        dicCode:'userId',
        dicName:'用户账号'
      },
      {
        dicCode:'call',
        dicName:'用户电话'
      },
      {
        dicCode:'userName',
        dicName:'用户姓名'
      },
      {
        dicCode:'age',
        dicName:'用户年龄'
      },
      {
        dicCode:'grade',
        dicName:'年级'
      },
      {
        dicCode:'alterNum',
        dicName:'用户修改次数'
      }
    ]
    const TypeArr = ['研一','研二','研三']
    return (
      <TableWarp>
        <Form labelAlign='left'>
          <Row>
            <Col span={6} >
              <FormItem label='条件' {...{labelCol:{span:4},wrapperCol:{span:20}}}>
                {
                  getFieldDecorator(
                    'type'
                  )(
                    <Select
                      placeholder='-请选择-'
                      suffixIcon={
                        <Icon type="caret-down" style={{ transform: 'scale(0.7)' }} />
                      }
                      allowClear={true}
                      style={{ width: '100%' }}
                      notFoundContent='没有找到数据'
                    >
                      {type.map(v => (
                        <Option value={v.dicCode} key={v.dicCode}>{v.dicName}</Option>
                      ))}
                    </Select>

                  )
                }
              </FormItem>
            </Col>
            <Col span={6} style={{paddingLeft:8}}>
              <FormItem >
              {
                getFieldDecorator(
                  'value'
                )(
                  this.props.form.getFieldValue('type')==='grade'?
                  <Select placeholder='请选择查询条件'>
                      {
                        TypeArr.map(v=>(
                          <Option key={v} value={v}>
                            {v}
                          </Option>
                        ))
                      }
                  </Select>
                  :
                  <Input placeholder='请输入查询条件' onFocus={this.onFocus}/>
                )
              }
            </FormItem>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={this.onSubmit} style={{marginRight:5}}>
                查询
              </Button>
              <Button type="danger" onClick={this.clearSearchValues} style={{marginRight:5}}>
                重置信息
              </Button>
              <Button type="primary" style={{marginTop:5}} onClick={this.goAddUser}>
                添加用户
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
            rowKey={record => record.id}
            columns={this.setColumns()}
            className="menuListTable"
            loading={loading}
            dataSource={table.dataSource}
            pagination={{
              total: table.count,
              pageSize:5,
              onChange: this.handleTableChange,
              current:table.current
            }}
            scroll={{ x:1500  }}
          />
      </TableWarp>
    )
  }
}

export default UserList