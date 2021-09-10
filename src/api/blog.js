import request from "./request";

/**
 * 分页获取博客
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
  return await request.get("/api/blog", {
    params: {
      page,
      limit,
      categoryid,
    },
  });
  // 第二个参数为axios的配置项，会拼接到请求地址中，
  // 如/api/blog?page=2&limit=20&categoryid=3
}

/**
 * 获取所有博客分类
 */
export async function getBlogCategories() {
  return await request.get("/api/blogtype");
}

/**
 * 获取单个博客
 */
export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

/**
 * 获取提交评论后返回的数据
 * @param {评论信息} commentInfo // 包括nickname、content、blogId，详见接口文档
 * @returns 
 */
export async function postComment(commentInfo) {
  return await request.post("/api/comment", commentInfo);
}

/**
 * 获取分页评论
 */
export async function getComments(blogid, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: {
      blogid,
      page,
      limit
    }
  })
}