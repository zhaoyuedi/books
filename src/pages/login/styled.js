import styled from "styled-components"


export const LoginWrapper = styled.div`
    width:100%;
    height:100%;
    background:url('http://b-ssl.duitang.com/uploads/item/201701/13/20170113092725_AucYf.jpeg') no-repeat;
    background-size:100% 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    .loginContainer{
        width:500px;
        height:300px;
        background:rgba(255,255,255,.3);
        padding:30px;
    }
    .logo{
        width:100%;
        height:50px;
        display:flex;
        justify-content:center;
        margin-bottom:20px;
        img{
            width:50px;
            height:50px;
        }
    }
    .foot{
        position:fixed;
        bottom:40px;
        left:40px;
        color: red;
        font-size:22px;
        cursor: pointer;
    }
    .login-form-button{
        margin-left:50px
    }
`