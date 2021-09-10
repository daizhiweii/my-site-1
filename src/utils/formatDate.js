// 格式化时间戳日期

export default function (timestamp, showTime = false) {
  // showTime默认为false，为true时表示要显示时分秒
  const date = new Date(+timestamp);
  // 将时间戳格式化为标准日期
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  // padStart(2, "0")保证字符串长度为2，不足2则在开头填充"0"
  const day = (date.getDate()).toString().padStart(2, "0");
  let str = `${date.getFullYear()}-${month}-${day}`;
  // 年-月-日
  if (showTime) {
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    str += ` ${hour}:${minute}:${second}`;
    // 时:分:秒
  } 
  return str;
}