import React, { Component } from 'react'
import { Table,Form, Input,Row,Col, Select,Icon, Button, message } from 'antd';
import { addBook } from "@api";
const FormItem = Form.Item;

@Form.create()
class AddBooks extends Component {
  onSubmit = ()=>{
    this.props.form.validateFields(async(err,value)=>{
      if(err){
        return
      }
      addBook(value).then(()=>{
        message.success('添加成功')
      })
    })
  }
  setConfigItems = ()=>{
    return [
      {
        label:"图书编码",
        value:"code",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书编码'></Input>
        )
      },
      {
        label:"图书名称",
        value:"bookName",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书名称'></Input>
        )
      },
      {
        label:"图书作者",
        value:"author",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书作者'></Input>
        )
      },
      {
        label:"图书价格",
        value:"price",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
            {
              pattern:/^[0-9]+([.]*[0-9]+){0,1}$/,
              message: '请正确填写',
            }
          ],
        },
        formItem:(
          <Input placeholder='请填写图书价格'></Input>
        )
      },
      {
        label:"图书类型",
        value:"type",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书类型'></Input>
        )
      },
      {
        label:"图书出版社",
        value:"press",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书出版社'></Input>
        )
      },
      {
        label:"图书总数",
        value:"amount",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
            {
              pattern:/^[0-9]+([0-9]+){0,1}$/,
              message: '请正确填写',
            }
          ],
        },
        formItem:(
          <Input placeholder='请填写图书总数'></Input>
        )
      },
      {
        label:"图书描述",
        value:"describe",
        options:{
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书描述'></Input>
        )
      }
    ]
  }
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Form>
          <Row>
            {
              this.setConfigItems().map(v=>(
                <Col span={8} key={v.value}>
                  <FormItem label={v.label} {...{labelCol:{span:4},wrapperCol:{span:20}}}>
                    {
                      getFieldDecorator(
                        v.value,
                        v.options
                      )(v.formItem)
                    }
                  </FormItem>
                </Col>
              ))
            }
          </Row>
        </Form>
        <Button  type="primary" onClick={this.onSubmit}>
            提交
        </Button>
      </div>
    )
  }
}

export default AddBooks
