// 可以使用tree shaking优化vuex打包体积，需要使用具名导入
// vue2和vue-router内容都在构造函数上，无法具名导入，故无法使用tree shaking进行优化
// vue3可以使用tree shaking
import Vue from "vue";
// import Vuex from "vuex";
import {Store, install} from "vuex";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";
// Vue.use(Vuex);
// 使用cdn优化
if (!window.Vuex) { 
  // window.Vuex不存在，说明不是用cdn传统方式引入，需要注册插件（详见public/index.html）
  install(Vue);
}
// const store = new Vuex.Store({ xxx })
const store = new Store({
  modules: {
    banner,
    setting,
    about,
    project,
  },
  strict: true,
})
export default store;