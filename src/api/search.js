import request from '@/utils/request'
/**
 *  搜索关键词
 * @param {string} q 搜索关键词
 * @returns promise
 */
export const getSearchList = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
/**
 *  获取搜索结果
 * @param {string} q 搜索关键词
 * @returns  promise
 */
export const getSearchResult = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: { q, per_page: 10, page }
  })
}
