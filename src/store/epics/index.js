import { combineEpics } from 'redux-observable';
import AuthEpic from './userEpic';

const rootEpic = combineEpics(
    AuthEpic.signUpEpic,
    AuthEpic.signInEpic,
);

export default rootEpic;