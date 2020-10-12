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
export const BookDetail = ReactLoad({
    loader:()=>import('./books/detail'),
    loading:Loading
})