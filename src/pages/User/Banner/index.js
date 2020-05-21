import AsyncComponent from '../../../utils/asyncComponent'
const BannerManage = AsyncComponent(() => import('./BannerManage'))
const FunctionGrid = AsyncComponent(()=> import('./FunctionGrid'))
const MallFunctionGrid  = AsyncComponent(()=> import('./MallFunctionGrid'))
const Operation = AsyncComponent(()=> import('./Operation'))
const BuyItNow = AsyncComponent(()=> import('./BuyItNow'))

const HomeRecommend = AsyncComponent(() => import('./HomeRecommend'))

export {
  BannerManage,
  FunctionGrid,
  MallFunctionGrid,
  Operation,
  BuyItNow,
  HomeRecommend,
}