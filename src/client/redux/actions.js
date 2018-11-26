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
const login = authParams => ({
  type: LOGIN_WATCHER,
  payload: authParams
});
const updateLogin = () => ({
  type: USER_LOGIN
});
const signup = signupParams => ({
  type: SIGNUP_WATCHER,
  payload: signupParams
});
const userManage = () => ({
  type: USERMANAGE_WATCHER
});
const accountDelete = () => ({
  type: ACCOUNTDELETE_WATCHER
});
const accountUpdate = updateParams => ({
  type: ACCOUNTUPDATE_WATCHER,
  payload: updateParams
});

// reducer call
const logout = () => ({ type: USER_LOGOUT });
const userGet = userData => ({
  type: USER_INFO,
  payload: userData
});

export {
  login, updateLogin, signup, userManage, accountDelete, accountUpdate, logout, userGet
};
