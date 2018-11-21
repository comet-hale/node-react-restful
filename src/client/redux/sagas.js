import { all } from 'redux-saga/effects';
import {
  loginWatcher,
  userManageWatcher,
  signupWatcher,
  accountDeleteWatcher,
  accountUpdateWatcher
} from './authSaga';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    userManageWatcher(),
    signupWatcher(),
    accountDeleteWatcher(),
    accountUpdateWatcher()
  ]);
}
