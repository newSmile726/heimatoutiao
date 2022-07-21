<template>
  <div class="detail-css">
    <!-- 顶部标题 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" fixed />
    <!-- 文章标题 -->
    <div class="article-titles">
      <h1>{{ articleList.title }}</h1>
    </div>
    <!-- 作者信息区域 -->
    <van-cell class="user-message" center>
      <template #icon>
        <van-image round class="vant-imgsz" :src="articleList.aut_photo" />
      </template>
      <template #title>
        <div class="vant-user">{{ articleList.aut_name }}</div>
        <div class="vant-time">{{ texts }}</div>
      </template>
      <template #right-icon>
        <van-button
          v-if="articleList.is_followed"
          round
          class="vant-follow-inle"
          @click="cancelFollowing()"
          :loading="loading"
        >
          已关注
        </van-button>
        <van-button
          v-else
          round
          class="vant-follow"
          @click="followUsers()"
          :loading="loading"
        >
          <van-icon name="plus" />
          关注
        </van-button>
      </template>
    </van-cell>
    <!-- 文章内容区域 -->
    <div class="message-size markdown-body" v-html="articleList.content"></div>
    <van-divider>正文结束</van-divider>
    <!-- 底部导航标签 -->
    <div class="footer-bar">
      <div>
        <van-button class="pinglun" round @click="Plshow = true"
          >写评论</van-button
        >
      </div>
      <div class="icons-img">
        <van-icon name="comment-o" badge="9" />
        <van-icon
          name="star-o"
          v-if="!articleList.is_collected"
          @click="CollectArticles()"
        />
        <van-icon
          name="star"
          v-else
          color="#3296fa"
          @click="CancelFavorites()"
        />
        <van-icon
          name="good-job-o"
          v-if="articleList.attitude == -1 || articleList.attitude == 0"
          @click="GiveTheThumbsUp()"
        />
        <van-icon
          name="good-job"
          v-else
          color="#3296fa"
          @click="CancelLike()"
        />
        <van-icon name="share" @click="showShare = !showShare" />
      </div>
      <!-- 评论 -->
      <van-popup v-model="Plshow" position="bottom" :style="{ height: '18%' }">
        <van-field
          v-model="messageInfo"
          rows="2"
          type="textarea"
          maxlength="50"
          :border="false"
          clearable
          placeholder="请输入留言"
          show-word-limit
        >
          <template #extra>
            <div
              class="release"
              :class="{ release1: messageInfo.length != 0 }"
            >
              发布
            </div>
          </template>
        </van-field>
      </van-popup>
      <!-- 分享 -->
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import './github-markdown.css'
import {
  gatArticleDetails,
  followUsers,
  cancelFollowing,
  CollectArticles,
  CancelFavorites,
  GiveTheThumbsUp,
  CancelLike
} from '@/api'

export default {
  name: 'Detail',
  data () {
    return {
      articleList: {},
      messageInfo: '',
      Plshow: false,
      loading: false,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  created () {
    this.gatArticleDetails()
    // console.log(this.$route.params.id)
  },
  computed: {
    texts () {
      const art = this.articleList
      const time = dayjs(art.pubdate).fromNow()
      return `${time}`
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 获取文章详情
    async gatArticleDetails () {
      const res = await gatArticleDetails(this.$route.params.id)
      // console.log(res)
      this.articleList = res.data.data
    },
    // 关注用户
    async followUsers () {
      this.loading = true
      // console.log(this.articleList.is_followed)
      await followUsers(this.articleList.aut_id)
      this.gatArticleDetails()
      this.loading = false
    },
    // 取消关注用户
    async cancelFollowing () {
      this.loading = true
      await cancelFollowing(this.articleList.aut_id)
      this.gatArticleDetails()
      this.loading = false
    },
    // 收藏文章
    async CollectArticles () {
      await CollectArticles(this.articleList.art_id)
      this.gatArticleDetails()
      this.$toast.success('操作成功')
    },
    // 取消收藏
    async CancelFavorites () {
      await CancelFavorites(this.articleList.art_id)
      this.gatArticleDetails()
      this.$toast.success('操作成功')
    },
    // 点赞
    async GiveTheThumbsUp () {
      await GiveTheThumbsUp(this.articleList.art_id)
      this.gatArticleDetails()
    },
    // 取消点赞
    async CancelLike () {
      await CancelLike(this.articleList.art_id)
      this.gatArticleDetails()
    }
  }
}
</script>
<style scoped lang="less">
.detail-css {
  position: relative;
  overflow-x: hidden;
  padding-bottom: 50px;
}
:deep(.van-nav-bar) {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.van-icon) {
  color: #fff;
}
.article-titles {
  font-size: 0.53333rem;
  padding: 8px 0.42667rem;
  margin-top: 50px;
  color: #3a3a3a;
  h1 {
    font-size: 20px;
  }
}
.user-message {
  background-color: #fff;
  padding: 0 16px;
  .vant-imgsz {
    width: 35px;
    height: 35px;
  }
  .vant-user {
    font-size: 12px;
    color: #3a3a3a;
    margin-left: 5px;
  }
  .vant-time {
    font-size: 12px;
    color: #b7b7b7;
    margin-left: 5px;
  }
  .vant-follow {
    width: 85px;
    height: 29px;
    color: #fff;
    background-color: #3296fa;
  }
  .vant-follow-inle {
    width: 85px;
    height: 29px;
    color: rgb(98, 93, 93);
    background-color: #fff;
  }
}
.message-size {
  font-size: 12px;
  padding: 10px 10px;
}
.footer-bar {
  display: flex;
  width: 375px;
  height: 44px;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  .pinglun {
    width: 141px;
    height: 23px;
    flex: 1;
    color: #aaaaaa;
    background-color: #fff;
    margin-left: 15px;
    margin-right: 30px;
  }
  .icons-img {
    width: 141px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      font-size: 20px;
      color: #86888d;
      margin-right: 30px;
    }
  }
}
.release {
  width: 40px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  padding-top: 31px;
  margin-right: -6px;
  color: #b5d1ec;
}
.release1 {

  margin-left: -8px;

  color: #6ba3d8;
}
:deep(.van-field__control) {
  background-color: #f5f7f9;
  width: 300px;
  height: 90px;
  margin-top: 5px;
}
:deep(.van-field__word-limit) {
  margin-top: -30px;
  margin-right: 40px;
}
:deep(.van-field__control) {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
