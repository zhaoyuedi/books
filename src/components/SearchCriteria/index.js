import React, { Component } from 'react';
import { Form, Icon, Row, Col,Button } from 'antd';
import { warpSearch } from "./styled";

const FormItem = Form.Item;
@Form.create()
class SearchCriteria extends Component {
  constructor() {
    super();
    this.state = {
      flag: false
    };
  }
  handleSearchEvent = () => {
    this.props.onSubmit&&this.props.onSubmit(this.props.form);
  };
  handleResetForm = () => {
    const {clearSearchValues,form:{resetFields}}=this.props
    if(clearSearchValues){
      clearSearchValues().then(()=>{
        resetFields();
      });
    }else{
      resetFields();
    }

  };
  handlerunFold = () => {
    const {controlOut,outFlag,controlFun}=this.props
    if(controlOut && controlFun){
      controlFun(outFlag)
    }else{
      let temp = !this.state.flag;
      this.setState({
        flag: temp,
      });
    }
  };
  formItemLayout = (item)=>{
    let {vertical} = this.props
    if(vertical){
      return 
    }
    return item.formItemLayout?{...item.formItemLayout}:{labelCol:{span:8},wrapperCol:{span:16}}
  }
  render() {
    let {
      formItems,
      formItems:{searchList},
      form: { getFieldDecorator },
      show="40px",
      style,
      btnproperties,
      vertical=false,
      controlOut=false,
      outFlag,
      isUnfold
    } = this.props;
    
    let { flag } = this.state;
    flag=controlOut?outFlag:flag
    let lenMThree=isUnfold===false?false:searchList && searchList.length>3?true:false;
    let direction=flag&&lenMThree?'direction-column':''
    let viewStatus=btnproperties&&btnproperties.includes('view')
    return (
      <warpSearch>
        {formItems&&searchList?(
          <div className={`trgeniusrWarp ${direction}`} style={{height:show}}>
            <div
              style={{ height: flag ? '1000px' : show,overflow:'hidden'}}
              className={`trgeniusr ${direction}`}
            >
              <Form labelAlign={vertical?'left':'right'}>
                <Row>
                  {searchList.map(item => (
                    <Col span={item.ColSpan?item.ColSpan:8} key={item.value}>
                      <FormItem label={item.label} {...this.formItemLayout(item)} layout={vertical?'vertical':'horizontal'}>
                        {getFieldDecorator(
                          item.value,
                          {
                            ...item.options,
                          }                    
                        )(item.formItem)}
                      </FormItem>
                    </Col>
                  ))}
                </Row>
              </Form>
            </div>
            <div className='searchDiv' style={{height:32}}>
            {  viewStatus&&<Button
                  //shape="round"
                  onClick={this.handleResetForm}
                  className="search-btn"
                  >
                  {'重置'}
                </Button>}
             {  viewStatus&& <Button
                  type="primary"
                  //shape="round"
                  className="search-btn"
                  onClick={this.handleSearchEvent}
                  >
                  {'搜索'}
                </Button>}
                <div onClick={this.handlerunFold.bind(this)} className='title'>
                  {
                    lenMThree?<div className="uxpandText">
                    <span style={{fontSize:12}}>{!flag?'展开':'收起'}</span>
                    <Icon style={{fontSize:8,paddingLeft:6}} type={!flag?"down":'up'}/>
                    </div>:''
                  }
                  
                  
                </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {/* <div className="search-line"></div> */}
      </warpSearch>
    );
  }
}

export default SearchCriteria;
