import {Home,UserList,AddBooks,BooksList,UserInfo,Login,BookDetail} from '@pages'

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
        name:"图书管理",
        children:[
            {
                key:"/books/booksList",
                path:"/books/booksList",
                name:"图书查询",
                component:BooksList,
                icon:"bars"
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
export const page = [
    {
        key:"/addBook",
        path:"/addBook",
        component:AddBooks,
        name:"新增图书"
    },
    {
        key:"/book/detail",
        path:"/book/detail/:id",
        component:BookDetail,
        name:"图书详情"
    }
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

export const baseconfigRouters = layoutRoute.concat(login).concat(page)