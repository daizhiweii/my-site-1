// 获取全局设置

import request from "./request";

export async function getSetting() {
  return await request.get("/api/setting");
}