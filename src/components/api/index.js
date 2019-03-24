// 设置axios路由拦截器

import axios from 'axios';
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 每次请求头中必须携带token
  const token = localStorage.getItem(token);
  // 如果存在token
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});





// 请求模块化
export const getNav = function () {
  return axios.get('static/navList.json')
}