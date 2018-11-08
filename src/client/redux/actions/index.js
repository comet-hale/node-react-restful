import { userConstants } from "../constants/action_types";
import axios from 'axios';

export const login = ({ userName, password }) => {
    return dispatch => {
        dispatch(loginStarted());

        axios
            .post('/api/login', {
                userName,
                password,
                completed: false
            })
            .then(res => {
                setTimeout(() => {
                    dispatch(loginSuccess(res.data));
                }, 2500);
            })
            .catch(err => {
                dispatch(loginFailure(err.message));
            });
    };
};

const loginSuccess = resData => ({
    type: userConstants.USER_LOGIN_SUCCESS,
    payload: {
        ...resData
    }
});

const loginFailure = error => ({
    type: userConstants.USER_LOGIN_FAILURE,
    payload: {
        error
    }
});

const loginStarted = () => ({
    type: userConstants.USER_LOGIN_STARTED
});

export const logout = () => ({
    type: userConstants.USER_LOGOUT, payload: {}
});

export const signup = userData => ({
    type: userConstants.USER_SIGNUP, payload: userData
});