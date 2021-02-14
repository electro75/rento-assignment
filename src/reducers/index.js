import { combineReducers } from 'redux';
import { singleUserReducer } from './singleUserReducer';
import { singlePostReducer } from './singlePostReducer';
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
    users : userReducer,            // [Users] ; contains all users
    singleUser : singleUserReducer, // {0: {User1}, 1: {User2}...} ; contains upto 10 user detail in a single object. specific users can be accesed using id
    singlePost : singlePostReducer, // {0: {PostDetails1}, 1: {PostDetails2}} ; contains upto 10 post detail in a single object. specific posts can be accesed using id
    updateLocal
})

// User and Post Details are stored in a single object in order to prevent multiple API calls and to make accessing of particular user/post details easier.