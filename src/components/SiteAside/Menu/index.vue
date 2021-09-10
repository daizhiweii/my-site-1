<template>
  <nav class="menu-container">
  <!-- 为了语义化使用nav标签 -->
    <RouterLink 
      v-for="item in items" 
      :key="item.link"
      :to="{name: item.name}"
      :exact="item.exact"
      active-class="selected"
      exact-active-class=""
    >
    <!-- 
      1. v-for会先执行，故其中可以用item
      2. 将:herf="item.link"换为:to="item.link"再换为:to="{name: item.name}"（命名路由）
      3. 给精确匹配exact-active-class类名设为空，因为没用到
    -->
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{item.title}}</span>
    </RouterLink>
    <!-- 
      点击a元素会导致页面刷新，
      使用vue-router插件提供的<RouterLink>替代<a>可以解决这个问题，
      此时 href 应改为 to，
      它会根据vue-router的不同模式生成不同的a标签，
      如 <RouterLink to="/blog">文章</RouterLink>
      mode:hash    生成 <a href="#/blog">文章</a>
      mode:history 生成 <a href="/blog">文章</a>
      为了避免刷新页面，vue-router实际上为它添加了点击事件，
      并阻止了默认行为，在事件内部使用history api更改路径。

      使用<RouterLink>后则不需要
      :class="{
        selected: isSelected(item)
      }"
      来判断是否匹配
      它会根据浏览器当前路径与<RouterLink>生成的<a>标签的href进行匹配，
      并为<a>标签添加相应的类名
      如浏览器当前路径为/blog，<a>标签
      href="/"      当前路径以导航路径开头，匹配      
      添加class="router-link-active"类名
      href="/blog"  当前路径完全等于导航路径，精确匹配   
      添加class="router-link-active router-link-exact-active"类名
      href="/about" 不匹配 
      可以为组件<RouterLink>添加bool属性exact，将匹配规则改为：
      必须要精确匹配才能添加匹配类名router-link-active
      另外，可以通过active-class属性更改匹配router-link-active的类名，
      通过exact-active-class更改精确匹配router-link-exact-active的类名
    -->
  </nav>
</template>

<script>
import Icon from "@/components/Icon"
export default {
  components: {
    Icon
  },
  data() {
    return {
      items: [
        {
          // link: "/",
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true, 
        },
        {
          // link: "/blog",
          name: "Blog",
          title: "文章",
          icon: "blog",
          // startWith: true, 
          // 只要当前路径以link开头，当前菜单就是选中的
          exact: false, 
          // 激活状态是否要精确匹配
        },
        {
          // link: "/about",
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          // link: "/project",
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          // link: "/message",
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ]
    }
  },
  // methods: {
  //   isSelected(item) {
  //     var link = item.link.toLowerCase(); // 菜单的链接地址
  //     var curPathname = location.pathname.toLowerCase(); // 当前浏览器的访问路径
  //     if (item.startWith) {
  //       return curPathname.startsWith(link);
  //     } else {
  //       return curPathname === link;
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    display: flex;
    padding: 0 50px;
    height: 45px;
    align-items: center;
    // 侧轴方向居中
    .icon {
      width: 24px;
      font-size: 16px;
    }
    &:hover {
      color: #fff;
    }
    &.selected {
      background: darken(@words, 3%);
    }
  }
}
</style>