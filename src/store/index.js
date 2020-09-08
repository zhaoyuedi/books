import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import user from './reducers/user'

const reducer = combineReducers({
    user
})

const store = createStore(reducer,applyMiddleware(ReduxThunk))

export default store