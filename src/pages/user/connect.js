import {connect} from 'react-redux';
import {FORMDATA_ACTION_ASYNC} from '@actions/pic';

const mapStateToProps = (state)=>({
    userPic:state.user.userPic
})

const mapDispathToProps = (dispatch)=>({
    handlerPic(formData){
        dispatch(FORMDATA_ACTION_ASYNC(formData))
    }
})
export default connect(mapStateToProps,mapDispathToProps)