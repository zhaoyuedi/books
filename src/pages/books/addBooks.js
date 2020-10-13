import React, { Component } from 'react'
import { Table,Form, Input,Row,Col, Select,Icon, Button, message } from 'antd';
import { addBook } from "@api";
const FormItem = Form.Item;
const {Option} = Select

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
    const TypeArr = [
      'IT','农业科学','历史地理','数理科学和化学','文化教育','文学','生物科学','自然科学总论','语言'
    ]
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
          <Select placeholder='请选择图书类型'>
              {
                TypeArr.map(v=>(
                  <Option key={v} value={v}>
                    {v}
                  </Option>
                ))
              }
          </Select>
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
                  <FormItem label={v.label} {...{labelCol:{span:6},wrapperCol:{span:18}}}>
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
