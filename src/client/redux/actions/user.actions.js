import { userConstants } from '../constants';

const {
  LOGIN_WATCHER,
  USER_LOGIN,
  SIGNUP_WATCHER,
  USER_MANAGE_WATCHER,
  ACCOUNT_DELETE_WATCHER,
  ACCOUNT_UPDATE_WATCHER,
  SAVE_USER_INFO,
  USER_LOGOUT
} = userConstants;

// saga call
exports.login = authParams => ({
  type: LOGIN_WATCHER,
  payload: authParams
});
exports.updateLogin = () => ({
  type: USER_LOGIN
});
exports.signup = signupParams => ({
  type: SIGNUP_WATCHER,
  payload: signupParams
});
exports.userManage = () => ({
  type: USER_MANAGE_WATCHER
});
exports.accountDelete = () => ({
  type: ACCOUNT_DELETE_WATCHER
});
exports.accountUpdate = updateParams => ({
  type: ACCOUNT_UPDATE_WATCHER,
  payload: updateParams
});

// reducer call
exports.logout = () => ({ type: USER_LOGOUT });
exports.userGet = userData => ({
  type: SAVE_USER_INFO,
  payload: userData
});
