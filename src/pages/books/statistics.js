import React, { Component } from 'react'
import { BooksList } from "@api";
import { Table} from 'antd';

class Statistics extends Component {
    constructor(){
        super()
        this.state = {
            TypeArr: [
                'IT','农业科学','历史地理','数理科学和化学','文化教育','文学','生物科学','自然科学总论','语言'
            ],
            table:{},
            loading:true
        }
    }
   async componentDidMount(){
        this.updateTable()
    }
    updateTable=async (_page=1,_limit=5)=>{
        this.setState({
            loading:true
        })
        const {TypeArr} = this.state
        // const params = {
        //     _page,
        //     _limit
        //   }
        const data = await BooksList()
        let dataSource = TypeArr.map(v=>({
            type:v,
            sum:data.filter(d=>d.type===v).length
        }))
        this.setState({
            table:{
                dataSource,
                count:TypeArr.length,
                current:_page
            },
            loading:false
        })
      }
      handleTableChange = (page, pageSize) => {
        this.updateTable(page);
      };
    setColumns = () =>{
        return [
            {
                title: '图书类型',
                dataIndex: 'type',
                key: 'type',
                width: 200,
            },
            {
                title: '出现次数',
                dataIndex: 'sum',
                key: 'sum',
                width: 200,
            }
        ]
    }
    render() {
        const {table,loading} = this.state
        return (
            <div>
                 <Table
                    rowKey={record => record.type}
                    columns={this.setColumns()}
                    className="menuListTable"
                    loading={loading}
                    dataSource={table.dataSource}
                    pagination={{
                    total: table.count,
                    pageSize:5,
                    onChange: this.handleTableChange,
                    current:table.current
                    }}
                />
            </div>
        )
    }
}

export default Statistics
