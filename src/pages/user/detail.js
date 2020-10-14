import React, { Component } from 'react'
import { Table,Form, Input,Row,Col, Select,Icon, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { getUser,modificationUserHandler,registerHandelr } from "@api";
const FormItem = Form.Item;
const {Option} = Select

@withRouter
@Form.create()
class UserDetail extends Component {
    constructor(){
        super()
        this.state = {
            formData:{}
        }
    }
 async componentDidMount(){
    if(this.props.match.params.id){
        const data = await getUser(this.props.match.params)
        this.setState({
            formData:data[0]
        })
    }
  }
  onSubmit = ()=>{
    if(this.props.match.params.id){
        this.props.form.validateFields(async(err,value)=>{
            if(err){
              return
            }
            modificationUserHandler(this.props.match.params.id,value).then(()=>{
              message.success('修改成功')
            })
        })
        return
    }
    this.props.form.validateFields(async(err,value)=>{
        if(err){
          return
        }
        registerHandelr(value).then(()=>{
          message.success('添加成功')
        })
    })
  }
  setConfigItems = ()=>{
    const {formData} = this.state
    const TypeArr = ['研一','研二','研三']
    return [
      {
        label:"用户编号",
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
          <Input placeholder='用户编码自动生成不可修改' disabled></Input>
        )
      },
      {
        label:"用户账号",
        value:"userId",
        options:{
          initialValue:formData.userId,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写用户账号'></Input>
        )
      },
      {
        label:"用户密码",
        value:"password",
        options:{
          initialValue:formData.password,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input.Password  placeholder='请填写用户密码'></Input.Password>
        )
      },
      {
        label:"用户电话",
        value:"call",
        options:{
          initialValue:formData.call,
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
          <Input placeholder='请填写用户电话'></Input>
        )
      },
      {
        label:"用户年龄",
        value:"age",
        options:{
          initialValue:formData.age,
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
            <Input placeholder='请填写用户年龄'></Input>
          )
      },
      {
        label:"年级",
        value:"grade",
        options:{
          initialValue:formData.grade,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
            <Select placeholder='请选择年级'>
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
        label:"用户修改次数",
        value:"alterNum",
        options:{
          initialValue:formData.alterNum,
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
          <Input placeholder='请填写用户修改次数'></Input>
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

export default UserDetail
