import React, { Component } from "react";
import SearchCriteria from "../../components/SearchCriteria";
import { Input, Select, DatePicker ,Checkbox} from "antd";

const { Option } = Select;
class index extends Component {
  renderTrgeniusrFormItem() {
    return {
      topTrgeniusr: [
        {
          label: "项目编号",
          value: "projectNumber",
          formItem: <Input placeholder="请输入项目编号" />
        },
        {
          label: "主项目编号",
          value: "mainProjectNumber",
          formItem: <Input placeholder="请输入主项目编号" />
        },
        {
          label: "版本号",
          value: "versionNumber",
          formItem: <Input placeholder="请填写版本号" />
        },
        {
          label: "项目名称",
          value: "versionNumber",
          formItem: <Input placeholder="请填写项目名称" />
        },
        {
          label: "零级项目",
          value: "zeroOrderProject",
          formItem: (
            <Select placeholder="是否为零级项目" allowClear={true} style={{ width: '100%' }}>
              <Option value="true">是</Option>
              <Option value="false">否</Option>
            </Select>
          )
        },
        {
          label: "项目负责人",
          value: "projectLeader",
          formItem: <Input placeholder="请填写项目负责人" />
        },
        {
          label: "项目标签",
          value: "ProjectLabel",
          formItem: (
            <Select placeholder="请选择项目标签" allowClear={true} style={{ width: '100%' }}>
              <Option value="true">运营类</Option>
              <Option value="false">外包类</Option>
            </Select>
          )
        },
        {
          label: "项目结束时间",
          value: "projectStartTime",
          formItem: <DatePicker placeholder="请选择项目开始时间" style={{ width: '100%' }}/>
        },
        {
          label: "项目结束时间",
          value: "projectEndTime",
          formItem: <DatePicker placeholder="请选择项目结束时间" style={{ width: '100%' }}/>
        },
        {
          label: "项目状态",
          value: "projectStatus",
          formItem: (
            <Select placeholder="请选择项目状态" allowClear={true} style={{ width: '100%' }}>
              <Option value="true">执行者</Option>
              <Option value="false">已完毕</Option>
            </Select>
          )
        },
        {
          label: "原币",
          value: "originalCurrency",
          formItem: (
            <Select placeholder="请选择原币" allowClear={true} style={{ width: '100%' }}>
              <Option value="true">美元</Option>
              <Option value="false">人民币</Option>
            </Select>
          )
        },
        {
          label: "项目金额(原币)",
          value: "amountCurrency",
          formItem: <Input placeholder="请填写项目金额(原币)" />
        },
        {
          label: "项目金额(CNY)",
          value: "amountCny",
          formItem: <Input placeholder="请填写项目金额(CNY)" />
        }
      ],
      checkBoxList:[
       {
          label:"项目范围",
          value:"projectScope",
          formItem:<Checkbox.Group options={["包含下级所有子选项"]} /> 
       },
       {
         label:"流程状态",
         value:"processState",
         formItem:<Checkbox.Group options={["进行中","已结束"]} />
       }
      ]
    };
  }
  handleTableSearchEvent(form){
    let data ={}
    form.validateFields((err, value) => {
      console.log(value);
      data={...value}
      console.log(data);
    })
  }
  render() {
    return <div>
      <SearchCriteria  
      formItems={this.renderTrgeniusrFormItem()}
      onSubmit={this.handleTableSearchEvent}
      />
    </div>;
  }
}

export default index;
