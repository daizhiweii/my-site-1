// 首页标语（基本不变动，存到数据仓库以免每次都要获取）

import {getBanners} from "@/api/banner";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchBanner(ctx) {
      if (ctx.state.data.length) { 
        return; // data有值return，避免重新请求数据
      }
      ctx.commit("setLoading", true);
      const resp = await getBanners();
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    }
  }
}