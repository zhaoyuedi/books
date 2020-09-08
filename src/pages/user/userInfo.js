import React, { Component, Fragment } from "react";
import { Descriptions, Badge, Button, Row, Col, Modal } from "antd";
import { userList } from "@api";
import moment from "moment";
import UploadImg from "./upload";
import Upload from "./uploadImg";

export class userInfo extends Component {
  constructor() {
    super();
    this.state = {
      userInfos: [],
      visible: false
    };
  }
  async componentDidMount() {
    let data = await userList();
    let arr = data.data.list;
    let userId = localStorage.getItem("userId");
    let userInfos = arr.filter(item => {
      return item.userId === userId;
    });
    console.log(userInfos);
    this.setState({
      userInfos: userInfos[0]
    });
  }
  render() {
    let { userInfos, visible } = this.state;
    return (
      <Fragment>
        <Descriptions title="用户信息" layout="vertical" bordered>
          <Descriptions.Item label="用户头像" span={3}>
            <Upload />
            {/*  <Row>
                <Col offset={7}>
                    <img src={userInfos.userPic} alt="" style={{ display: 'block' }} />
                </Col>
            </Row>
            <Row>
                <Col offset={12}>
                    <Button type="primary" icon="download" onClick={this.handClick.bind(this)}>
                        修改头像
                    </Button>
                </Col>
            </Row> */}
          </Descriptions.Item>
          <Descriptions.Item label="账号名称" span={1}>
            {userInfos.userId}
          </Descriptions.Item>
          <Descriptions.Item label="昵称" span={1}>
            {userInfos.username}
          </Descriptions.Item>
          <Descriptions.Item label="是否在线" >YES</Descriptions.Item>
          <Descriptions.Item label="注册时间">
            {moment(userInfos.registerTime).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="上次登录时间" span={2}>
            2019-10-10 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="状态值">
            <Badge status="processing" text="在线中" span={3}/>
          </Descriptions.Item>
        </Descriptions>
        {/*  <Modal
                onOk={this.onOk.bind(this)}
                onCancel={this.onCancel.bind(this)}
                title="上传头像"
                footer={null}
                visible={visible}
            >
                <UploadImg/>
            </Modal> */}
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
