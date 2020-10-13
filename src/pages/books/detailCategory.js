import React, { Component } from 'react'
import { Form, Input,Row,Col, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { getCategory,modificationCategoryHandler,addCategory } from "@api";
const FormItem = Form.Item;

@withRouter
@Form.create()
class DetailCategory extends Component {
    constructor(){
        super()
        this.state = {
            formData:{}
        }
    }
 async componentDidMount(){
    if(this.props.match.params.id){
        const data = await getCategory(this.props.match.params)
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
            modificationCategoryHandler(this.props.match.params.id,value).then(()=>{
              message.success('修改成功')
            })
        })
        return
    }
    this.props.form.validateFields(async(err,value)=>{
        if(err){
          return
        }
        addCategory(value).then(()=>{
          message.success('添加成功')
        })
    })
  }
  setConfigItems = ()=>{
    const {formData} = this.state
    return [
      {
        label:"图书类别编码",
        value:"typeNumber",
        options:{
          initialValue:formData.typeNumber,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书类别编码'></Input>
        )
      },
      {
        label:"图书类别名称",
        value:"typeName",
        options:{
          initialValue:formData.typeName,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书类别名称'></Input>
        )
      },
      {
        label:"图书类别标识",
        value:"signboard",
        options:{
          initialValue:formData.signboard,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书类别标识'></Input>
        )
      },
      {
        label:"图书类别扩展",
        value:"typeExtend",
        options:{
          initialValue:formData.typeExtend,
          rules: [
            {
              required: true,
              message: '请填写',
            },
          ],
        },
        formItem:(
          <Input placeholder='请填写图书类别扩展'></Input>
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

export default DetailCategory
