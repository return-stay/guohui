import request from '../../utils/request'
import { Login, QueryByOwenerIdAndOwnerType} from '../../config/api'
// 登陆
export function login( data) {
  return request({
    url: Login,
    method: 'post',
    data,
  })
}
// 2.获取商户支持的支付方式
export function queryByOwenerIdAndOwnerType( params) {
  return request({
    url: QueryByOwenerIdAndOwnerType,
    method: 'get',
    params,
  })
}