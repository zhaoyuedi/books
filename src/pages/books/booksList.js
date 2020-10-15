import React, { Component } from 'react'
import { BooksList,deleteHandler } from "@api";
import { withRouter } from 'react-router-dom';
import { Table,Form, Input,Row,Col, Select,Icon, Button ,Modal,message} from 'antd';
import { TableWarp } from "./styled";


const FormItem = Form.Item;
const { Option } = Select;
const {confirm} = Modal

@withRouter
@Form.create()
class BooksListWarp extends Component {
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
    const count = await BooksList({...parameter})
    console.log(count)
    BooksList(params).then(res=>{
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
    this.props.history.push(`/book/detail/${record.id}`)
  }
  deleteHandler = (record)=>{
    const {table:{current}} = this.state
    confirm({
      title: '警告',
      content: '确定是否删除',
      okText:"确认",
      cancelText:"取消",
      onOk:()=>{
        deleteHandler(record.id).then(v=>{
          this.updateTable(current)
          message.success('删除成功')
        })
      },
    });
  }
  setColumns = ()=>{
    return [
      {
        title: '图书编号',
        dataIndex: 'code',
        key: 'code',
        width: 200,
      },
      {
        title: '图书名称',
        dataIndex: 'bookName',
        key: 'bookName',
        width: 200,
      },
      {
        title: '图书作者',
        dataIndex: 'author',
        key: 'author',
        width: 200
      },
      {
        title: '图书价格',
        dataIndex: 'price',
        key: 'price',
        width: 200
      },
      {
        title: '图书类型',
        dataIndex: 'type',
        key: 'type',
        width: 200
      },
      {
        title: '图书出版社',
        dataIndex: 'press',
        key: 'press',
        width: 200
      },
      {
        title: '图书总数',
        dataIndex: 'amount',
        key: 'amount',
        width: 200
      },
      {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        width: 200,
        // render: text => <span>{text.join(',')}</span>
      },
      {
        title: '图书描述',
        dataIndex: 'describe',
        key: 'describe',
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
      if(value.type==='grade'){
        parameter['q'] =  value.value
      }else{
        parameter[value.type] = value.value
      }
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
  goAddBook = ()=>{
    this.props.history.push('/addBook')
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
    const gradeArr = ['一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三']
    const type = [
      {
        dicCode:'code',
        dicName:'图书编码'
      },
      {
        dicCode:'bookName',
        dicName:'图书名称'
      },
      {
        dicCode:'author',
        dicName:'图书作者'
      },
      {
        dicCode:'price',
        dicName:'图书价格'
      },
      {
        dicCode:'type',
        dicName:'图书类型'
      },
      {
        dicCode:'press',
        dicName:'图书出版社'
      },
      {
        dicCode:'amount',
        dicName:'图书总数'
      },
      {
        dicCode:'describe',
        dicName:'图书描述'
      },
      {
        dicCode:'grade',
        dicName:'年级'
      }
    ]
    const TypeArr = [
      'IT','农业科学','历史地理','数理科学和化学','文化教育','文学','生物科学','自然科学总论','语言'
    ]
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
                  this.props.form.getFieldValue('type')==='type'?
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
                  this.props.form.getFieldValue('type')==='grade'?
                  <Select placeholder='请选择查询条件'>
                      {
                        gradeArr.map(v=>(
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
              <Button type="primary" style={{marginTop:5}} onClick={this.goAddBook}>
                添加图书
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

export default BooksListWarp
