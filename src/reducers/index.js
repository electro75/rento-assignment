import { combineReducers } from 'redux';
import { singleUserReducer } from './singleUserReducer';
import userReducer from './usersReducer';


export default combineReducers({
    users : userReducer,
    singleUser : singleUserReducer
})