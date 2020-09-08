import {Home,UserList,AddBooks,BooksList,UserInfo,Login} from '@pages'

export const layoutRoute =[
    {
        key:"/home",
        path:"/home",
        component:Home,
        icon:"home",
        name:"首页"
    },
    {
        key:"/books",
        path:"/books",
        icon:"zhihu",
        name:"书籍管理",
        children:[
            {
                key:"/books/booksList",
                path:"/books/booksList",
                name:"书籍列表",
                component:BooksList,
                icon:"bars"
            },
            {
                key:"/books/addbooks",
                path:"/books/addbooks",
                name:"添加书籍",
                component:AddBooks,
                icon:"block"
            }
        ]
    },
    {
        key:"/user",
        path:"/user",
        icon:"user",
        name:"用户管理",
        children:[
            {
                key:"/user/userinfo",
                path:"/user/userinfo",
                name:"个人信息",
                component:UserInfo,
                icon:"user-delete"
            },
            {
                key:"/user/userlist",
                path:"/user/userlist",
                name:"用户列表",
                component:UserList,
                icon:"block"
            }
        ]
    },
]

export const login = [
    {
        path: "/login",
        key: "/login",
        component: Login,
        icon: "",
        name: "登陆",
    }
]

export const baseconfigRouters = layoutRoute.concat(login)