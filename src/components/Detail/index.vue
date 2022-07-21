<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    <div class="article-titles">
      <h1>java--String、StringBuilder、StringBuffer的解析和比较？</h1>
    </div>
    <van-cell>
      <template #icon>
        <van-image
          width="100"
          height="100"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </template>
      <template #title> 23213123 </template>
      <template #right-icon>
        <van-button>+关注</van-button>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { gatArticleDetails } from '@/api'
export default {
  name: 'Detail',
  data () {
    return {}
  },
  created () {
    this.gatArticleDetails()
    console.log(this.$route.params.id)
  },
  mounted () {},
  computed: {},
  methods: {
    async gatArticleDetails () {
      const res = await gatArticleDetails(this.$route.params.id)
      console.log(res)
    }
  }
}
</script>
<style scoped lang="less">
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
  margin: 0;
  color: #3a3a3a;
  h1 {
    font-size: 20px;
  }
}
</style>
