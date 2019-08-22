// define action
const LOGIN_REQUEST = 'user/LOGIN_REQUEST',
      LOGIN_SUCCESS = 'user/LOGIN_SUCCESS',
      LOGIN_FAILURE = 'user/LOGIN_FAILURE',
      LOGOUT = 'user/LOGOUT';

// action create function
export const loginRequest = () => ({ type: LOGIN_REQUEST }),
             loginSuccess = user => ({ type: LOGIN_SUCCESS, user }),
             loginFailure = error => ({ type: LOGIN_FAILURE, error }),
             logout = () => ({ type: LOGOUT });

const initialState = {
    fetching: false,
    isLoggedIn: false,
    error: false,
    user: null,
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

        case LOGOUT :
            return {
                ...state,
                fetching: false,
                isLoggedIn: false,
                user: null
            }

        default :
            return state;
    }
}