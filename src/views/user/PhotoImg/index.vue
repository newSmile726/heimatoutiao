<template>
  <div>
    <div class="imgcss">
      <img :src="photo" alt="" ref="img" />
    </div>
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="confirm">完成</span>
    </div>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { EditPhotoMaterials } from '@/api'
export default {
  name: 'PhotoImg',
  props: ['photo'],
  data () {
    return {
      imgUrl: ''
    }
  },
  created () {},
  mounted () {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  computed: {},
  methods: {
    confirm () {
      try {
        const fm = new FormData()
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          fm.append('photo', blob)
          const { data } = await EditPhotoMaterials(fm)
          this.imgUrl = data.data.photo
          //   console.log(this.imgUrl)
          this.$emit('updateImgurl', this.imgUrl)
        })
        this.$toast.success('上传成功')
      } catch (error) {
        // console.log(error)
        this.$toast.fail('上传失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.imgcss {
  width: 375px;
  height: 375px;
  transform: translateY(146px);
}
.toolbar {
  position: fixed;
  bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #fff;
  padding: 0 7.5px;
  box-sizing: border-box;
  .cancel {
    position: fixed;
    bottom: 8px;
    left: 10px;
  }
  .confirm {
    position: fixed;
    bottom: 8px;
    right: 10px;
  }
}
</style>
