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
