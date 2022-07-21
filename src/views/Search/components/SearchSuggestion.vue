<template>
  <div>
    <van-cell v-for="(item, index) in highlighData" :key="index" @click="resultsFn">
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchList } from '@/api'
export default {
  data () {
    return {
      suggestion: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchList()
      }
    }
  },
  computed: {
    highlighData () {
      // 将搜索建议的每一项处理
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestion.map((str) => str.replace(reg, (match) => `<span style="color:red">${match}</span>`))
    }
  },
  methods: {
    async getSearchList () {
      const res = await getSearchList(this.keywords)
      if (res.data.data.options.length === 0) {
        this.$toast.fail('没有搜索建议')
      }
      this.suggestion = res.data.data.options.filter(Boolean)
    },
    resultsFn () {
      this.$parent.isShowSearchResult = true
    }
  }
}
</script>
<style scoped lang="less">
.search-icon {
  padding-top: 5px;
}
</style>
