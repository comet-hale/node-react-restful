import axios from 'axios';

exports.fetchUser = (method = 'get', url, data, headers) => axios.request({
  method,
  url: `/api/${url}`,
  data,
  headers
});

exports.fetchFile = (method = 'get', url, data, params, responseType) => axios.request({
  method,
  url: `/api/${url}`,
  responseType,
  params,
  data,
  headers: {
    authorization: localStorage.getItem('token')
  }
});
