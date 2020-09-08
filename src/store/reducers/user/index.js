import {handleActions} from 'redux-actions';

const initAction = {
    username:localStorage.getItem('username')||'未登录',
    userPic:localStorage.getItem('userPic')||'',
}

export default handleActions({
    login_action:(state,actions)=>{
        let newActions = Object.assign({},state)
        newActions.username = actions.payload.username
        newActions.userPic = actions.payload.userPic
        return newActions
    },
    formdata_action:(state,actions)=>{
        console.log(actions.payload);
        let newPic = Object.assign({},state)
        newPic.userPic = actions.payload
        return newPic
    },
    username_action:(state,actions)=>{
        console.log(actions);
        let newname = Object.assign({},state)
        newname.username = actions.payload
        return newname
    }
},initAction)