import React, { Component, Fragment } from "react";
import { Form, Icon, Input, Button, message, Select } from "antd";
import { LoginWrapper } from "./styled";
import connect from "./connect";
import Cookies from "js-cookie";
import { getUser, registerHandelr,modificationUserHandler} from "@api";
const {Option} = Select

@connect
@Form.create()
class Login extends Component {
  constructor() {
    super();
    this.state = {
      flag: true
    };
  }
  componentDidMount(){
    // List().then(res=>{
    //   console.log(res)
    // })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(err){
        return
      }
      const data = await getUser({userId:values.userId})
      if(!data.length){
        message.warning('账号不存在请重新输入')
        return
       }else{
         console.log(data)
         if(data[0].password!=values.password){
          message.warning('密码输入错误请重新输入')
          return
         }
       }
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
      console.log(data)
      modificationUserHandler(data[0].id,{
        ...data[0],
        logTime:new Date().getTime()
      }).then(v=>{
        Cookies.set('token',1111)
        Cookies.set('userId',values.userId)
        this.props.history.push("/home")
        message.success("欢迎进入")
      })
    });
  };
  registerHandelr = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(err){
        return
      }
      const data = await getUser({userId:values.userId})
      const codeNumber = await getUser()
      if(data.length){
        message.info("账号重复，请重新填写");
        return
      }
      registerHandelr({...values,code:Number(codeNumber.pop().code)+1,registerTime:new Date().getTime(),alterNum:'0'}).then(v=>{
        message.info("注册成功,请登录");
        this.setState({
          flag: true
        });
      });
     
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const gradeArr = ['研一','研二','研三']
    return (
      <Fragment>
        <LoginWrapper>
          {this.state.flag ? (
            <Form onSubmit={this.handleSubmit} className="login-form">
             <Form.Item label='账号' {...{labelCol:{span:4},wrapperCol:{span:20}}}>
                {getFieldDecorator("userId", {
                  rules: [
                    { required: true,message:"请正确填写账号"},
                    {/* { pattern: /^\w{5,8}$/, message: "请正确填写账号" } */}
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
              <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='密码'>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true,message:"请填写密码" },
                    {/* { pattern: /^\d{5,8}$/, message: "请正确填写密码" } */}
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
            <Form onSubmit={this.registerHandelr} className="login-form" >
            <Form.Item label='账号' {...{labelCol:{span:4},wrapperCol:{span:20}}}>
                {getFieldDecorator("userId", {
                  rules: [
                    { required: true, message:"请输入你的账号"},
                    {/* { pattern: /^\w{5,8}$/, message: "不能少于5位字符" } */}
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>
                    }
                    placeholder="请输入你的账号"
                  />
                )}
              </Form.Item>
              <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='密码'>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true,message:"请输入你的密码" },
                    {/* { pattern: /^\d{5,8}$/, message: "不能少于5位数字" } */}
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="请输入你的密码"
                  />
                )}
              </Form.Item>
              <Form.Item {...{labelCol:{span:4},wrapperCol:{span:20}}} label='姓名'>
                {getFieldDecorator("userName", {
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
