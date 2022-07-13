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
