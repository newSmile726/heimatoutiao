<template>
  <div>
    <!-- 头部导航按钮 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search" />
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 标签页 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in chennels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="ispopup"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <Popupeditbox
      ref="popup"
      :mychennels="chennels"
      @delmyChennels="delChennel"
      @changeActive="activeFn"
      @add-chennels="addMychennels"
    ></Popupeditbox>
  </div>
</template>
<script>
import {
  getMychennels,
  getMychennelsCal,
  setMychennelsCal,
  delMychennel,
  addMychennel
} from '@/api'
import ArticleList from './componets/ArticleList.vue'
import Popupeditbox from './componets/Popupeditbox.vue'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      chennels: []
    }
  },
  components: { ArticleList, Popupeditbox },
  created () {
    this.getMychennels()
  },
  mounted () {},
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getMychennels () {
      try {
        // 如果是离线状态就获取本地的数据 如果是登录状态就发送请求

        if (!this.isLogin) {
          const mychennels = getMychennelsCal()

          if (mychennels) {
            this.chennels = mychennels
          } else {
            const { data } = await getMychennels()
            this.chennels = data.data.channels
          }
        } else {
          const { data } = await getMychennels()
          this.chennels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('获取频道列表失败，请重试')
      }
    },
    ispopup () {
      this.$refs.popup.isShow = true
    },
    async delChennel (id) {
      this.chennels = this.chennels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMychennelsCal(this.chennels)
      } else {
        try {
          await delMychennel(id)
        } catch (error) {
          return this.$toast.fail('删除频道失败')
        }
      }
      this.$toast.success('删除频道成功')
    },
    activeFn (active) {
      this.active = active
    },
    async addMychennels (chennel) {
      this.chennels.push(chennel)
      if (!this.isLogin) {
        setMychennelsCal(this.chennels)
      } else {
        try {
          await addMychennel(chennel.id, this.chennels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style scoped lang="less">
//头部搜索
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//标签页css样式
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 33px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 100px;
      height: 41;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 16px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 33px;
  height: 41px;
  font-size: 20px;
  line-height: 41px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 99;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 46px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 46px;
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 46px - 41px - 50px);
  overflow: auto;
}
</style>
