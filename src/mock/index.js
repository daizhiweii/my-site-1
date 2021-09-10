import "./banner";
// 当后端将bannner的数据做好后，则不需要模拟banner的数据，将上行注释掉即可
import "./blog";
import "./setting";
import "./about";
import "./project";
import "./message";
import Mock from "mockjs";
Mock.setup({
  timeout: "500-1000",
  // 设置延迟为500-1000ms发送响应结果
})