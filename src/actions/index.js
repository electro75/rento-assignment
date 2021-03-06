import api from '../apis/jsonPlaceholder';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_SINGLE_USER_POSTS = 'FETCH_SINGLE_USER_POSTS';
export const STORE_SINGLE_USER = 'STORE_SINGLE_USER';
export const UPDATE_LOCAL = 'UPDATE_LOCAL';
export const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS';
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS';
export const DELETE_POST = 'DELETE_POST';
export const API_ERROR = 'API_ERROR';
export const ERROR_INIT = 'ERROR_INIT';

// get all users
export const fetchAllUsers = () => async dispatch => {
    const response = await api.get('/users');

    if(response.status === 200) {
        dispatch({type: FETCH_USERS, payload: response.data});
        dispatch({type: UPDATE_LOCAL});
    }    
}

// get all post by one user
export const fetchSingleUserPosts = (userId, skip) => async dispatch => {
    try {
        const response = await api.get(`/posts`, {params : {
            userId,
            skip,
            limit: 10
        }})    
    
        
        dispatch({type: FETCH_SINGLE_USER_POSTS, payload: {id : userId, data : response.data}})

        if(skip>0) {
            dispatch({type: UPDATE_LOCAL});
        }
    } catch {
        dispatch({type : API_ERROR});
    }    
}

// get user details (name) in case user's post page is accessed directly
export const fetchSingleUser = (userId) => async dispatch => {
    try {
        const response = await api.get(`/users/${userId}`);
        dispatch({type: STORE_SINGLE_USER, payload : {id: userId, name: response.data.name}});
        dispatch({type: UPDATE_LOCAL});
    } catch {
        dispatch({type : API_ERROR})
    }

}

// store the details of the user (name, id)
export const storeSingleUser = (user) => {
    return {type: STORE_SINGLE_USER, payload: user};
}

// update the local state of the component
export const updateLocalState = () => {
    return {type: UPDATE_LOCAL}
}

// fetch post details 
export const fetchPostDetails = (postId) => async dispatch => {
    try {
        const response = await api.get(`posts/${postId}`);
        dispatch({type : FETCH_POST_DETAILS, payload: response.data});
    } catch {
        dispatch({type: API_ERROR});
    }
    
}

// fetch post comments
export const fetchPostComments = (postId) => async dispatch => {
    const response = await api.get(`comments`, {params : {postId}});
    if(response.status === 200) {
        dispatch({type: FETCH_POST_COMMENTS, payload: {id: postId, data: response.data}});
    }
    
}

//delete post
export const deletePost = (post) => async dispatch => {
    try {
        await api.delete(`posts/${post.postId}`);    
        dispatch({type: DELETE_POST, payload: post});
        dispatch({type: UPDATE_LOCAL});
    } catch {
        dispatch({type: API_ERROR});
    }
    
}

export const initErrorState = () => {
    return {type : ERROR_INIT};
}