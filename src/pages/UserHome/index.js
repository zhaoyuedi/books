import React, { Component } from 'react'
import { Card, Col, Row  } from 'antd';
import { getCardList } from "@api";
import { withRouter } from 'react-router-dom';
const { Meta } = Card;

@withRouter
class UserHome extends Component {
    constructor(){
        super()
        this.state = {
            List:[]
        }
    }
    componentDidMount(){
        getCardList().then(data=>{
            this.setState({
                List:data
            })
        })
    }
    hand = (id)=>{
        console.log(id)
        this.props.history.push(`/booksUser/detail/${id}`)
    }
    render() {
        const {List} = this.state
        return (
            <div>
               <Row>
                   {
                    List.map(v=>(
                        <Col span={7} style={{marginTop:20}} offset={1} onClick={()=>this.hand(v.id)}>
                            <Card
                            cover={<img alt="example" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2157021821,4199426167&fm=26&gp=0.jpg" style={{height:250}}/>}
                            >
                                 <Meta title={v.title} description={v.grade} />
                            </Card>
                        </Col>
                    ))
                   }
               </Row>
            </div>
        )
    }
}

export default UserHome
