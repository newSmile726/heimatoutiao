<template>
  <div>
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNext" success-text="刷新成功">
      <van-list
        @load="loadNext"
        finished-text="没有更多了"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleList="item"
          @click.native="goDetail(item.art_id)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { gatArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      pretimestamp: 0,
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created () {
    this.gatArticleList()
  },
  mounted () {},
  computed: {},
  methods: {
    async gatArticleList () {
      try {
        const { data } = await gatArticleList(this.id, +new Date())
        this.pretimestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取数据失败，请刷新重试')
        }
      }
    },
    async loadNext () {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error()
        // } 错误测试
        const { data } = await gatArticleList(this.id, this.pretimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 更新第n页数据时间戳
        this.pretimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    },
    goDetail (id) {
      this.$router.push({
        name: 'detail',
        params: { id }
      })
    }
  }
}
</script>
<style scoped></style>
