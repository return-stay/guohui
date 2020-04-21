import AsyncComponent from '../../../utils/asyncComponent'

const MemberStatistics = AsyncComponent(() => import('./MemberStatistics'))
const ShopStatistics = AsyncComponent(() => import('./ShopStatistics'))
const GoodsStatistics = AsyncComponent(() => import('./GoodsStatistics'))
const DealStatistics = AsyncComponent(() => import('./DealStatistics'))

export {
  MemberStatistics,
  ShopStatistics,
  GoodsStatistics,
  DealStatistics,
}