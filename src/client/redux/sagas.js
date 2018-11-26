import { all } from 'redux-saga/effects';
import { userWatchers } from './authSaga';

export default function* rootSaga() {
  yield all([userWatchers()]);
}
