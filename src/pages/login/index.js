import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { LoginWrapper } from "./styled";
import connect from "./connect";

@connect
@Form.create()
class Login extends Component {
  constructor() {
    super();
    this.state = {
      flag: true
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log(111)
      // if (!err) {
      //   let data = await this.props.loginHandler(values);
      //   console.log(data);
      //   if (data.data.code === 1) {
      //     message.info(`${data.data.info.msg}`);
      //     this.props.history.push("/home");
      //   } else if (data.data.code === 0) {
      //     message.info(`${data.data.info.msg}`);
      //   } else if (data.data.code === 2) {
      //     message.info(`${data.data.info.msg}`);
      //   }
      // }
      this.props.history.push("/home")
    });
  };
  registerHandelr = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let flag = await this.props.registerHandelr(values);
        if (flag) {
          message.info("注册成功,请登录");
          this.setState({
            flag: true
          });
        } else {
          message.info("账号重复");
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <LoginWrapper>
          {this.state.flag ? (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                    placeholder="账号名称"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
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
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  className="login-form-button"
                  style={{ marginLeft: "45px" }}
                  onClick={this.handler.bind(this)}
                >
                  立即注册
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form onSubmit={this.registerHandelr} className="login-form">
              <Form.Item>
                {getFieldDecorator("userId", {
                  rules: [
                    { required: true },
                    { pattern: /^\w{5,8}$/, message: "不能少于5位字符" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="账号名称"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true },
                    { pattern: /^\d{5,8}$/, message: "不能少于5位数字" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  注册
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  className="login-form-button"
                  style={{ marginLeft: "45px" }}
                  onClick={this.handler.bind(this)}
                >
                  已有账号
                </Button>
              </Form.Item>
            </Form>
          )}
        </LoginWrapper>
      </Fragment>
    );
  }
  handler() {
    let flag = !this.state.flag;
    this.setState({
      flag: flag
    });
  }
}

export default Login;
