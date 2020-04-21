import AsyncComponent from '../../../utils/asyncComponent'
const BannerManage = AsyncComponent(() => import('./BannerManage'))
const FunctionGrid = AsyncComponent(()=> import('./FunctionGrid'))
const MallFunctionGrid  = AsyncComponent(()=> import('./MallFunctionGrid'))
const Operation = AsyncComponent(()=> import('./Operation'))
const BuyItNow = AsyncComponent(()=> import('./BuyItNow'))

export {
  BannerManage,
  FunctionGrid,
  MallFunctionGrid,
  Operation,
  BuyItNow,
}