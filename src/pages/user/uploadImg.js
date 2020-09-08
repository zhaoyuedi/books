import React, { Component } from "react";
import { Upload, Icon,message } from "antd";
import connect from './connect';


@connect
class Uploads extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  handleChange = async info => {

      
    console.log(info.file)
    const formData = new FormData();
    formData.append("userId",localStorage.getItem("userId"));
    formData.append("userPic",info.file);
    this.props.handlerPic(formData)
  };

  //阻止默认是上传
  beforeUpload(){
    return false
  }
  render() {
    console.log(this.props);
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { userPic } = this.props;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={this.handleChange}
        beforeUpload={this.beforeUpload.bind(this)}
      >
        {userPic ? (
          <img src={userPic} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default Uploads;
