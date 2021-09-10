// 19.组件混入（vue3有更好的解决办法）

// 公共的远程获取数据的代码
// 具体的组件中，需要提供一个远程获取数据的方法fetchData
export default function (defaultDataValue = null) {
  return {
    data() {
      return {
        isLoading: true,
        data: defaultDataValue,
      }
    },
    async created() {
      this.data = await this.fetchData();
      this.isLoading = false;
    }
  }
}