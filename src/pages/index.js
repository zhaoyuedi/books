import ReactLoad from 'react-loadable';
import Loading from '@common/Loading';

export const AddBooks = ReactLoad({
    loader:()=>import('./books/addBooks'),
    loading:Loading
})
export const BooksList = ReactLoad({
    loader:()=>import('./books/booksList'),
    loading:Loading
})
export const Login = ReactLoad({
    loader:()=>import('./login'),
    loading:Loading
})
export const Home = ReactLoad({
    loader:()=>import('./home'),
    loading:Loading
})
export const UserInfo = ReactLoad({
    loader:()=>import('./user/userInfo'),
    loading:Loading
})
export const UserList = ReactLoad({
    loader:()=>import('./user/userList'),
    loading:Loading
})
export const UserDetail = ReactLoad({
    loader:()=>import('./user/detail'),
    loading:Loading
})
export const BookDetail = ReactLoad({
    loader:()=>import('./books/detail'),
    loading:Loading
})
export const Statistics = ReactLoad({
    loader:()=>import('./books/statistics'),
    loading:Loading
})
export const Category = ReactLoad({
    loader:()=>import('./books/category'),
    loading:Loading
})
export const DetailCategory = ReactLoad({
    loader:()=>import('./books/detailCategory'),
    loading:Loading
})
export const recommendList = ReactLoad({
    loader:()=>import('./recommend/recommendList'),
    loading:Loading
})
export const recommendSort = ReactLoad({
    loader:()=>import('./recommend/recommendSort'),
    loading:Loading
})
export const UserHome = ReactLoad({
    loader:()=>import('./UserHome'),
    loading:Loading
})
export const BooksUserDetail = ReactLoad({
    loader:()=>import('./UserHome/detail'),
    loading:Loading
})