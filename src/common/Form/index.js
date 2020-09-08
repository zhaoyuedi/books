import React, { Component } from "react";
import { Form, Input, Checkbox, Button  } from "antd";
import Upload from '../Upload';


@Form.create()
class FormData extends Component {
  constructor() {
    super();
    this.state = {
      plainOptions: [
        "悬疑",
        "灵异奇谈",
        "阴间系列",
        "程序员",
        "民俗奇谈",
        "鬼怪",
        "仙侠",
        "脑洞",
        "奇遇",
        "鬼怪仙侠",
        "脑洞奇遇",
        "悬疑恐怖",
        "鬼怪僵尸",
        "恐怖"
      ]
    };
  }
  render() {
    let { booksInfo, form } = this.props;
    let { authorIcon, authorName, name, icon, bookTags } = booksInfo;
    let { getFieldDecorator  } = form;
    return (
      <Form onSubmit={this.handlerSub.bind(this)}>
        <Form.Item label="作者头像">
          {getFieldDecorator("authorIcon", {
            initialValue: authorIcon
          })(<Upload />)}
        </Form.Item>
        <Form.Item label="作者笔名">
          {getFieldDecorator("authorName", {
            initialValue: authorName
          })(<Input />)}
        </Form.Item>
        <Form.Item label="书籍名称">
          {getFieldDecorator("name", {
            initialValue: name
          })(<Input />)}
        </Form.Item>
        <Form.Item label="书籍封面">
          {getFieldDecorator("icon", {
            initialValue: icon
          })(<Upload />)}
        </Form.Item>
        <Form.Item label="分类">
          {getFieldDecorator("bookTags", {
            initialValue: bookTags
          })(<Checkbox.Group options={this.state.plainOptions} />)}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">修改</Button>
        </Form.Item>
      </Form>
    );
  }
  handlerSub(e){
    e.preventDefault();
      this.props.form.validateFields((errors, values)=>{
            if(errors){
                alert("请正确输入")
            }else{
                console.log(values);
            }
      })
  }
}

export default FormData;
