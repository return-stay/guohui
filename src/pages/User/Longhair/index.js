import AsyncComponent from '../../../utils/asyncComponent'
// const LonghairList = AsyncComponent(() => import('./LonghairList')) //添加商品
const UserManage = AsyncComponent(()=> import('./UserManage'))
export {
  // LonghairList,
  UserManage,
}