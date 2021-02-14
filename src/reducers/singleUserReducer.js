import {DELETE_POST, FETCH_SINGLE_USER_POSTS, STORE_SINGLE_USER} from '../actions';


export const singleUserReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_SINGLE_USER_POSTS :
            if(state[action.payload.id] || Object.keys(state).length < 10) {      
                console.log(action.payload.data);             
                return {
                    ...state,
                    [action.payload.id] : {
                        ...state[action.payload.id],
                        posts : [...action.payload.data]
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
                        posts: [...action.payload.data]
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
                    [action.payload.id] : {
                        ...state[action.payload.id],
                        ...action.payload
                    }
                }
            }
            
        case DELETE_POST : 
            if(state[action.payload.userId]) {                
                let newState = {
                    ...state,
                    [action.payload.userId] : {
                        ...state[action.payload.userId],
                        posts : state[action.payload.userId].posts.filter(post => {
                            return post.id !== action.payload.postId
                        })
                    }
                }
                return newState
            } else {
                return state
            }

        default : 
            return state;
    }

}