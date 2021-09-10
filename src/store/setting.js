// 全局设置（全局共享数据）

import {getSetting} from "@/api/setting";
import {titleController} from "@/utils";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
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
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await getSetting();
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
      if (resp.favicon) { 
      // 响应结果包括favicon（网站图标），设置favicon
        let link = document.querySelector("link[rel='shortcut icon']");
        if (link) { // 如果link存在
          return;
        }
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "images/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    }
  }
}

