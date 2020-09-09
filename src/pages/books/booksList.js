// import React, { Component, Fragment } from 'react'
// import { Table, Divider, Button, Modal, Form, Input, Select, Row, Col } from 'antd';
// import { booksListApi } from '@api'
// import FormInfo from '@common/Form';

import React, { Component } from 'react'
import { BooksList } from "@api";
import Table from '@components/Table';


class BooksListWarp extends Component {
  constructor(){
    super()
    this.state = {
      table:{}
    }
  }
  componentDidMount(){
    this.updateTable(1)
  }
  updateTable(page=1){
    let params = {
      page,
      seq:35,
      type:'W',
      year:2020
    }
    BooksList(params).then(res=>{
      let dataSource = res.results.map(v=>(
        {...v.douban_book,...v.douban_book.info}
      ))
        this.setState({
          table:{
            count:res.count,
            dataSource
          }
        })
    })
  }
  setColumns = ()=>{
    return [
      {
        title: '书名',
        dataIndex: 'title',
        key: 'title',
        width: 150,
        ellipsis: true,
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        width: 100,
        render:text=>text.join(','),
        ellipsis: true,
      },
      {
        title: '图片',
        dataIndex: 'img_info',
        key: 'img_info',
        render: text=><img src={`http://img.zhishu.online/${text.key}`} style={{width:100,height:100}}/>,
        width: 120,
        ellipsis: true,
      },
      {
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        render: text => text || '-',
        width: 80,
        ellipsis: true,
      },
      {
        title: '菜单类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        ellipsis: true,
      },
      {
        title: '菜单编码',
        dataIndex: 'code',
        key: 'code',
        width: 120,
        ellipsis: true,
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        width: 150,
        ellipsis: true,
      },
      {
        title: '排序号',
        dataIndex: 'sort',
        key: 'sort',
        render: text => text || '-',
        width: 100,
        ellipsis: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        ellipsis: true,
      },
      {
        title: '',
        dataIndex: 'null',
        key: 'null',
        ellipsis: true,
    },
    ];
  }
  render() {
    const {table} = this.state
    return (
      <div>
        <Table
            rowKey={record => record.code}
            columns={this.setColumns()}
            className="menuListTable"
            // loading={loading}
            dataSource={table.dataSource}
            pagination={{
              current: table.current
            }}
            scrollX={{ x:1520  }}
          />
      </div>
    )
  }
}

export default BooksListWarp
