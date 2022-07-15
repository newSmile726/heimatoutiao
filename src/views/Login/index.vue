<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="navbar" title="登录" @click-left="toProPage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号验证码 -->
    <van-form ref="form" class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field v-model="code" name="code" placeholder="请输入验证码" :rules="codeRules">
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
          v-if="isShowDoundow"
          :time="3*1000"
          format="ss s"
          @finish='isShowDoundow=false'
           />
          <van-button
          v-else
          class="right-btn"
          size="mini"
           round
           native-type="button"
           @click="sendCode"
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
// 引入请求接口
import { login, sendCode } from '@/api/user'
// 引入效验规则
import { mobileRules, codeRules } from './rules.js'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowDoundow: false
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
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (e) {
        // this.$toast.fail('登录失败')
        const status = e.response.status
        let message = '登录错误，请刷新~'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
        // status === 400 ? this.$toast.fail(e.response.data.message) : this.$toast.fail('登录错误，请刷新~')
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新重试')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        // }
      }
    },
    // 方式验证码
    async sendCode () {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowDoundow = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号不存在或格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
