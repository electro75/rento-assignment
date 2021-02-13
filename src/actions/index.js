import api from '../apis/jsonPlaceholder';

export const FETCH_USERS = 'FETCH_USERS';


export const fetchAllUsers = () => async dispatch => {
    const response = await api.get('/users');
    
    dispatch({type: FETCH_USERS, payload: response.data});
}