import E from "wangeditor"; // 引用
import React, { Component } from "react";
import {UpdateUserPic} from '@api';

class AddBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    const elem = this.refs.editorElem; //获取editorElem盒子
    const submit = this.refs.submit; //获取提交按钮
    this.editor = new E(elem); //new 一个 editorElem富文本


    this.editor.customConfig.uploadFileName = "userPic"; //置上传接口的文本流字段

    this.editor.customConfig.uploadImgServer = "http://localhost:3000/api/users/updateUserPic"; //服务器接口地址

    this.editor.customConfig.uploadImgParams = { //而外的数据
        userId: '584521'
    }

    //   this.editor.txt.text("请编写小说内容"); //设置富文本默认内容


      this.editor.create(); //创建

      this.editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        var url = result.data.urlPic; //监听图片上传成功更新页面
        insertImg(url);
      }
    };
  }
  handSubmit(e) {
    console.log(this.editor.txt.text());
    this.setState({
      content: this.editor.txt.text()
    });
  }
  render() {
    return (
      <div>
        <h2>富文本编辑器</h2>
        <div ref="editorElem"></div>
        <div ref="submit" onClick={this.handSubmit.bind(this)}>
          提交
        </div>
      </div>
    );
  }
}
export default AddBooks;
