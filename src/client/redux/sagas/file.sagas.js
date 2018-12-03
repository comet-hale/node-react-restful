import { takeLatest, call, put } from 'redux-saga/effects';
import fileDownload from 'react-file-download';
import { userConstants } from '../constants';
import axiosFetch from './axios.fetch';
import actionCreator from '../actions/file.actions';

// File upload
function* fileUploadEffect(action) {
  try {
    const { response } = yield call(axiosFetch.fetchFile, 'post', 'upload', action.payload, '', '');
    if (response.success) {
      alert('Upload success!');
    } else {
      alert('Upload failed!');
    }
  } catch (e) {}
}

// This will download the file in browser.
function* fileDownloadEffect(action) {
  try {
    console.log(action.payload);
    const { data } = yield call(
      axiosFetch.fetchFile,
      'get',
      'download',
      '',
      action.payload,
      'blob'
    );
    fileDownload(data, action.payload.value);
  } catch (e) {}
}

// Get uploaded file list
function* getFileListsEffect() {
  try {
    const { data } = yield call(axiosFetch.fetchFile, 'get', 'find/files');
    yield put(actionCreator.saveFileLists(data));
  } catch (e) {
    console.log('error');
  }
}

// watchers
export function* fileWatchers() {
  const { FILE_UPLOAD_WATCHER, FILE_DOWNLOAD_WATCHER, GET_FILELISTS_WATCHER } = userConstants;
  yield takeLatest(FILE_UPLOAD_WATCHER, fileUploadEffect);
  yield takeLatest(FILE_DOWNLOAD_WATCHER, fileDownloadEffect);
  yield takeLatest(GET_FILELISTS_WATCHER, getFileListsEffect);
}
