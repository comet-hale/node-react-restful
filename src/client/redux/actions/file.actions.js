import { userConstants } from '../constants';

const {
  GET_FILELISTS_WATCHER,
  FILE_UPLOAD_WATCHER,
  FILE_DOWNLOAD_WATCHER,
  SAVE_FILE_INFO
} = userConstants;

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
