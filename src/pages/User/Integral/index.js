import AsyncComponent from '../../../utils/asyncComponent'
const IntegralManage = AsyncComponent(() => import('./IntegralManage')) //积分管理
const IntegralDetail = AsyncComponent(() => import('./IntegralManage/IntegralDetail')) 

const IntegralRule = AsyncComponent(()=> import('./IntegralRule'))
export {
    IntegralManage,
    IntegralDetail,
    IntegralRule,
}