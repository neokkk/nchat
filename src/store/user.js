import axios from 'axios';

// define action
const LOGIN_REQUEST = 'user/LOGIN_REQUEST',
      LOGIN_SUCCESS = 'user/LOGIN_SUCCESS',
      LOGIN_FAILURE = 'user/LOGIN_FAILURE';

// action create function
export const loginRequest = () => ({ type: LOGIN_REQUEST }),
             loginSuccess = user => ({ type: LOGIN_SUCCESS, user }),
             loginFailure = error => ({ type: LOGIN_FAILURE, error });

const initialState = {
    fetching: false,
    isLoggedIn: false,
    error: false,
    user: null,
}

function getUserAPI() {
    return axios.post('http://localhost:5000/auth/isLoggedIn');
}

// redux-thunk
export const getUser = () => dispatch => {
    dispatch(loginRequest());

    return getUserAPI().then(response => {
        console.log('response');
        console.log(response);
        dispatch(loginSuccess(response));
    }).catch(err => {
        console.log('err');
        console.log(err);
        dispatch(loginFailure(err));
    });
}

// reducer
export default function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST :
            return {
                ...state,
                fetching: true,
            }
        
        case LOGIN_SUCCESS :
            return {
                ...state,
                fetching: false,
                isLoggedIn: true,
                user: action.user
            }

        case LOGIN_FAILURE : 
            return {
                ...state,
                fetching: false,
                error: action.error
            }

        default :
            return state;
    }
}