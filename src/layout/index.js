import React, { Component, Fragment } from "react";
import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Row,
  Col,
  Modal,
  Form,
  Input,
  message,
  Avatar
} from "antd";
import { layoutRoute } from "@router";
import TabBar from "@utils/TabBar";
import { withRouter } from "react-router-dom";
import cookie from "js-cookie";
import connect from "./connect";
import { UpdatePassword } from "@api";

const { Header, Content, Footer, Sider } = Layout;

@withRouter
@connect
@Form.create()
class LayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleNmae: false,
      val: ''
    };
  }
  render() {
    let { form, onCancel, onCreate } = this.props;
    const { getFieldDecorator } = form;
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1">
          <Icon type="user" />
          个人信息
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          修改密码
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          修改昵称
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Fragment>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" onClick={this.handler.bind(this)}>
              {TabBar(layoutRoute)}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Row >
                <Col offset={17} span={7}>
                  <div
                    id="components-dropdown-demo-dropdown-button"
                    style={{ display: "flex" }}
                  >
                    <div style={{ marginRight: "10px", color: "#001529" }}>
                      你好,{this.props.userName}
                    </div>
                    <div style={{ marginRight: "120px" }}>  <Avatar src={this.props.userPic} /></div>
                    <Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
                      个人中心
                    </Dropdown.Button>

                  </div>
                </Col>
              </Row>
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                style={{ padding: 24, background: "#fff", textAlign: "center" }}
              >
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>

        <Modal
          visible={this.state.visible}
          title="修改密码"
          onCancel={this.onCancel.bind(this)}
          onOk={this.onOk.bind(this)}
          okText={"确定修改"}
          cancelText={"取消"}
        >
          <Form layout="vertical">
            <Form.Item>
              {getFieldDecorator("userId", {
                rules: [
                  { required: true },
                  { pattern: /^\w{5,8}$/, message: "请正确填写账号" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="你的账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("newpassword", {
                rules: [
                  { required: true },
                  { pattern: /^\d{5,8}$/, message: "请正确填写密码" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="新密码"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={this.state.visibleNmae}
          title="修改昵称"
          onCancel={this.Cancel.bind(this)}
          onOk={this.Oks.bind(this)}
          okText={"确定修改"}
          cancelText={"取消"}
        >
          <Input placeholder="昵称" onChange={this.Inputhandler.bind(this)} />
        </Modal>
      </Fragment>
    );
  }
  handler({ key }) {
    this.props.history.push(`${key}`);
  }
  Inputhandler(e) {
    this.setState({
      val: e.target.value
    })
  }
  handleMenuClick(e) {
    if (e.key === "3") {
      cookie.remove("token");
    } else if (e.key === "2") {
      this.setState({
        visible: true
      });
    } else if (e.key === "1") {
      this.props.history.push("/user/userinfo");
    } else if (e.key === '4') {
      this.setState({
        visibleNmae: true
      })
    }
  }
  onCancel() {
    this.setState({
      visible: false
    });
  }
  Cancel() {
    this.setState({
      visibleNmae: false
    });
  }
  onOk() {
    this.props.form.validateFields(async (err, val) => {
      if (!err) {
        let { userId, newpassword } = val;
        let data = await UpdatePassword(userId, newpassword);
        message.info("修改成功");
        this.setState({
          visible: false
        });
      }
    });
  }
  async Oks() {
    let { val } = this.state
    let data = await this.props.handlerName(val)
    if (true) {
      message.info("修改成功");
      this.setState({
        visibleNmae: false
      })
    }else{
      message.error("修改失败");
    }
  }
}

export default LayoutComponent;
