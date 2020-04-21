import AsyncComponent from '../utils/asyncComponent'

import {
    CouponManage,
    CouponIssue,
} from '../pages/User/Coupon'

const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const couponRouter = [
  {
    path: '/user/coupon',
    component: SecondLevelComponent,
    pathName: 'coupon',
    name: '优惠券',
    icon: 'dollar',
    redirect: '/user/coupon/manage',
    children: [
      {
        path: '/user/coupon/manage',
        pathName: 'coupon-manage',
        component: CouponManage,
        name: '优惠券管理',
      },
      {
        path: '/user/coupon/issue',
        pathName: 'coupon-issue',
        component: CouponIssue,
        name: '优惠券发放',
      },
    ]
  },
]


export default couponRouter