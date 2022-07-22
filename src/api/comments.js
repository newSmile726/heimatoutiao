// 评论模块请求封装
import request from '@/utils/request'
/**
 *  获取评论列表
 * @param {string} type 评论类型
 * @param {string} source  源id，文章id或评论id
 * @returns  promise
 */
export const CommentListApi = (type, source) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: { type, source }
  })
}
/**
 *  对文章进行评论
 * @param {string} target  评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {string} content  评论内容
 * @param {string} artid 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns  promise
 */
export const CommentOnTheArticle = (target, content, artid) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artid
    }
  })
}
/**
 *  对文章或者回复点赞
 * @param {string} target 评论id
 * @returns  promise
 */
export const LikeComments = (target) => {
  return request({
    url: '/v1_0/comment/likings ',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消对文章的回复或者点赞
 * @param {string} id 评论或者文章id
 * @returns  promise
 */
export const onLikeComments = (id) => {
  return request({
    url: `/v1_0/comment/likings/${id}`,
    method: 'DELETE'
  })
}
