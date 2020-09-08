import {connect} from 'react-redux';
import {USERNAME_ACTION_ASYNC} from '@actions/user';

const mapStateToProps = (state)=>({
    userName:state.user.username,
    userPic:state.user.userPic,
})

const mapDispathToprops = (dispatch)=>({
   async handlerName(username){
       let data = await dispatch(USERNAME_ACTION_ASYNC(username))
       return data
    }
})

export default connect(mapStateToProps,mapDispathToprops)