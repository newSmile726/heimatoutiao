<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="ShowSearchSuggestions"
        background="#3396fc"
      />
    </form>
    <component :is="ChooseComponent" :keywords='keywords' :isShowSearchResult='isShowSearchResult'></component>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  created () {},
  mounted () {},
  computed: {
    ChooseComponent () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch () {
      this.isShowSearchResult = true
      // console.log('正在搜索')
    },
    onCancel () {
      this.$router.go(-1)
    },
    ShowSearchSuggestions () {
      this.isShowSearchResult = false
    }
  }
}
</script>
<style scoped lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
