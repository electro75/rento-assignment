import {FETCH_SINGLE_USER_POSTS, STORE_SINGLE_USER} from '../actions';


export const singleUserReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_SINGLE_USER_POSTS :            
            if(Object.keys(state).length < 10) {                   
                return {
                    ...state,
                    [action.payload.id] : {
                        ...state[action.payload.id],
                        posts : action.payload.data
                    }
                }
            } else {
                let newState = {};
                Object.keys(state).forEach((key, index) => {
                    if(index > 0) {
                        newState[key] = state[key];
                    }
                })

                return {
                    ...newState, 
                    [action.payload.id] : {
                        ...state[action.payload.id],
                        posts: action.payload.data
                    }
                }
            } 

        case STORE_SINGLE_USER :            
            if(state[action.payload.id] && !state[action.payload.id].id) {
                return {
                    ...state,
                    [action.payload.id] : {
                        ...state[action.payload.id],
                        ...action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    [action.payload.id] : action.payload
                }
            }

        default : 
            return state;
    }

}