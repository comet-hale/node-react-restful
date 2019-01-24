import { all } from 'redux-saga/effects';
import { userWatchers } from './sagas/auth.sagas';
import { fileWatchers } from './sagas/file.sagas';

export default function* rootSaga() {
  yield all([userWatchers(), fileWatchers()]);
}
