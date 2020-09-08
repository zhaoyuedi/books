import { connect } from "react-redux";
import { REGISTER_ACTION_ASYNC ,LOGIN_ACTION_ASYNC} from "@actions/user";

const mapStateToProps = state => ({});

const mapDispathToProps = dispatch => ({
  async registerHandelr(userInfo) {
    let flag = await dispatch(REGISTER_ACTION_ASYNC(userInfo));
    if (flag) {
      return flag
    }
  },
 async loginHandler(userInfo){
      let data = await dispatch(LOGIN_ACTION_ASYNC(userInfo))
      return data
  }
});

export default connect(
  mapStateToProps,
  mapDispathToProps
);
