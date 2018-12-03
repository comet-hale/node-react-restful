import { userConstants } from '../constants';

const {
  GET_FILELISTS_WATCHER,
  FILE_UPLOAD_WATCHER,
  FILE_DOWNLOAD_WATCHER,
  FILE_UPLOAD_SUCCESS,
  SAVE_FILE_INFO
} = userConstants;

exports.uploadSuccess = successedData => ({
  type: FILE_UPLOAD_SUCCESS,
  payload: successedData
});
exports.fileUpload = uploadParams => ({
  type: FILE_UPLOAD_WATCHER,
  payload: uploadParams
});
exports.fileDownload = downloadParams => ({
  type: FILE_DOWNLOAD_WATCHER,
  payload: downloadParams
});

exports.getFileLists = () => ({
  type: GET_FILELISTS_WATCHER
});
exports.saveFileLists = fileData => ({
  type: SAVE_FILE_INFO,
  payload: fileData
});
