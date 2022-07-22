<template>
  <div>
    <!-- 头部标题 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <!-- 编辑资料 -->
    <van-cell title="头像" is-link>
      <template>
        <div>
          <van-image
            class="img-info"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </template>
    </van-cell>
    <van-cell title="昵称" is-link @click.prevent="isShow = true">
      <template>
        <div>
          <van-popup
            v-model="isShow"
            position="bottom"
            closeable
            close-icon-position="top-left"
            :style="{ height: '50%' }"
          >
            <van-nav-bar
              title="更新昵称"
              right-text="确认"
              @click-right="onClickRight"
            />
          </van-popup>
        </div>
      </template>
    </van-cell>
    <van-cell title="性别" is-link value="女" />
    <van-cell title="生日" is-link value="1990-11-20" />
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      isShow: false
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
  .van-icon {
    color: #fff;
  }
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
.img-info {
  width: 30px;
  height: 30px;
}
</style>
