import React, { Component } from 'react'
import { Table,Form, Input,Row,Col, Select,Icon, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { BooksList,modificationHandler } from "@api";
const FormItem = Form.Item;
const {Option} = Select

@withRouter
@Form.create()
class Detail extends Component {
    constructor(){
        super()
        this.state = {
            formData:{}
        }
    }
 async componentDidMount(){
    const data = await BooksList(this.props.match.params)
    this.setState({
        formData:data[0]
    })
    console.log(data)
  }
  onSubmit = ()=>{
    this.props.form.validateFields(async(err,value)=>{
      if(err){
        return
      }
      modificationHandler(this.props.match.params.id,value).then(()=>{
        message.success('修改成功')
      })
    })
  }
  setConfigItems = ()=>{
      const {formData} = this.state
      const TypeArr = [
        'IT','农业科学','历史地理','数理科学和化学','文化教育','文学','生物科学','自然科学总论','语言'
      ]
    return [
      {
        label:"图书编号",
        value:"code",
        options:{
          initialValue:formData.code,
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
          initialValue:formData.bookName,
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
          initialValue:formData.author,
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
          initialValue:formData.price,
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
          initialValue:formData.type,
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
          initialValue:formData.press,
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
          initialValue:formData.amount,
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
          initialValue:formData.describe,
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

export default Detail
