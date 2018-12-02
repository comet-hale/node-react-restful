import { takeLatest, call, put } from 'redux-saga/effects';
// import fileDownload from 'react-file-download';
import { userConstants } from '../constants';
import axiosFetch from './axios.fetch';
import actionCreator from '../actions/file.actions';

function* fileUploadEffect(action) {
  try {
    console.log(action.payload);
    const { data } = yield call(axiosFetch.fetchUser, 'post', 'upload', action.payload, {
      authentification: localStorage.getItem('token')
    });
    if (data.success) {
      alert('Upload success!');
    } else {
      alert('Upload failed!');
    }
  } catch (e) {}
}

// fileDownload(response.data, 'profilepic.jpg');
// This will download the file in browser.

// function* fileDownloadEffect(action) {
//   try {
//     const { data } = yield call(fetchUser, 'get', 'download', action.payload, {
//       authentification: localStorage.getItem('token')
//     });
//     yield put(actionCreator.logout());
//   } catch (e) {}
// }
function* getFileListsEffect() {
  try {
    const { data } = yield call(axiosFetch.fetchUser, 'get', 'find/files', '', {
      authentification: localStorage.getItem('token')
    });
    console.log('true');
    console.log(data);
    yield put(actionCreator.saveFileLists(data));
  } catch (e) {
    console.log('error');
  }
}

// watchers
export function* fileWatchers() {
  const { FILE_UPLOAD_WATCHER, FILE_DOWNLOAD_WATCHER, GET_FILELISTS_WATCHER } = userConstants;
  yield takeLatest(FILE_UPLOAD_WATCHER, fileUploadEffect);
  // yield takeLatest(FILE_DOWNLOAD_WATCHER, fileDownloadEffect);
  yield takeLatest(GET_FILELISTS_WATCHER, getFileListsEffect);
}
