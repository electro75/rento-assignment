import api from '../apis/jsonPlaceholder';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_SINGLE_USER_POSTS = 'FETCH_SINGLE_USER_POSTS';
export const STORE_SINGLE_USER = 'STORE_SINGLE_USER';


export const fetchAllUsers = () => async dispatch => {
    const response = await api.get('/users');
    
    dispatch({type: FETCH_USERS, payload: response.data});
}

export const fetchSingleUserPosts = (userId) => async dispatch => {
    const response = await api.get(`/posts?userId=${1}&skip=0&limit=0`);
    
    dispatch({type: FETCH_SINGLE_USER_POSTS, payload: {id : userId, data : response.data}})
}

export const fetchSingleUser = (userId) => async dispatch => {
    const response = await api.get(`users/${userId}`);
    console.log(response.data);
    dispatch({type: STORE_SINGLE_USER, payload : {id: userId, name: response.data.name}});
}

export const storeSingleUser = (user) => {
    return {type: STORE_SINGLE_USER, payload: user};
}