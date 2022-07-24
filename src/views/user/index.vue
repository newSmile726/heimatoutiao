<template>
  <div>
    <!-- 头部标题 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <!-- 编辑资料 -->
    <input type="file" ref="file" hidden>
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <template>
        <div>
          <van-image
            class="img-info"
            round
            :src="!!imgurl?imgurl: photonew.photo"
          />
        </div>
      </template>
    </van-cell>
    <van-popup v-model="photoshow" :style="{height:'100%'}" >
      <PhotoImg
      v-if="photoshow"
      :photo="photo"
      @close='photoshow=false'
      @updateImgurl='updateImgurlFn'
      ></PhotoImg>
      </van-popup>

    <van-cell title="昵称" is-link @click="isShow = true" v-model="editss" />
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
     v-model="gender"
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
      v-model="BirthdayMessage"
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
import { getPersonalData, editUserProfile, getUserInMy } from '@/api'
import PhotoImg from './PhotoImg'
export default {
  name: 'UserInfo',
  components: { PhotoImg },
  data () {
    return {
      photoshow: false, // 头像弹出层
      photo: '',
      photonew: {},
      imgurl: '',
      isShow: false, // 昵称弹框
      editMessage: '', // 昵称
      editss: '',
      showGender: false, // 性别弹框
      genderMessage: '', // 性别
      columns: ['男', '女'],
      BirthdayMessage: '', // 生日
      showBirthday: false, // 生日弹窗
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date()
    }
  },
  created () {
    this.getPersonalData()
    this.getUserInMy()
  },
  mounted () {
    // 调用原生属性的change事件
    this.$refs.file.addEventListener('change', (e) => {
      // e.target. 触发事件的元素
      // 图片的src能识别-图片的相对路径/绝对路径
      // base64 -> 另一种叫法 DateUrl
      const file = e.target.files[0]
      // 方法一
      // file=URL.createObjectURL(file) 将file对象转换成图片可识别的url
      // 方法二
      const fr = new FileReader(file)
      fr.readAsDataURL(file)

      fr.onload = (e) => {
        this.photo = e.target.result
        this.photoshow = true
        // 同一张图片change不会触发
        // this.$refs.file.value = ''
      }
    })
  },
  computed: {
    gender () {
      return this.genderMessage === 0 ? '男' : '女'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getUserInMy () {
      const res = await getUserInMy()
      // console.log(res)
      this.photonew = res.data.data
    },
    // 获取资料
    async getPersonalData () {
      const res = await getPersonalData()
      this.editss = res.data.data.name
      this.genderMessage = res.data.data.gender
      this.BirthdayMessage = res.data.data.birthday
      // this.photonew = res.data.data.photo
    },
    // 编辑资料
    async editUserProfile () {
      try {
        await editUserProfile(
          this.editss, this.genderMessage, this.BirthdayMessage
        )
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    // 昵称
    yesEdit () {
      this.editss = this.editMessage
      this.editUserProfile()
      this.isShow = false
      this.$toast.success('修改成功')
    },
    // 性别
    confirm (value, index) {
      this.genderMessage = index
      this.editUserProfile()
      this.showGender = false
      this.$toast.success('修改成功')
    },
    // 生日
    birthdayConfirm (value) {
      const res = dayjs(value).format('YYYY-MM-DD')
      // console.log(res)
      this.BirthdayMessage = res
      this.editUserProfile()
      this.showBirthday = false
    },
    updateImgurlFn (imgUrl) {
      this.photoshow = false
      this.imgurl = imgUrl
      // console.log(this.imgurl)
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
.van-popup--center {
 height: 100%;
 z-index: 2002;
 background-color: #333;
}
</style>
