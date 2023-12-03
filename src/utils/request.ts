import axios from "axios";

// const request = url => {
//     (...params) => {
//         return axios()
//     }
// }
axios.interceptors.request.use((config) => {
  console.log("[request] ", config);
  return config;
});
axios.interceptors.response.use((resonse) => {
  console.log(`[response] `, resonse);
  return resonse;
});
export default axios;
