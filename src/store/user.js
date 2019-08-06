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

function getUser() {
    axios.post('/auth/isLoggedIn')
         .then(result => {
             console.log('result');
             console.log(result);
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