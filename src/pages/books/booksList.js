import React, { Component, Fragment } from 'react'
import { Table, Divider, Button, Modal, Form, Input, Select, Row, Col } from 'antd';
import { booksListApi } from '@api'
import FormInfo from '@common/Form';



const { Option } = Select;

const Books = {
  page: 1,
  pageSize: 10,
  free: 0,
  group: 1,
  finish: 0,
  sortId: "",
}

@Form.create()
class BooksList extends Component {
  constructor() {
    super()
    this.state = {
      booksList: [],
      columns: [
        {
          title: '作者头像',
          dataIndex: 'authorIcon',
          key: 'authorIcon',
          render: url => <img src={url} alt='' style={{ width: '50px' }} />,
        },
        {
          title: '作者笔名',
          dataIndex: 'authorName',
          key: 'authorName',
        },
        {
          title: '书籍名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '书籍封面',
          key: 'icon',
          dataIndex: 'icon',
          render: url => <img src={url} alt='' style={{ width: '50px' }} />,
        },
        {
          title: '类型',
          key: 'bookTags:',
          dataIndex: 'bookTags',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="primary" size='small' onClick={this.handleChhange.bind(this, record)}>
                修改
      </Button>
              <Divider type="vertical" />
              <Button type="danger" size='small' onClick={this.handleDel.bind(this, record)}>
                删除
        </Button>
            </span>
          ),
        }
      ],
      visible: false,
      booksInfo: {}
    }
  }
  handleDel(record) {
    console.log(record);
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>确实删除《{record.name}》吗？</p>
        </div>
      )
    })
  }
  //修改
  handleChhange(record) {
    this.setState({
      visible: true,
      booksInfo: record
    })

  }
  handFalse() {
    this.setState({
      visible: false,
    })

  }
  render() {
    let { booksList, columns, booksInfo } = this.state;
    return (
      <Fragment>
        <Row gutter={24} align={'middle'}>
          <Col span={4} offset={0}>
            <Select defaultValue="价格" style={{ width: 120 }} onChange={this.handleChangeMoney.bind(this)}>
              <Option value='0'>全部</Option>
              <Option value="1">免费</Option>
              <Option value="2">
                付费
            </Option>
            </Select>
          </Col>


          <Col span={4} offset={3}>
            <Select defaultValue="频道" style={{ width: 120 }} onChange={this.handleChangePd.bind(this)}>
              <Option value='1'>男频</Option>
              <Option value="2">女频</Option>
              <Option value="3">
                出版
          </Option>
            </Select>
          </Col>


          <Col span={4} offset={3}>
            <Select defaultValue="书籍状态" style={{ width: 120 }} onChange={this.handleChangeSj.bind(this)}>
              <Option value='0'>全部</Option>
              <Option value="1">完结</Option>
              <Option value="2">
                连载
            </Option>
            </Select>
          </Col>


          <Select defaultValue="分类" style={{ width: 120 }} onChange={this.handleChangeFl.bind(this)}>
            <Option value=''>全部</Option>
            <Option value='1000010'>现在都市</Option>
            <Option value="1000012">仙侠武侠</Option>
            <Option value="1000011">
              奇幻修真
            </Option>
            <Option value='1000013'>科幻游戏</Option>
            <Option value="1000014">悬疑推理</Option>
            <Option value="1000015">
              军事战争
            </Option>
          </Select>
        </Row>
        <Table columns={columns}
          dataSource={booksList}
          rowKey={record => record.id}
          pagination={
            {
              pageSize: 10,
              total: 1000,
              onChange: this.clickPage.bind(this)
            }
          }
        />
        <Modal
          title="修改书籍信息"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handFalse.bind(this)}
        >
          <FormInfo booksInfo={booksInfo} />
        </Modal>
      </Fragment>
    )
  }

  handleChangeMoney(val) {
    Books.free = val
    console.log(val);
    this.AsyncBooks()
  }
  handleChangePd(val) {
    Books.group = val
    this.AsyncBooks()
  }
  handleChangeSj(val) {
    Books.finish = val
    this.AsyncBooks()
  }
  handleChangeFl(val) {
    Books.sortId = val
    this.AsyncBooks()
  }

  componentDidMount() {
    this.AsyncBooks()
  }

  //分页
  clickPage(page) {
    Books.page = page;
    this.AsyncBooks()
  }



  //异步请求数据
  async AsyncBooks() {
    let { page, pageSize, free, group, finish, sortId } = Books;
    let data = await booksListApi(page, pageSize, free, group, finish, sortId);
    this.setState({
      booksList: data.data.bookList
    })
  }


}

export default BooksList
