import { combineReducers } from 'redux';
import { singleUserReducer } from './singleUserReducer';
import userReducer from './usersReducer';
import {UPDATE_LOCAL} from '../actions';

const updateLocal = (state = 1, action) => {
    switch(action.type) {
        case UPDATE_LOCAL : 
            return state + 1

        default : 
            return state;
    }
}


export default combineReducers({
    users : userReducer,
    singleUser : singleUserReducer,
    updateLocal
})