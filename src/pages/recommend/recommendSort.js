import React, { Component } from 'react'
import {getRecommendList } from "@api";
import { Table} from 'antd';

export class RecommendSort extends Component {
    constructor(){
        super()
        this.state = {
            table:{},
            loading:true
        }
    }
    componentDidMount(){
        this.updateTable(1)
    }
    updateTable=async (_page=1,_limit=5)=>{
        this.setState({
            loading:true
        })
        getRecommendList().then(res=>{
            let arr = Array.from(new Set(res.map(v=>v.recommendBook)))
            let dataSource = arr.map(v=>(
                {
                    recommendBook:v,
                    recommendSum:res.filter(d=>d.recommendBook===v).reduce((sum,item)=>sum+Number(item.number),0)
                }
            ))
            this.setState({
              table:{
                dataSource:dataSource,
                count:res.length,
                current:_page
              },
              loading:false
            })
        })
      }
    setColumns = ()=>{
        return [
            {
                title: '推荐图书名称',
                dataIndex: 'recommendBook',
                key: 'recommendBook',
                width: 200
            },
            {
                title: '图书推荐次数',
                dataIndex: 'recommendSum',
                key: 'recommendSum',
                width: 200
            },
        ]
    }
    handleTableChange = (page, pageSize) => {
        this.updateTable(page);
    };
    render() {
        const {table,loading} = this.state
        return (
            <div>
                <Table
                    rowKey={record => record.recommendBook}
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

export default RecommendSort
