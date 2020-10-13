import React, { Component } from 'react'
import { BooksList,getRecommendList } from "@api";
import { withRouter } from 'react-router-dom';
import { Table,Form, Input,Row,Col, Select,Icon, Button ,Modal,message} from 'antd';


const FormItem = Form.Item;
const { Option } = Select;

@withRouter
@Form.create()
class RecommendList extends Component {
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
    const count = await getRecommendList({...parameter})
    const data = await BooksList()
    getRecommendList(params).then(res=>{
        res.forEach(v=>{
            v.code = data.find(d=>d.bookName===v.recommendBook).code
        })
        console.log(res)
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
  setColumns = ()=>{
    return [
      {
        title: '推荐图书编码',
        dataIndex: 'code',
        key: 'code',
        width: 200,
      },
      {
        title: '推荐人',
        dataIndex: 'referrer',
        key: 'referrer',
        width: 200,
      },
      {
        title: '推荐图书名称',
        dataIndex: 'recommendBook',
        key: 'recommendBook',
        width: 200
      },
      {
        title: '图书推荐次数',
        dataIndex: 'number',
        key: 'number',
        width: 200
      },
      {
        title: '推荐理由',
        dataIndex: 'reason',
        key: 'reason',
        width: 200
      },
      {
        title: '最新推荐时间',
        dataIndex: 'time',
        key: 'time',
        width: 200
      },
      {
        title: '是否收藏',
        dataIndex: 'flagCollect',
        key: 'flagCollect',
        width: 200
      },
      {
        title: '评分',
        dataIndex: 'score',
        key: 'score',
        width: 200
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
        dicCode:'referrer',
        dicName:'推荐人'
      },
      {
        dicCode:'recommendBook',
        dicName:'推荐图书名称'
      },
      {
        dicCode:'number',
        dicName:'图书推荐次数'
      },
      {
        dicCode:'flagCollect',
        dicName:'是否收藏'
      },
      {
        dicCode:'score',
        dicName:'评分'
      }
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
                  this.props.form.getFieldValue('type')==='flagCollect'?
                  <Select placeholder='请选择查询条件'>
                      <Option value='1'>
                        是
                      </Option>
                      <Option value='0'>
                        否
                      </Option>
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
      </div>
    )
  }
}

export default RecommendList
