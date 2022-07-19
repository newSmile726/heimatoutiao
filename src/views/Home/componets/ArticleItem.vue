<template>
  <div>
    <van-cell-group>
      <!-- 没有图片 -->
      <van-cell
        v-if="articleList.cover.type === 0"
        :title="articleList.title"
        :label="texts"
      />
      <!-- 一张图片 -->
      <van-cell
        v-if="articleList.cover.type === 1"
        :title="articleList.title"
        :label="texts"
      >
        <van-image
          width="3rem"
          height="2rem"
          :src="articleList.cover.images[0]"
        />
      </van-cell>
      <!-- 三张图片 -->
      <van-cell
        v-if="articleList.cover.type === 3"
        :title="articleList.title"
      >
      <template #label>
        <!-- 图片区域 -->
        <div class="imgs">
            <van-image
        v-for="(item,index) in articleList.cover.images"
        :key="index"
          width="3rem"
          height="2rem"
          :src="item"
        />
        </div>
        <!-- 底部信息 -->
        {{texts}}
      </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'ArticleItem',
  data () {
    return {}
  },
  props: {
    articleList: {
      type: Object,
      required: true
    }
  },
  created () {},
  mounted () {},
  computed: {
    texts () {
      const art = this.articleList
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  },
  methods: {}
}
</script>
<style scoped lang='less'>
.imgs{
    display: flex;
   :deep(.van-image) {
    margin: 4px 2px;
    }
}
</style>
