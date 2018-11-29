import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    IS_LOGGED_IN_SUCESS, IS_LOGGED_IN_FAILURE
} from '../constants'

const initialState = {
    user: {},
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    error: null
}

export default function userAuthReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isError: false,
                user: action.payload,
                isLoading: false,
                error: null,
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                isError: true,
                user: null,
                error: action.payload,
            }
        case SIGNIN:
            return {
                ...state,
                user: null,
                isLoading: true,
                isError: false,
                error: null
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                isLoading: false,
                isError: false,
                error: null

            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isError: true,
                error: action.payload
            }

        case IS_LOGGED_IN_SUCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }

        case IS_LOGGED_IN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }


        default:
            return state
    }
}