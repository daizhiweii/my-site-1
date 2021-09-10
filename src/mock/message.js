import Mock from "mockjs";
import qs from "querystring";

// 提交留言
Mock.mock("/api/message", "post", {
  code: 0,
  msg: "",
  data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1, 10)",
    createDate: Date.now(),
    "avatar|1": [
      "https://iknow-pic.cdn.bcebos.com/d788d43f8794a4c2d0b5cf5409f41bd5ad6e393e",
      "https://iknow-pic.cdn.bcebos.com/43a7d933c895d1436b21cf5c74f082025aaf077d",
      "https://iknow-pic.cdn.bcebos.com/b8014a90f603738d48d3275db41bb051f819ec30",
      "https://iknow-pic.cdn.bcebos.com/37d12f2eb9389b501056cb2d8235e5dde7116e27",
    ]
  }
})

// 留言板
Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function (options) {
  const query = qs.parse(options.url);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 52,
      [`rows|${query.limit || 10}`]: [
        {
          id: "@guid",
          nickname: "@cname",
          content: "@cparagraph(1, 10)",
          createDate: Date.now(),
          "avatar|1": [
            "https://iknow-pic.cdn.bcebos.com/d788d43f8794a4c2d0b5cf5409f41bd5ad6e393e",
            "https://iknow-pic.cdn.bcebos.com/43a7d933c895d1436b21cf5c74f082025aaf077d",
            "https://iknow-pic.cdn.bcebos.com/b8014a90f603738d48d3275db41bb051f819ec30",
            "https://iknow-pic.cdn.bcebos.com/37d12f2eb9389b501056cb2d8235e5dde7116e27",
          ]
        }
      ]
    }
  })
})