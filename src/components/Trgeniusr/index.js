import React, { Component } from "react";
import { Form, Icon, Button, Row, Col, Checkbox } from "antd";
import { LoginWrapper, Wrap } from "./styled";

const FormItem = Form.Item;

@Form.create()
class Trgeniusr extends Component {
  constructor() {
    super();
    this.state={
        flag:false
    }
  }
  handleSearchEvent=()=>{
    this.props.onSubmit(this.props.form);
  };
  handleResetForm=()=>{
    this.props.form.resetFields();
  };
  handlerunFold=()=>{
      let temp = !this.state.flag
      this.setState({
          flag:temp
      })
  }
  render() {
    let {
      formItems,
      form: { getFieldDecorator }
    } = this.props;
    let {flag} = this.state
    return (
      <div>
        {formItems.topTrgeniusr ? (
          <LoginWrapper>
            <div  style={{maxHeight:flag?'700px':'200px'}}>
            {formItems.topTrgeniusr.map(item => (
                <FormItem
                  label={item.label}
                  key={item.value}
                >
                  {getFieldDecorator(item.value, item.options)(item.formItem)}
                </FormItem>
              ))}
            </div>
          </LoginWrapper>
        ) : (
          ""
        )}
        <Wrap>
          {formItems.checkBoxList ? (
            <div className="checkBox">
              {formItems.checkBoxList.map(item => (
                <FormItem
                  label={item.label}
                  key={item.value}
                >
                  {getFieldDecorator(item.value, item.options)(item.formItem)}
                </FormItem>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="btn">
            <Button
              type="primary"
              onClick={this.handleSearchEvent}
              className="btn-search"
            >
              查询
            </Button>
            <Button onClick={this.handleResetForm}>重置</Button>
            <div onClick={this.handlerunFold.bind(this)}>
              <span>展开</span>
              <Icon type="down" />
            </div>
          </div>
        </Wrap>
      </div>
    );
  }
}

export default Trgeniusr;
//className={flag?"unfold":'not-already'}