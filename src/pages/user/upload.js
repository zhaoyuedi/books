import React, { Component } from "react";
import { Upload, Button, Icon, message } from "antd";
import { modifyUserPicApi } from "@api";

export class UploadImg extends Component {
  state = {
    fileList: [],
    uploading: false
  };

  async handleUpload() {
    const { fileList } = this.state;
    console.log(fileList);
    const formData = new FormData();
    formData.append("userId",localStorage.getItem("userId"));
    formData.append("userPic", fileList[0]);
    this.setState({
      uploading: true
    });
    let data = await modifyUserPicApi(formData);
    console.log(data);
    if (data.data.info === "修改成功") {
      this.setState({
        uploading: false,
        fileList: []
      });
      message.info(`${data.data.info}`);
    }
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload.bind(this)}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </div>
    );
  }
}

export default UploadImg;
