import React from 'react';
import { Table,Tooltip } from 'antd';
import _ from 'lodash'
import { TableWarp } from "./styled";

class BaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableH: { y: "300px" },
      rowSelection:{columnWidth:'20px'}
    };
  }

  componentDidMount() {
    let hh =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    
    this.setState({ tableH: { y: hh - 10 + "px" } });
    window.addEventListener('resize', this.resize);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let { top, center, bottom } = prevProps.detailBox || {
  //     top: false,
  //     center: false,
  //     bottom: false,
  //   };
  //   let { top: top1, center: center1, bottom: bottom1, hidden: hidden1 } = this
  //     .props.detailBox || {
  //       top: false,
  //       center: false,
  //       bottom: false,
  //       hidden: false,
  //     };
  //   if (top === top1 && center === center1 && bottom === bottom1) {
  //     
  //   } else {
  //     if (hidden1 && bottom1) {
  //       let hh = this.refs.tableBoxAdmin.offsetHeight;
  //       
  //       hh < 400
  //         ? hh === 20
  //           ? this.setState({ tableH: { y: hh + 480 + 'px' } })
  //           : this.setState({ tableH: { y: hh + 190 + 'px' } })
  //         : this.setState({ tableH: { y: hh - 100 + 'px' } });
  //     } else if (!top1 && center1 && !bottom1) {
  //       let hh = this.refs.tableBoxAdmin.offsetHeight;
  //       
  //       this.setState({ tableH: { y: hh - 400 + 'px' } });
  //     } else if (!top1 && !center1 && bottom1) {
  //       let hh = this.refs.tableBoxAdmin.offsetHeight;
  //       
  //       hh < 400
  //         ? hh === 30
  //           ? this.setState({  })
  //           : this.setState({  })
  //         : this.setState({ tableH: { y: hh - 103 + 'px' } });
  //     }
  //   }
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    let hh = this.refs.tableBoxAdmin.offsetHeight;
    // 
    this.setState({ tableH: { y: hh - 50 + 'px' } });
  };

  changeScrollH = params => {
    this.setState({ tableH: { y: params } });
  };

  render() {
    // const { pagination, className, style, scrollX,columns, ...rest } = this.props;
    const { pagination, className, style, scrollX,wrapStyle,newStyleLess,
      columns,components={}, ...rest } = this.props;
    // const BASE_PAGINATION = {
    //   defaultCurrent: 1,
    //   defaultPageSize: 10,
    //   showQuickJumper: true,
    //   showSizeChanger: true,
    //   size: 'small',
    //   pageSizeOptions: ['1', '5', '10', '20', '50', '100'],
    //   // simple: true,
    //   showTotal: () => {
    //     // 
    //     const {
    //       count
    //     } = pagination
    //     return (
    //       <span>
    //         {`共${count}条记录`}
    //       </span>
    //     );
    //   },
    // };
    // const allPagination = pagination
    //   ? { ...BASE_PAGINATION, ...pagination }
    //   : false;
    // if(allPagination.total === 0){
    //   allPagination.total = 1;
    //   allPagination.pages = 0;
    // }
    let expandFlag=this.props.expandedRowKeys && _.isEmpty(this.props.expandedRowKeys)
    const COLUMNS=_.map(_.cloneDeep(columns),item=>{
      let {required,title}=item
      if(required){
        item.title=(
          <span>
              <Tooltip
                placement="top"
                title={
                  <div
                    style={{ width: 'max-content', fontSize: 12, maxWidth: 300 }}
                  >
                    {}
                    '必填'
                  </div>
                }
              >
                 <i className='markStar' >*</i>
              </Tooltip>
              title
            </span>
        )
      }
      return {...item,ellipsis:true}
    })
   let tableProps={
    ...rest,
    columns:COLUMNS,
    // rowSelection:{...this.props.rowSelection,...this.state.rowSelection},
    rowSelection:{...this.state.rowSelection,...this.props.rowSelection},
    scroll:scrollX ? { ...this.state.tableH, ...scrollX } : this.state.tableH,
    pagination,
    className
   }
    if(!expandFlag){
      tableProps.components=components
    }
    return (
      <TableWarp>
      <div className={`${'tableBoxAdmin'} ${newStyleLess?'styleLess':''}`} ref="tableBoxAdmin" style={wrapStyle?{
        paddingTop:20,
        borderRadius:4,
        ...wrapStyle}:{}}>
          <Table
            {...tableProps}
            // rowSelection={{...this.state.rowSelection,...this.props.rowSelection}}
          />
      </div>
      </TableWarp>
    );
  }
}

export default BaseTable;
