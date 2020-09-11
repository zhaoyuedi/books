import React, { Component } from 'react'
import { BooksList } from "@api";
import { Rate,Tag } from 'antd';
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
        render: text=><img src={`http://img.zhishu.online/${text.key}`} style={{width:70,height:100}}/>,
        width: 120,
        ellipsis: true,
      },
      {
        title: '豆瓣评分',
        dataIndex: 'value',
        key: 'value',
        render: (text,record) => <Rate allowHalf value={record.rating.value/2} disabled/> || '-',
        width: 100,
        ellipsis: true,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text,record) => record.tags.map(v=><Tag color="blue">{v.name}</Tag>) || '-',
        width: 100,
        ellipsis: true,
      }
    ];
  }
  handleTableChange = (page) => {
    console.log(1)
    this.updateTable(page);
  };
  render() {
    const {table} = this.state
    console.log(table)
    return (
      <div>
        <Table
            rowKey={record => record.code}
            columns={this.setColumns()}
            className="menuListTable"
            // loading={loading}
            dataSource={table.dataSource}
            pagination={{
              total: table.count,
              onChange: this.handleTableChange,
            }}
            scrollX={{ x:1420  }}
          />
      </div>
    )
  }
}

export default BooksListWarp
