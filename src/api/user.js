// 用户模块请求封装
import request from '@/utils/request'
/**
 *  登录验证
 * @param {string} mobile  手机号
 * @param {string} code   验证码
 * @returns  promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 * 短信验证
 * @param {String} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户个人信息
 * @returns promise
 */
export const getUserInMy = () => {
  return request({
    url: '/v1_0/user'
    // headers: { Authorization: `Bearer ${store.state.user.token}` }
  })
}
/**
 *  关注用户
 * @param {string} id  用户的id
 * @returns  promise
 */
export const followUsers = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
/**
 *  取消关注用户
 * @param {string} id 用户id
 * @returns  promise
 */
export const cancelFollowing = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
/**
 *  获取用户个人资料
 * @returns  promise
 */
export const getPersonalData = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
/**
 *  编辑用户个人资料
 * @param {string} name  昵称
 * @param {string} gender  性别
 * @param {string} birthday  生日
 * @param {string} intro  个人介绍
 * @returns  promise
 */
export const editUserProfile = (name, gender, birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
}
/**
 *  上传编辑头像照片
 * @param {string}  file  图片的FOEM DATA
 * @returns  promise
 */
export const EditPhotoMaterials = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
}
