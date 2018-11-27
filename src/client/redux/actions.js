import { userConstants } from './constants';

const {
  LOGIN_WATCHER,
  USER_LOGIN,
  SIGNUP_WATCHER,
  USERMANAGE_WATCHER,
  ACCOUNTDELETE_WATCHER,
  ACCOUNTUPDATE_WATCHER,
  USER_INFO,
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
  type: USERMANAGE_WATCHER
});
exports.accountDelete = () => ({
  type: ACCOUNTDELETE_WATCHER
});
exports.accountUpdate = updateParams => ({
  type: ACCOUNTUPDATE_WATCHER,
  payload: updateParams
});

// reducer call
exports.logout = () => ({ type: USER_LOGOUT });
exports.userGet = userData => ({
  type: USER_INFO,
  payload: userData
});
