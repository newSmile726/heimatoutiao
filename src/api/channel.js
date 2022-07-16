import request from '@/utils/request'
export const getMychennels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
