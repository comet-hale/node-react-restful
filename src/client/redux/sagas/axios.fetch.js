import axios from 'axios';

exports.fetchUser = (method = 'get', url, data, headers) => axios.request({
  method,
  url: `/api/${url}`,
  data,
  headers
});
