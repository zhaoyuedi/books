import styled from "styled-components";

export const LoginWrapper = styled.div`
  & > div {
    display: flex;
    justify-content: start;
    overflow: hidden;
    flex-wrap: wrap;
    transition:max-height 0.3s;
  }
  .not-already {
    height: 200px;
    transition:height 5s;
    /* animation:myfirst 0.3s;
    animation-fill-mode: forwards; */
  }
  .unfold{
    max-height: 700px;
    transition:height 5s;
    /* animation:firsts 0.3;
    animation-fill-mode: forwards; */
  }

  .ant-row {
    display: flex;
    margin-right: 20px;
    justify-content: center;
  }
  .ant-form-item-control-wrapper {
    width: 250px;
  }
  .ant-form-item-label {
    width: 140px;
  }
`;
export const Wrap = styled.div`
  .ant-form-item {
    display: flex;
  }
  .checkBox {
    display: flex;
  }
  /* .ant-checkbox {
    .ant-checkbox-inner {
      border-color: #ff7d41;
      background-color: #ff7d41;
    }
  } */
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: #ff7d41;
    border-color: #ff7d41;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #ff7d41 !important;
  }
`;
