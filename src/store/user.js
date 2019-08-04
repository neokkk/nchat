const SAVE_USER = 'user/SAVE_USER';

export const saveUser = user => ({ type: SAVE_USER, user });

const initialState = {
    user: null,
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER :
            return {
                ...state,
                user: action.user
            }

        default :
            return state;
    }
}