// 拦截器

import axios from "axios";
import showMessage from "@/utils/showMessage";

const ins = axios.create(); 
// 创建一个axios实例，该实例的功能与axios完全相同

ins.interceptors.response.use(function (resp) {
  console.log("axios拦截器");
  if(resp.data.code !== 0) { // 有错误
    showMessage({ // 显示错误
      content: resp.data.msg, // 错误内容
      type: "error", // 错误类型
      duration: 1500, // 显示消息存在时长
    })
    return null;
  }
  return resp.data.data;
})
// 为实例ins添加一个拦截器，凡是通过实例ins得到的响应会先运行拦截器函数，
// 然后返回该函数的运行结果

export default ins;