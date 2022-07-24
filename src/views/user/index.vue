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
            :src="personaData.photo"
          />
        </div>
      </template>
    </van-cell>
    <van-cell title="昵称" is-link @click="isShow = true" :value="personaData.name" />
    <van-popup v-model="isShow" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        class="edit-title"
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="isShow = false"
        @click-right="yesEdit"
      />
      <van-field
        v-model="editMessage"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </van-popup>
    <van-cell
      title="性别"
      is-link
     :value="gender"
      @click="showGender = true"
    />
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '46%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columns"
        @cancel="showGender = false"
        @confirm="confirm"
      />
    </van-popup>
    <van-cell
      title="生日"
      is-link
      :value="personaData.birthday"
      @click="showBirthday = true"
    />
    <van-popup
      v-model="showBirthday"
      position="bottom"
      :style="{ height: '46%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday = false"
        @confirm='birthdayConfirm'
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { getPersonalData } from '@/api'
export default {
  name: 'UserInfo',
  data () {
    return {
      personaData: '', // 用户个人资料
      isShow: false, // 昵称弹框
      editMessage: '',
      showGender: false, // 性别弹框
      columns: ['男', '女'],
      showBirthday: false, // 生日弹窗
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date()
    }
  },
  created () {
    this.getPersonalData()
  },
  mounted () {},
  computed: {
    gender () {
      return this.personaData.gender === 0 ? '男' : '女'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getPersonalData () {
      const res = await getPersonalData()
      this.personaData = res.data.data
    },
    // 昵称
    yesEdit () {
      this.isShow = false
    },
    // 性别
    confirm (value) {
      this.Gendermessage = value
      this.showGender = false
    },
    // 生日
    birthdayConfirm (value) {
      console.log(value)
      const res = dayjs(value).format('YYYY-MM-DD')
      this.Birthdaymessage = res
      this.showBirthday = false
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
.edit-title {
  :deep(.van-nav-bar__content) {
    background-color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #353437;
  }
}
</style>
