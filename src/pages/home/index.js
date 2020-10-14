import React, { Component, Fragment } from "react";
import { Descriptions, Badge } from "antd";
import { getUser } from "@api";
import moment from "moment";
import Cookies from "js-cookie";

export class userInfo extends Component {
  constructor() {
    super();
    this.state = {
      userInfos: {},
      visible: false
    };
  }
  async componentDidMount() {
    const userId = Cookies.get('userId')
    const userInfos =await getUser({userId})
    this.setState({
      userInfos:userInfos[0]
    })
  }
  render() {
    let { userInfos } = this.state;
    return (
      <Fragment>
        <Descriptions title="用户信息" layout="vertical" bordered>
          <Descriptions.Item label="账号名称" span={1}>
            {userInfos.userId}
          </Descriptions.Item>
          <Descriptions.Item label="姓名" span={1}>
            {userInfos.userName}
          </Descriptions.Item>
          <Descriptions.Item label="年龄" span={1}>
            {userInfos.age}
          </Descriptions.Item>
          <Descriptions.Item label="年级" span={1}>
            {userInfos.grade}
          </Descriptions.Item>
          <Descriptions.Item label="电话" span={1}>
            {userInfos.call}
          </Descriptions.Item>
          <Descriptions.Item label="是否在线" >YES</Descriptions.Item>
          <Descriptions.Item label="注册时间">
            {moment(Number(userInfos.registerTime)).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="登录时间" span={2}>
          {moment(Number(userInfos.logTime)).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="状态值">
            <Badge status="processing" text="在线中" span={3}/>
          </Descriptions.Item>
        </Descriptions>
      </Fragment>
    );
  }
  handClick() {
    this.setState({
      visible: true
    });
  }
  onOk() {}
  onCancel() {
    this.setState({
      visible: false
    });
  }
}

export default userInfo;
