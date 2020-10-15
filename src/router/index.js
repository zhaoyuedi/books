import {Home,UserList,AddBooks,BooksList,UserInfo,Login,BookDetail,
    Statistics,recommendList,recommendSort,Category,DetailCategory,UserDetail} from '@pages'

export const layoutRouteAdministrator =[
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
                icon:"zoom-in"
            },
            {
                
                key:"/books/statistics",
                path:"/books/statistics",
                name:"种类统计",
                component:Statistics,
                icon:"pie-chart"
            },
            {
                
                key:"/books/category",
                path:"/books/category",
                name:"类别统计",
                component:Category,
                icon:"pie-chart"
            }
        ]
    },
    {
        key:"/recommend",
        path:"/recommend",
        icon:"like",
        name:"推荐管理",
        children:[
            {
                key:"/recommend/recommendList",
                path:"/recommend/recommendList",
                name:"图书推荐",
                component:recommendList,
                icon:"heart"
            },
            {
                key:"/recommend/sort",
                path:"/recommend/sort",
                name:"推荐排行",
                component:recommendSort,
                icon:"fire"
            }
        ]
    },
    {
        key:"/user",
        path:"/user",
        icon:"user",
        name:"用户管理",
        children:[
            // {
            //     key:"/user/userinfo",
            //     path:"/user/userinfo",
            //     name:"个人信息",
            //     component:UserInfo,
            //     icon:"user-delete"
            // },
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
export const layoutRoute = [
    
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
    },
    {
        key:"/category/detail",
        path:"/category/detail/:id?",
        component:DetailCategory,
        name:"新增图书类型"
    },
    {
        key:"/userList/detail",
        path:"/userList/detail/:id?",
        component:UserDetail,
        name:"新增用户"
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

export const baseconfigRouters = layoutRouteAdministrator.concat(login).concat(page)