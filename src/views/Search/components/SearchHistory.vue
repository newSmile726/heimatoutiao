<template>
  <div>
    <van-cell-group>
      <van-cell  title="搜索历史" center>
        <template #extra>
          <div v-if="isShow" class="text">
            <span @click="clearResults">全部删除</span>
            <span @click="isShow=false">完成</span>
          </div>
          <div v-else >
            <van-icon name="delete-o" @click="isShowFn" />
          </div>
        </template>
      </van-cell>
      <van-cell v-for="(item, index) in list" :key="index" @click.prevent="resultsFn(item)" v-show="list.length!==0" >
        <template #right-icon>
          <van-icon name="cross" class="cross" v-if="isShow" @click.prevent="delReuslt(item)" />
        </template>
         <template #title >
        <span v-html="item" ></span>
      </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getSearch, removeSearch, setSearch } from '@/utils/searchList'
export default {
  data () {
    return {
      isShow: false,
      list: getSearch()
    }
  },
  components: {},
  mounted () {},
  computed: {},
  methods: {
    isShowFn () {
      this.isShow = !this.isShow
    },
    resultsFn (item) {
      this.$parent.keywords = item
    },
    clearResults () {
      this.list = []
      removeSearch()
    },
    delReuslt (item) {
      const newlist = this.list.filter(ele => ele !== item)
      this.list = newlist
      setSearch(this.list)
    }
  }
}
</script>
<style scoped lang="less">
.van-icon {
  color: #b0b2b2;
}
.text{
  font-size: 13px;
  color:#969799;
  span{
    margin: 0 5px;
  }
}
:deep(.van-icon-cross) {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid;
}
</style>
