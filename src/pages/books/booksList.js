import React, { Component } from 'react'
import { BooksList } from "@api";
import { withRouter } from 'react-router-dom';
import { Table,Form, Input,Row,Col, Select,Icon, Button } from 'antd';


const FormItem = Form.Item;
const { Option } = Select;

@withRouter
@Form.create()
class BooksListWarp extends Component {
  constructor(){
    super()
    this.state = {
      table:{},
      parameter:{}
    }
  }
  componentDidMount(){
    this.updateTable(1)
  }
  updateTable=async (_page=1,_limit=5)=>{
    const {parameter} = this.state
    let params = {
      _page,
      _limit,
      ...parameter
    }
    const count = await BooksList()
    console.log(count)
    BooksList(params).then(res=>{
        this.setState({
          table:{
            dataSource:res,
            count:count.length
          }
        })
    })
  }
  setColumns = ()=>{
    return [
      {
        title: '图书编码',
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
        title: '图书描述',
        dataIndex: 'describe',
        key: 'describe',
        width: 200
      },
      {
        width: 100,
        title: '修改',
        key: 'modification',
        render: () => <span>修改</span>,
        fixed: 'right',
      },
      {
        width: 100,
        title: '删除',
        key: 'delete',
        render: () => <span>删除</span>,
        fixed: 'right',
      }
    ];
  }
  handleTableChange = (page) => {
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
  goAddBook = ()=>{
    this.props.history.push('/addBook')
  }
  render() {
    const {table} = this.state
    const {
      form: { getFieldDecorator }
    } = this.props
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
    ]
    return (
      <div>
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
                  <Input placeholder='请输入查询条件'/>
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
            rowKey={record => record.code}
            columns={this.setColumns()}
            className="menuListTable"
            // loading={loading}
            dataSource={table.dataSource}
            pagination={{
              total: table.count,
              pageSize:5,
              onChange: this.handleTableChange,
            }}
            scroll={{ x:1500  }}
          />
      </div>
    )
  }
}

export default BooksListWarp
