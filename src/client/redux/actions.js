import { userConstants } from './constants';

// export {
//   login, logout, updateLogin, signup, userManage, userGet, accountDelete, accountUpdate
// };

// saga call
export const login = authParams => ({
  type: userConstants.LOGIN_WATCHER,
  payload: authParams
});
export const updateLogin = () => ({
  type: userConstants.USER_LOGIN
});
export const signup = signupParams => ({
  type: userConstants.SIGNUP_WATCHER,
  payload: signupParams
});
export const userManage = () => ({
  type: userConstants.USERMANAGE_WATCHER
});
export const accountDelete = () => ({
  type: userConstants.ACCOUNTDELETE_WATCHER
});
export const accountUpdate = updateParams => ({
  type: userConstants.ACCOUNTUPDATE_WATCHER,
  payload: updateParams
});

// reducer call
export const logout = () => {
  localStorage.clear();
  return { type: userConstants.USER_LOGOUT };
};
export const userGet = userData => ({
  type: userConstants.USER_INFO,
  payload: userData
});
