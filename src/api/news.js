import request from '@/utils/request'

/**
 *  获取频道新闻推荐列表
 * @param {Number} channelId  文章频道id
 * @param {string} timestamp  推荐页的时间戳
 * @returns  promise
 */
export const gatArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
/**
 * 获取文字详情
 * @param {number} articleId 当前文字id
 * @returns  promise
 */
export const gatArticleDetails = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
/**
 *  收藏文章
 * @param {string} id 文章的id
 * @returns  promise
 */
export const CollectArticles = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 * 取消收藏文章
 * @param {string} id  文章的id
 * @returns  promise
 */
export const CancelFavorites = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}

/**
 *  点赞
 * @param {String} id 文章的id
 * @returns  promise
 */
export const GiveTheThumbsUp = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 *  取消点赞
 * @param {string} id 文章的id
 * @returns  promise
 */
export const CancelLike = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}
