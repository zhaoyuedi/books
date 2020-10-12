import styled from "styled-components";

export const warpSearch = styled.div`
   border-radius: 4px 0;
    padding: 10px 0;
    margin: @operationFixedMarginTopAdmin 20px 0;
    background: @background-color-panel;
    .title{
      display: flex;
      align-items: center;
      margin-bottom: 0;
    }
    .trgeniusrWarp{
        display: flex;
        justify-content: space-between;
        // padding:0 20px 0 20px;
        .trgeniusr{
            width:100%;
            display: flex;
            justify-content: flex-start;
            overflow: hidden;
            flex-wrap: wrap;
            // transition:max-height 0.3s;
            font-size: 12px;
            float: left;
            padding-right:40px;
            .ant-form{
              width: 100%;
            }
        }
        .searchDiv{
            height: 45px;
            display: flex;
            justify-items: center;
            align-items: center;
            float: right;
            margin:4px 0 0 0 ;
            flex-shrink: 0;
            .search-btn{
              font-size: 12px !important;
            }
            .uxpandText{
              padding-left: 8px;
            }
        }
        .ant-form-item{
            margin-bottom: 10px !important;
        }
        .ant-row {
            font-size: 12px;
          }
          .ant-form-item-control-wrapper {
            height: 39px;
            font-size: 12px;
          }
          .ant-form-item-control{
            height: 39px;
            line-height: 39px;
          }
          .ant-select{
            margin: 4px 0px;
          }
          .ant-select-enabled{
            height: 32px;
          }
          .ant-form-item-label {
            font-size: 12px;
          }
    }
    label{
      opacity: 1;
    }
    .direction-column{
      .trgeniusr{
        padding-right:0px !important;
      }
      //width: calc(100% - 170px);
      //padding: unset;
      .searchDiv{
        margin: 10px 0 !important;
      }
    }
`;
