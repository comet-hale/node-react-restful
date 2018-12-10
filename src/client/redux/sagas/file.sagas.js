import { takeLatest, call, put } from 'redux-saga/effects';
import fileDownload from 'react-file-download';
import { userConstants } from '../constants';
import axiosFetch from './axios.fetch';
import actionCreator from '../actions/file.actions';

// File upload
function* fileUploadEffect(action) {
  try {
    const { data } = yield call(axiosFetch.fetchFile, 'post', 'upload', action.payload);
    yield put(actionCreator.uploadSuccess(data));
  } catch (e) {
    alert('Uploaded faild');
  }
}

// This will download the file in browser.
function* fileDownloadEffect(action) {
  try {
    const { data } = yield call(
      axiosFetch.fetchFile,
      'get',
      'download',
      '',
      action.payload,
      'blob'
    );
    fileDownload(data, action.payload.value);
  } catch (e) {
    alert('Downloaded faild');
  }
}

// Get uploaded file list
function* getFileListsEffect() {
  try {
    const { data } = yield call(axiosFetch.fetchFile, 'get', 'find/files');
    console.log(data);
    yield put(actionCreator.saveFileLists(data));
  } catch (e) {
    alert('Error');
  }
}

// watchers
export function* fileWatchers() {
  const { FILE_UPLOAD_WATCHER, FILE_DOWNLOAD_WATCHER, GET_FILELISTS_WATCHER } = userConstants;
  yield takeLatest(FILE_UPLOAD_WATCHER, fileUploadEffect);
  yield takeLatest(FILE_DOWNLOAD_WATCHER, fileDownloadEffect);
  yield takeLatest(GET_FILELISTS_WATCHER, getFileListsEffect);
}
