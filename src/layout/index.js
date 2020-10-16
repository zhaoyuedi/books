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
  Avatar,
  Select
} from "antd";
import { layoutRouteAdministrator,layoutRoute } from "@router";
import TabBar from "@utils/TabBar";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import connect from "./connect";
import { UpdatePassword,getUser,modificationUserHandler } from "@api";
import userInfo from "../pages/home";

const { Header, Content, Footer, Sider } = Layout;
const {Option} = Select

@withRouter
@connect
@Form.create()
class LayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleNmae: false,
      val: '',
      userInfo:{}
    };
  }
 async componentDidMount(){
    const userId = Cookies.get('userId')
    const userInfos =await getUser({userId})
    this.setState({
      userInfo:userInfos[0],
    })
  }
  render() {
    let { form } = this.props;
    const {userInfo} = this.state
    const { getFieldDecorator } = form;
    const gradeArr = ['研一','研二','研三']
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1">
          <Icon type="user" />
          个人信息
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          修改信息
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
              {TabBar(layoutRouteAdministrator,layoutRoute,userInfo)}
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
                      你好,{this.state.userInfo.userName}
                    </div>
                    <div style={{ marginRight: "120px" }}>  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
                   {userInfo.Administrator==='1'?<Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
                      个人中心
                    </Dropdown.Button>:''}

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
              马含茹的图书管理系统
            </Footer>
          </Layout>
        </Layout>

        <Modal
          visible={this.state.visible}
          title="修改信息"
          onCancel={this.onCancel.bind(this)}
          onOk={this.onOk.bind(this)}
          okText={"确定修改"}
          cancelText={"取消"}
        >
          <Form >
            <Form.Item label='账号' {...{labelCol:{span:4},wrapperCol:{span:20}}}>
              {getFieldDecorator("userId", {
                initialValue:userInfo.userId,
                rules: [
                  { required: true,message:"请填写" }
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
            <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='密码'>
              {getFieldDecorator("password", {
                initialValue:userInfo.password,
                rules: [
                  { required: true,message:"请填写" },
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='姓名'>
                {getFieldDecorator("userName", {
                  initialValue:userInfo.userName,
                  rules: [
                    { required: true,message:"请输入你的姓名" },
                    {/* { pattern: /^\d{5,8}$/, message: "不能少于5位数字" } */}
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入你的姓名"
                  />
                )}
              </Form.Item>
              <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='年龄'>
                {getFieldDecorator("age", {
                  initialValue:userInfo.age,
                  rules: [
                    { required: true,message:"请输入你的年龄" },
                    {/* { pattern: /^\d{5,8}$/, message: "不能少于5位数字" } */}
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入你的年龄"
                  />
                )}
              </Form.Item>
              <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='年级'>
                {getFieldDecorator("grade", {
                  initialValue:userInfo.grade,
                  rules: [
                    { required: true,message:"请选择你的所在年级" },
                  ]
                })(
                  <Select placeholder='请选择年级'>
                    {
                      gradeArr.map(v=>(
                        <Option value={v}>
                          {v}
                        </Option>
                      ))
                    }
                  </Select>
                )}
              </Form.Item>
              <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='电话'>
                {getFieldDecorator("call", {
                  initialValue:userInfo.call,
                  rules: [
                    { required: true,message:"请输入你的电话" },
                    { pattern: /^[0-9]+([0-9]+)+$/, message: "请正确输入" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入你的电话"
                  />
                )}
              </Form.Item>
          </Form>
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
 async handleMenuClick(e) {
    if (e.key === "3") {
      Cookies.remove("token");
      this.props.history.push('/login')
    } else if (e.key === "2") {
      this.setState({
        visible: true
      });
    } else if (e.key === "1") {
      this.props.history.push("/user/userinfo");
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
        if(err){
          return
        }
        const  {userInfo} = this.state
        modificationUserHandler(userInfo.id,{...userInfo,...val}).then(v=>{
          message.info("修改成功,请重新登录");
          Cookies.remove("token");
          this.props.history.push('/login')
        });
    });
  }
}

export default LayoutComponent;
