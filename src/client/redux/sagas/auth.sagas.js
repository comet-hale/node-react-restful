import { takeLatest, call, put } from 'redux-saga/effects';
import { userConstants } from '../constants';
import axiosFectch from './axios.fetch';
import actionCreator from '../actions/user.actions';

// workers
function* loginEffect(action) {
  try {
    const { data } = yield call(axiosFectch.fetchUser, 'post', 'user/login', action.payload, '');
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    if (localStorage.length > 0) yield put(actionCreator.updateLogin());
  } catch (e) {
    alert(e.response.data);
  }
}
function* userManageEffect() {
  try {
    const { data } = yield call(axiosFectch.fetchUser, 'get', 'user/manage', '', {
      authorization: localStorage.getItem('token')
    });
    yield put(actionCreator.userGet(data));
  } catch (e) {
    alert(e.response.data);
  }
}
function* signupEffect(action) {
  try {
    const { data } = yield call(axiosFectch.fetchUser, 'post', 'user/signup', action.payload);
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    if (localStorage.length > 0) yield put(actionCreator.updateLogin());
  } catch (e) {
    alert(e.response.data);
  }
}
function* accountDeleteEffect() {
  try {
    const { data } = yield call(
      axiosFectch.fetchUser,
      'delete',
      'user/delete',
      { username: localStorage.getItem('username') },
      {
        authorization: localStorage.getItem('token')
      }
    );
    yield put(actionCreator.logout());
  } catch (e) {}
}
function* accountUpdateEffect(action) {
  try {
    const { history, ...updateInfo } = action.payload;
    const { data } = yield call(axiosFectch.fetchUser, 'put', 'user/update', updateInfo, {
      authorization: localStorage.getItem('token')
    });
    Object.keys(data).map((key) => {
      localStorage.setItem(key, data[key]);
    });
    history.push('/');
  } catch (e) {
    alert(e.response.data);
  }
}

// watchers
export function* userWatchers() {
  const {
    LOGIN_WATCHER,
    USER_MANAGE_WATCHER,
    SIGNUP_WATCHER,
    ACCOUNT_DELETE_WATCHER,
    ACCOUNT_UPDATE_WATCHER
  } = userConstants;
  yield takeLatest(LOGIN_WATCHER, loginEffect);
  yield takeLatest(USER_MANAGE_WATCHER, userManageEffect);
  yield takeLatest(SIGNUP_WATCHER, signupEffect);
  yield takeLatest(ACCOUNT_DELETE_WATCHER, accountDeleteEffect);
  yield takeLatest(ACCOUNT_UPDATE_WATCHER, accountUpdateEffect);
}
