import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { userConstants } from './constants';
import { updateLogin, userGet, logout } from './actions';

// axios implement middleware
const fetchGet = (method = 'get', url, data, headers) => axios.request({
  method,
  url: `api/${url}`,
  data,
  headers
});

// workers
function* loginEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'post', 'users/login', action.payload);
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    if (localStorage.length > 0) yield put(updateLogin());
  } catch (e) {
    console.log(e);
  }
}
function* userManageEffect() {
  try {
    const { data } = yield call(fetchGet, 'get', 'users/manage', '', {
      authorization: localStorage.getItem('token')
    });
    yield put(userGet(data));
  } catch (e) {}
}
function* signupEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'post', 'users/signup', action.payload);
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    if (localStorage.length > 0) yield put(updateLogin());
  } catch (e) {}
}
function* accountDeleteEffect() {
  try {
    const { data } = yield call(fetchGet, 'delete', 'users/delete', '', {
      authorization: localStorage.getItem('token')
    });
    console.log(data);
    yield put(logout());
  } catch (e) {}
}
function* accountUpdateEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'put', 'users/update', action.payload, {
      authorization: localStorage.getItem('token')
    });
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
  } catch (e) {}
}
// watchers
export function* userWatchers() {
  const {
    LOGIN_WATCHER,
    USERMANAGE_WATCHER,
    SIGNUP_WATCHER,
    ACCOUNTDELETE_WATCHER,
    ACCOUNTUPDATE_WATCHER
  } = userConstants;
  yield takeLatest(LOGIN_WATCHER, loginEffect);
  yield takeLatest(USERMANAGE_WATCHER, userManageEffect);
  yield takeLatest(SIGNUP_WATCHER, signupEffect);
  yield takeLatest(ACCOUNTDELETE_WATCHER, accountDeleteEffect);
  yield takeLatest(ACCOUNTUPDATE_WATCHER, accountUpdateEffect);
}
