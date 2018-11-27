import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { userConstants } from './constants';
import actionCreator from './actions';

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
    const { data } = yield call(fetchGet, 'post', 'user/login', action.payload);
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    if (localStorage.length > 0) yield put(actionCreator.updateLogin());
  } catch (e) {
    console.log(e);
  }
}
function* userManageEffect() {
  try {
    const { data } = yield call(fetchGet, 'get', 'user/manage', '', {
      authorization: localStorage.getItem('token')
    });
    yield put(actionCreator.userGet(data));
  } catch (e) {}
}
function* signupEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'post', 'user/signup', action.payload);
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    if (localStorage.length > 0) yield put(actionCreator.updateLogin());
  } catch (e) {}
}
function* accountDeleteEffect() {
  try {
    const { data } = yield call(fetchGet, 'delete', 'user/delete', '', {
      authorization: localStorage.getItem('token')
    });
    console.log(data);
    yield put(actionCreator.logout());
  } catch (e) {}
}
function* accountUpdateEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'put', 'user/update', action.payload, {
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
