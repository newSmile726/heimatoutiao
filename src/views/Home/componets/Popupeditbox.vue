<template>
  <div>
    <!-- 弹窗 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button size="mini" round class="edit-btn">编辑</van-button>
          </van-cell>
          <!-- 我的频道 -->
          <van-grid :border="false" gutter="5px">
            <van-grid-item
              v-for="item in mychennels"
              :key="item.id"
              :text="item.name"
            >
              <template #icon><van-icon name="cross" /></template>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道"> </van-cell>
          <van-grid :border="false" gutter="5px">
            <van-grid-item v-for="item in newChannels" :key="item.id" :text="item.name" icon="plus"></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllchennels } from '@/api'
export default {
  name: 'Popupeditbox',
  data () {
    return {
      isShow: false,
      Allchennels: []
    }
  },
  created () {
    this.getAllchennels()
  },
  computed: {
    newChannels () {
      return this.Allchennels.filter((item) => {
        return !this.mychennels.find((el) => el.id === item.id)
      })
    }
  },
  props: {
    mychennels: {
      type: Array,
      required: true
    }
  },
  methods: {
    async getAllchennels () {
      const { data } = await getAllchennels()
      this.Allchennels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 50px;
  //按钮样式
  .edit-btn {
    color: red;
    padding: 0 15px;
    height: 24px;
    border: 0.02667rem solid red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  //   我的频道
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          // line-height: 0.32rem;
          z-index: 100;
        }
        .van-icon {
          font-size: 12px;
        }
      }
    }
  }
  //   推荐频道
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.25rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
