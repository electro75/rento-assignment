import {FETCH_POST_DETAILS, FETCH_POST_COMMENTS, DELETE_POST} from '../actions';

export const singlePostReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_POST_DETAILS : 
            if( state[action.payload.id] || Object.keys(state).length < 3) {
                return {
                    ...state,
                    [action.payload.id] : action.payload 
                }
            } else {
                let newState = {};
                Object.keys(state).forEach((key, index) => {
                    if(index > 0) {
                        newState[key] = state[key]
                    }                     
                });

                return {
                    ...newState,
                    [action.payload.id] : action.payload
                }
            }

        case FETCH_POST_COMMENTS : 
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    comments : [...action.payload.data]
                }
            }
            
        case DELETE_POST : 
            let newState= {}
            
            Object.keys(state).forEach(key => {                
                if(+key !== action.payload.postId) {
                    newState[key] = state[key];
                }
            })
            
            return {
                ...newState
            }

        default :
            return state;
    }
}