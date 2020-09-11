// @import '../../styles/public/common.less';

import styled from "styled-components";
export const TableWarp = styled.div`
height:100%;
.tableBoxAdmin{
    flex:100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 20px 5px;
    border-radius:0 0 4px 4px;
    .markStar{
        color: red;
        font-weight: bold;
        display: inline-block;
        padding-right: 5px;
        vertical-align: -2px;
    }
    .ant-select-arrow{
        right: 11px !important;
    }
}
.styleLess{
    padding-bottom: 22px;
}
`;
