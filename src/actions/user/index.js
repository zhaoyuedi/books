import { createAction } from "redux-actions";
import { registerUser, loginUser,UpdateName } from "@api";

export const REGISTER_ACTION_ASYNC = userInfo => {
  let { userId, password } = userInfo;
  console.log(userInfo);
  return async dispatch => {
    let data = await registerUser(userId, password);
    console.log(data);
    if (data.data.code === 1) {
      return true;
    }
  };
};

const USERNAME_ACTION = createAction("username_action", data => data);

export const USERNAME_ACTION_ASYNC =  username => {
 
  return async (dispatch)=>{
    let userId = localStorage.getItem("userId")
    let data = await UpdateName(userId,username)
    console.log(data)
    if(data.data.info.msg==='修改成功'){
      localStorage.setItem("username",data.data.info.username)
      dispatch(USERNAME_ACTION(data.data.info.username))
      return true
    }
  }
};

const LOGIN_ACTION = createAction("login_action", data => data);
export const LOGIN_ACTION_ASYNC = userInfo => {
  let { userId, password } = userInfo;
  return async dispatch => {
    let data = await loginUser(userId, password);
    console.log(data);
    if (data.data.code === 1) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", data.data.info.username);
      localStorage.setItem("userPic", data.data.info.userPic);
      dispatch(LOGIN_ACTION(data.data.info));
    }
    return data;
  };
};
