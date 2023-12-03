import axios from "axios";
import { defineAppConfig } from "ice";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log("[Request] ", config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log("[Response] ", response);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// App config, see https://v3.ice.work/docs/guide/basic/app
export default defineAppConfig(() => ({}));
