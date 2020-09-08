import { createAction } from "redux-actions";
import { modifyUserPicApi} from "@api";

const FORMDATA_ACTION = createAction("formdata_action",data=>data)

export const FORMDATA_ACTION_ASYNC = (formdata)=>{
    return async (dispatch)=>{
        let data = await modifyUserPicApi(formdata);
        console.log(data);
        if (data.data.info === "修改成功") {
            localStorage.setItem("userPic",data.data.urlPic)
            dispatch(FORMDATA_ACTION(data.data.urlPic))
        }
    }
}