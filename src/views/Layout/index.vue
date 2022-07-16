<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar class="footer-text" route>
        <van-tabbar-item to='/ '>
            <template #icon>
                <i class="toutiao toutiao-shouye"></i>
            </template>
            首页
        </van-tabbar-item>
        <van-tabbar-item to='/video'>
            <template #icon>
                <i class="toutiao toutiao-shipin"></i>
            </template>
                视频
        </van-tabbar-item>
        <van-tabbar-item to='/qa'>
            <template #icon>
                <i class="toutiao toutiao-wenda"></i>
            </template>
                问答
        </van-tabbar-item>
        <van-tabbar-item to='/profile'>
            <template #icon>
                <i class="toutiao toutiao-wode"></i>
            </template>
                {{!!$store.state.user.token?'我的':'未登录'}}
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  created () {

  },
  mounted () {

  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scoped lang="less">
.footer-text{
    .toutiao{
        font-size: 20px;
    }
}
</style>
