import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    IS_LOGGED_IN_FAILURE, IS_LOGGED_IN_SUCESS
} from '../constants'

export class userAuthActions {

    static signup(user) {
        return {
            type: SIGNUP,
            payload: user
        }
    }

    static signupSuccess(data) {
        return {
            type: SIGNUP_SUCCESS,
            payload: data
        }
    }

    static signupFailure(error) {
        return {
            type: SIGNUP_FAILURE,
            error: error
        }
    }

    static signin(user) {
        return {
            type: SIGNIN,
            payload: user
        }
    }

    static signinSuccess(data) {
        return {
            type: SIGNIN_SUCCESS,
            payload: data
        }
    }

    static signinFailure(error) {
        return {
            type: SIGNIN_FAILURE,
            error: error
        }
    }

    static isLoggedInSuccess(payload){
        return {
            type: IS_LOGGED_IN_SUCESS,
            payload
        }
    }

    static isLoggedInFailure(payload){
        return {
            type: IS_LOGGED_IN_FAILURE,
            payload
        }
    }

}