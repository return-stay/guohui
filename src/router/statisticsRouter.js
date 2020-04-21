import AsyncComponent from '../utils/asyncComponent'
import {
  MemberStatistics,
  ShopStatistics,
  GoodsStatistics,
  DealStatistics,
} from '../pages/User/Statistics'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const statisticsRouter = [
  {
    path: '/user/statistics',
    component: SecondLevelComponent,
    pathName: 'statistics',
    name: '统计',
    icon: 'line-chart',
    redirect: '/user/statistics/member',
    children: [
      {
        path: '/user/statistics/member',
        pathName: 'statistics-member',
        component: MemberStatistics,
        name: '会员统计',
      },
      {
        path: '/user/statistics/shop',
        pathName: 'statistics-shop',
        component: ShopStatistics,
        name: '店铺统计',
      },
      {
        path: '/user/statistics/goods',
        pathName: 'statistics-goods',
        component: GoodsStatistics,
        name: '商品统计',
      },
      {
        path: '/user/statistics/deal',
        pathName: 'statistics-deal',
        component: DealStatistics,
        name: '交易统计',
      },
    ]
  },
]


export default statisticsRouter