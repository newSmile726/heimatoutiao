<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="navbar" title="登录" @click-left="toProPage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号验证码 -->
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="right-btn" size="mini" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button class="denglu" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    toProPage () {
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>
<style scoped lang="less">
// 导航栏css样式
.navbar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
//form表单css样式
.form {
  /deep/.van-field__label {
    flex: 1;
  }
  /deep/.van-field__value {
    flex: 20;
  }
  .toutiao {
    font-size: 19px;
  }
  .denglu {
    width: 347px;
    height: 44px;
    background-color: #6db4fb;
    border-radius: 5px;
    border: none;
    font-size: 15px;
  }
  .right-btn {
    background-color: #ededed;
    border-radius: 12px;
    padding: 0 10px;
    color: #666;
  }
}
</style>
