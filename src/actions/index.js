import api from '../apis/jsonPlaceholder';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_SINGLE_USER_POSTS = 'FETCH_SINGLE_USER_POSTS';
export const STORE_SINGLE_USER = 'STORE_SINGLE_USER';
export const UPDATE_LOCAL = 'UPDATE_LOCAL';


export const fetchAllUsers = () => async dispatch => {
    const response = await api.get('/users');
    
    dispatch({type: FETCH_USERS, payload: response.data});
    dispatch({type: UPDATE_LOCAL});
}

export const fetchSingleUserPosts = (userId) => async dispatch => {
    const response = await api.get(`/posts?userId=${userId}&skip=0&limit=10`);
    console.log(response);
    
    dispatch({type: FETCH_SINGLE_USER_POSTS, payload: {id : userId, data : response.data}})
    dispatch({type: UPDATE_LOCAL});
}

export const fetchSingleUser = (userId) => async dispatch => {
    const response = await api.get(`users/${userId}`);

    dispatch({type: STORE_SINGLE_USER, payload : {id: userId, name: response.data.name}});
}

export const storeSingleUser = (user) => {
    return {type: STORE_SINGLE_USER, payload: user};
}

export const updateLocalState = () => {
    return {type: UPDATE_LOCAL}
}