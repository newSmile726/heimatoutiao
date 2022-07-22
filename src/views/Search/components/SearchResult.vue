<template>
  <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in SearchResult" :key="item.id" @click="goDetail(item)">
          <template #title>
            <span v-html="item.title"></span>
          </template>
        </van-cell>
      </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api'
import { getSearch, setSearch } from '@/utils/searchList'
export default {
  data () {
    return {
      SearchResult: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    },
    isShowSearchResult: {
      type: Boolean,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  components: {},
  mounted () {},
  computed: {},
  methods: {
    async getSearchResult () {
      const { data } = await getSearchResult(this.keywords, this.page)
      // console.log(data)
      const res = getSearch() || []
      res.push(this.keywords)
      const arr = Array.from(new Set(res))
      setSearch(arr)
      this.SearchResult = data.data.results
      // console.log(this.SearchResult)
    },
    async onLoad () {
      this.page++
      const { data } = await getSearchResult(this.keywords, this.page)
      if (this.loading) {
        this.SearchResult.push(...data.data.results)
      }
      // 加载状态结束
      this.loading = false
      if (this.SearchResult.length === data.data.total_count) {
        this.finished = true
      }
    },
    goDetail (item) {
      const id = item.art_id
      this.$router.push({
        name: 'detail',
        params: { id }
      })
    }
  }
}
</script>
<style scoped lang="less">
.search-icon {
  padding-top: 5px;
}
</style>
