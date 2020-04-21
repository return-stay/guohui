import AsyncComponent from '../../../utils/asyncComponent'
const CouponManage = AsyncComponent(() => import('./CouponManage'))
const CouponIssue = AsyncComponent(() => import('./CouponIssue'))
export {
    CouponManage,
    CouponIssue,
}