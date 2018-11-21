import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { userConstants } from './constants';
import { updateLogin, userGet, logout } from './actions';

// export {
//   loginWatcher,
//   userManageWatcher,
//   signupWatcher,
//   accountDeleteWatcher,
//   accountUpdateWatcher
// };

const loginApi = authParams => axios.request({
  method: 'post',
  url: '/api/users/login',
  data: authParams
});
const userManageApi = () => axios.request({
  method: 'get',
  url: '/api/users/manage',
  headers: { authorization: localStorage.getItem('token') }
});
const signupApi = signupDatas => axios.request({
  method: 'post',
  url: '/api/users/signup',
  data: signupDatas
});
const accountDeleteApi = () => axios.request({
  method: 'delete',
  url: '/api/users/delete',
  headers: { authorization: localStorage.getItem('token') }
});
const accountUpdateApi = updateDatas => axios.request({
  method: 'put',
  url: '/api/users/update',
  headers: { authorization: localStorage.getItem('token') },
  data: updateDatas
});
// workers
function* loginEffect(action) {
  try {
    const { data } = yield call(loginApi, action.payload);
    // data.map((info) => {
    //   console.log(info);
    // });
    const {
      token, emailAddress, username, password
    } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('emailAddress', emailAddress);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    if (localStorage.length > 0) yield put(updateLogin());
  } catch (e) {
    console.log(e);
  }
}
function* userManageEffect() {
  try {
    const { data } = yield call(userManageApi);
    yield put(userGet(data));
  } catch (e) {}
}
function* signupEffect(action) {
  try {
    const { data } = yield call(signupApi, action.payload);
    const {
      token, emailAddress, username, password
    } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('emailAddress', emailAddress);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    if (localStorage.length > 0) yield put(updateLogin());
  } catch (e) {}
}
function* accountDeleteEffect() {
  try {
    const { data } = yield call(accountDeleteApi);
    console.log(data);
    yield put(logout());
  } catch (e) {}
}
function* accountUpdateEffect(action) {
  try {
    const { data } = yield call(accountUpdateApi, action.payload);
    const {
      token, emailAddress, username, password
    } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('emailAddress', emailAddress);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  } catch (e) {}
}
// watchers
export function* loginWatcher() {
  yield takeLatest(userConstants.LOGIN_WATCHER, loginEffect);
}
export function* userManageWatcher() {
  yield takeLatest(userConstants.USERMANAGE_WATCHER, userManageEffect);
}
export function* signupWatcher() {
  yield takeLatest(userConstants.SIGNUP_WATCHER, signupEffect);
}
export function* accountDeleteWatcher() {
  yield takeLatest(userConstants.ACCOUNTDELETE_WATCHER, accountDeleteEffect);
}
export function* accountUpdateWatcher() {
  yield takeLatest(userConstants.ACCOUNTUPDATE_WATCHER, accountUpdateEffect);
}
