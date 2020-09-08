import React, { Component } from "react";
import { userList } from "@api";
import { Table, Switch } from "antd";
import momentTime from 'moment';

export class UserList extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: "用户账号",
          dataIndex: "userId",
          key: "userId"
        },
        {
          title: "用户名称",
          dataIndex: "username",
          key: "username"
        },
        {
          title: "用户头像",
          dataIndex: "userPic",
          key: "userPic",
          render: url => <img src={url} alt="" style={{width:'80px',height:'80px'}}/>
        },
        {
          title: "注册时间",
          dataIndex: "registerTime",
          key: "registerTime",
          defaultSortOrder: (a, b) => b.registerTime - a.registerTime,
          render:(registerTime)=><p>{momentTime(registerTime).format('YYYY-MM-DD')}</p>,
          sorter: (a, b) => a.registerTime - b.registerTime
        },
        {
          title: "用户状态",
          dataIndex: "status",
          key: "status",
          render: (status) => <Switch defaultChecked={status} onChange={this.handler.bind(this)}/>
        }
      ],
      data: [],
      id:''
    };
  }
  async componentDidMount() {
    let data = await userList();
    console.log(data);
    this.setState({
      data: data.data.list
    });
  }
  render() {
    let { data, columns } = this.state;
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record._id}
        onRow={record => {
            return {
              onClick:this.handClick.bind(this,record), // 点击行
            };
          }}
      />
    );
  }
  handClick(record){
      this.setState({
          id:record.userId
      })
  }

  handler(value,e){
    setTimeout(()=>{
        console.log(this.state.id);
    },0.0001)
  }
}

export default UserList;
