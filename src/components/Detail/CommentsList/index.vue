<template>
  <!-- 评论区区域 -->
  <div class="Comment-area">
    <van-cell-group>
      <van-cell
        :title="item.aut_name"
        v-for="(item,index) in comments"
        :key="index"
      >
        <template #icon>
          <van-image class="touxiang-img" round :src="item.aut_photo" />
        </template>

        <template #default>
          <div class="txt">
            <van-icon
              v-if="item.is_liking"
              name="good-job"
              color="#3296fa"
              @click="onLikeComments(item)"
            />
            <van-icon
              name="good-job-o"
              color="#5d5d5e"
              v-else
              @click="LikeComments(item)"
            />{{ item.like_count === 0 ? '赞' : item.like_count }}
          </div>
        </template>

        <template #label>
          <p class="message-Info">{{ item.content }}</p>
          <div class="message-footers">
            <p class="time">{{ comment(item.pubdate) }}</p>
            <van-button
              class="btn"
              size="mini"
              round
              type="default"
              @click="showFn(item)"
              >回复{{ item.reply_count }}</van-button
            >
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 回复区域 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <van-nav-bar title="暂无回复"> </van-nav-bar>
      <van-cell
        ref="popups"
        :title="results.aut_name"
      >
        <template #icon>
          <van-image class="touxiang-img" round :src="results.aut_photo" />
        </template>

        <template #default>
          <div class="txt">
            <van-icon
              v-if="results.is_liking"
              name="good-job"
              color="#3296fa"
              @click="onLikeComments(results)"
            />
            <van-icon
              v-else
              name="good-job-o"
              color="#5d5d5e"
              @click="LikeComments(results)"
            />{{ results.like_count === 0 ? '赞' : results.like_count }}
          </div>
        </template>

        <template #label>
          <p class="message-Info">{{ results.content }}</p>
          <div class="message-footers">
            <p class="time">{{ comment(results.pubdate) }}</p>
            <van-button class="btn" size="mini" round type="default"
              >回复{{ results.reply_count }}</van-button
            >
          </div>
        </template>
      </van-cell>
      <div class="spaninfo">全部回复</div>
      <van-cell :title="item.aut_name"  v-for='item in resultss'
        :key="item.end_id">
        <template #icon>
          <van-image class="touxiang-img" round :src="item.aut_photo" />
        </template>

        <template #default>
          <div class="txt">
            <van-icon
              v-if="item.is_liking"
              name="good-job"
              color="#3296fa"
              @click="onLikeComments(item)"
            />
            <van-icon
              name="good-job-o"
              v-else
              color="#5d5d5e"
              @click="LikeComments(item)"
            />{{ item.like_count === 0 ? '赞' : item.like_count }}
          </div>
        </template>

        <template #label>
          <p class="message-Info">{{ item.content }}</p>
          <div class="message-footers">
            <p class="time">{{ comment(item.pubdate) }}</p>
            <van-button class="btn" size="mini" round type="default"
              >回复{{ item.reply_count }}</van-button
            >
          </div>
        </template>
      </van-cell>

      <van-divider class="nullmessage">没有更多了</van-divider>
      <!-- 底部评论按钮 -->
      <van-nav-bar class="navbar">
        <template #title>
          <van-button round @click="aplyshow = true">评论</van-button>
        </template>
      </van-nav-bar>
    </van-popup>
    <van-popup v-model="aplyshow" position="bottom" class="popUp">
      <van-field
        v-model="aplyvalue"
        rows="2"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        @input="inputFn"
      >
        <template #extra>
          <van-button
            size="small"
            class="submitBtn"
            :disabled="isdisabeld"
            @click="Submit"
            >发布</van-button
          >
        </template>
      </van-field>
    </van-popup>
  </div>
</template>
<script>
import {
  CommentListApi,
  CommentOnTheArticle,
  LikeComments,
  onLikeComments
} from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  name: '',
  data () {
    return {
      aplyvalue: '',
      isdisabeld: true, // 发布按钮禁用状态
      aplyshow: false,
      comid: '', // 回复弹层按钮
      show: false,
      comments: [], // 评论列表
      results: {},
      resultss: [] // 回复数据列表
    }
  },
  props: {
    newcontent: {
      type: Object,
      required: true
    }
  },
  created () {
    this.CommentListApi() // 获取评论列表
  },
  watch: {
    newcontent: {
      deep: true,
      handler () {
        this.comments.unshift(this.newcontent.new_obj)
      }
    }
  },
  computed: {
    comment () {
      return (pubdate) => {
        return dayjs(pubdate).fromNow()
      }
    }
  },
  methods: {
    // 控制弹层  获取回复页面数据
    async showFn (item) {
      this.show = true
      this.results = item // 当前评论
      const res = await CommentListApi('c', item.com_id)
      // 获取新回复数据
      this.resultss = res.data.data.results
      this.comid = item.com_id
    },
    // 获取评论列表
    async CommentListApi () {
      const id = this.$route.params.id
      const res = await CommentListApi('a', id)
      // console.log(res)
      this.comments = res.data.data.results
    },
    // 改变发布按钮状态
    inputFn () {
      this.isdisabeld = false
      if (this.aplyvalue.length === 0) {
        this.isdisabeld = true
      }
    },
    // 发布回复评论
    async Submit () {
      try {
        const artid = this.$router.currentRoute.params.id
        const { data } = await CommentOnTheArticle(
          this.comid,
          this.aplyvalue,
          artid
        )
        this.aplyvalue = '' // 清空输入框
        this.isdisabeld = true // 禁用按钮状态
        // console.log(data.data.new_obj)  追加到回复列表数组
        const aplyList = data.data.new_obj
        this.resultss.push(aplyList)
        this.$toast.success('发布成功')
        this.aplyshow = false // 收起弹出层
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    },
    // 对文章或者评论点赞
    async LikeComments (item) {
      await LikeComments(item.com_id)
      item.is_liking = !item.is_liking
    },
    // 取消对文章或者评论点赞
    async onLikeComments (item) {
      await onLikeComments(item.com_id)
      item.is_liking = !item.is_liking
    }
  }
}
</script>
<style scoped lang="less">
//评论区css样式
.Comment-area {
  :deep(.van-cell) {
    padding: 3px 15px;
  }
  .touxiang-img {
    width: 36px;
    height: 36px;
    margin-right: 8px;
  }
  .txt {
    color: #333333;
    .van-icon {
      margin-right: 5px;
    }
  }
  .message-Info {
    font-size: 14px;
    color: #222222;
  }
  .message-footers {
    display: flex;
    .time {
      font-size: 12px;
      color: #222222;
      margin-right: 12px;
    }
    :deep(.van-button) {
      margin-top: 9px;
      width: 67.5px;
      height: 24px;
    }
  }
}
//回复区域css样式
.van-nav-bar__content {
  .van-nav-bar__title {
    color: #323233;
  }
  :deep(.van-icon) {
    color: #c0b9b9;
  }
}

.spaninfo {
  width: 375px;
  height: 44px;
  padding: 10px 16px;
  font-size: 14px;
}
//没有更多了
.nullmessage {
  margin-bottom: 90px;
}
//底部按钮
.navbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 375px;
  height: 51px;
  .van-button {
    margin-top: 5px;
    width: 320px;
    height: 40px;
    background-color: #fff;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #333333;
  }
  .van-button--default {
    border: 0.02667rem solid #f3f5f7;
  }
}
//评论弹出层css样式
.popUp {
  height: 120px;
  :deep(.van-field__value) {
    margin-top: 7px;
    width: 298px;
    height: 88px;
    background-color: #f5f7f9;
    .van-field__control {
      padding: 10px 16px 0;
    }
    .van-field__word-limit {
      //  padding: 0 10px;
      width: 95%;
    }
  }
  .submitBtn {
    margin-top: 34px;
    margin-right: -0.23333rem;
    margin-left: 0.23333rem;
    color: #6ba3d8;
    border: unset;
    font-size: 0.37333rem;
  }
}
</style>
