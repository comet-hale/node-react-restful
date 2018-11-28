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
function* fileUploadEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'post', 'upload', action.payload, {
      authorization: localStorage.getItem('token')
    });
    if (data.success) {
      alert('Upload success!');
    } else {
      alert('Upload failed!');
    }
  } catch (e) {}
}
function* fileDownloadEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'get', 'download', action.payload, {
      authorization: localStorage.getItem('token')
    });
    yield put(actionCreator.logout());
  } catch (e) {}
}
function* fileDownloadStartEffect(action) {
  try {
    const { data } = yield call(fetchGet, 'get', 'downloadStart', action.payload, {
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
    USER_MANAGE_WATCHER,
    SIGNUP_WATCHER,
    ACCOUNT_DELETE_WATCHER,
    ACCOUNT_UPDATE_WATCHER,
    FILE_UPLOAD_WATCHER,
    FILE_DOWNLOAD_WATCHER,
    FILE_DOWNLOAD_START_WATCHER
  } = userConstants;
  yield takeLatest(LOGIN_WATCHER, loginEffect);
  yield takeLatest(USER_MANAGE_WATCHER, userManageEffect);
  yield takeLatest(SIGNUP_WATCHER, signupEffect);
  yield takeLatest(ACCOUNT_DELETE_WATCHER, accountDeleteEffect);
  yield takeLatest(ACCOUNT_UPDATE_WATCHER, accountUpdateEffect);
  yield takeLatest(FILE_UPLOAD_WATCHER, fileUploadEffect);
  yield takeLatest(FILE_DOWNLOAD_WATCHER, fileDownloadEffect);
  yield takeLatest(FILE_DOWNLOAD_START_WATCHER, fileDownloadStartEffect);
}
