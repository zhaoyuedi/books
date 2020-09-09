import http from '@utils/http';
import {fetch as fetchPro} from "whatwg-fetch";

export const  booksListApi = (page,pageSize,free,group,finish,sortId)=>http.post("/api/books/booksList",{page,pageSize,free,group,finish,sortId})


export const registerUser = (userId,password)=>http.post("/api/users/register",{
    userId:userId,
    password:password
})

export const loginUser = (userId,password)=>http.post('/api/users/login',{
    userId:userId,
    password:password
})

export const userList = ()=>http.get("/api/users/list");

export const UpdatePassword =(userId,password,username)=>http.post("/api/users/updateInfo",{
    userId:userId,
    password:password,
    username:username
})
export const UpdateName =(userId,username)=>http.post("/api/users/updateInfo",{
    userId:userId,
    username:username
})

export const UpdateUserPic =(userId,userPic)=>http.post("/api/users/updateUserPic",{
    userId:userId,
    userPic:userPic
})

export const modifyUserPicApi = (formdata)=>{
    return fetchPro("/api/users/updateUserPic",{
           method:"post",
           body:formdata
         }).then(res=>res.json())
   }
export const BooksList = (params)=>http.get('/api/statis/',params)