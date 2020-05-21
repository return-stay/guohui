import AsyncComponent from '../utils/asyncComponent'

import {
  BannerManage,
  FunctionGrid,
  // MallFunctionGrid,
  HomeRecommend,
  Operation,
  BuyItNow,
} from '../pages/User/Banner'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))
const bannerRouter = [
  {
    path: '/user/banner',
    component: SecondLevelComponent,
    pathName: 'banner',
    icon: 'apartment',
    name: '插件管理',
    redirect: '/user/banner/manage',
    children: [
      {
        path: '/user/banner/manage',
        pathName: 'banner-manage',
        component: BannerManage,
        name: '广告位管理',
        icon:'notification',
      },
      {
        path: '/user/banner/functionGrid',
        pathName: 'function-grid',
        component: FunctionGrid,
        name: '金刚区管理',
        icon: 'appstore',
      },
      {
        path: '/user/banner/homeRecommend',
        pathName: 'banner-home-recommend',
        component: HomeRecommend,
        name: '首页推荐',
        icon: 'like',
      },
      {
        path: '/user/banner/operation',
        pathName: 'operation',
        component: Operation,
        name: '运营区管理',
        icon: 'deployment-unit',
        isHide: true,
      },
      {
        path: '/user/banner/buyitnow',
        pathName: 'buyitnow',
        component: BuyItNow,
        name: '一口价管理',
        icon: 'pay-circle',
        isHide: true,
      }
    ]
  },
]


export default bannerRouter