import React, { Component } from "react";
import { Upload, Icon } from "antd";

export class Uploads extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  handleChange = info => {

        //发送ajax
      console.log(info.file);
      this.props.onChange(info.file)
  };
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

    const { imageUrl } = this.state;
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
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default Uploads;
