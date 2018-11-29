import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNIN, SIGNIN_FAILURE, SIGNIN_SUCCESS
} from '../constants';
import { auth, db } from './../../firebase/';
import { Observable } from 'rxjs/Rx';

//** Epic Middlewares For Auth **//
export default class AuthEpic {

    static signUpEpic = (action$) =>
        action$.ofType(SIGNUP)
            .mergeMap(({ payload }) => {
                return Observable.fromPromise(auth.doCreateUserWithEmailAndPassword(payload.email, payload.password))
                    .catch((err) => {
                        return Observable.of({
                            type: SIGNUP_FAILURE,
                            payload: err.message
                        })
                    })
                    .map((response) => {
                        return { ...response, ...payload }
                    })
            })
            .switchMap((obj) => {
                if (obj.type === SIGNUP_FAILURE) {
                    return Observable.of(
                        {
                            type: SIGNUP_FAILURE,
                            payload: obj.payload
                        }
                    )
                }
                else {
                    return Observable.fromPromise(db.doCreateUser(obj.user.uid, obj.email, obj.password))
                        .switchMap((response) => {
                            return Observable.of(
                                {
                                    type: SIGNUP_SUCCESS,
                                    payload: { ...obj }
                                },
                                {
                                    type: SIGNIN,
                                    payload: { ...obj }
                                }

                            )
                        })
                        .catch((err) => {
                            return Observable.of({
                                type: SIGNUP_FAILURE,
                                payload: err.message
                            })
                        })
                }

            })


    static signInEpic = (action$) =>
        action$.ofType(SIGNIN)
            .switchMap(({ payload }) => {
                const { email, password } = payload
                return Observable.fromPromise(auth.doSignInWithEmailAndPassword(email, password))
                    .catch((err) => {
                        return Observable.of(
                            {
                                type: SIGNIN_FAILURE,
                                payload: err.message
                            }
                        )
                    })
                    .map((response) => {
                        if (response.type === 'SIGNIN_FAILURE') {
                            return {
                                type: SIGNIN_FAILURE,
                                payload: response.payload
                            }
                        }
                        else {
                            const { user: { email, uid, metadata } } = response
                            return {
                                type: SIGNIN_SUCCESS,
                                payload: { email, uid, metadata }
                            }

                        }

                    })
            })

}

