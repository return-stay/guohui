import Index from './pages/User/Home/ConsolePage'
// import AsyncComponent from './utils/asyncComponent'
import goodsRouter from './router/goodsRouter'
import dealsRouter from './router/dealsRouter'

import shopsRouter from './router/shopsRouter'
// import memberRouters from './router/memberRouter'
// import statisticsRouter from './router/statisticsRouter'
// import systemsRouter from './router/systemsRouter'
// import websitesRouter from './router/websitesRouter'
// import distributionsRouter from './router/distributionsRouter'
import marketingRouter from './router/marketingRouter'
// import micromallsRouter from './router/micromallsRouter'
// import appsRouter from './router/appsRouter'
// import appletsRouter from './router/appletsRouter'



// import integralRouter from './router/integralRouter'
// import couponRouter from './router/couponRouter'
import bannerRouter from './router/bannerRouter'
import longhairRouter from './router/longhairRouter'
import settingRouter from './router/settingRouter'
// import Index from './pages/User/Home'
const routerDevelop = [
  {
    path: '/user/home',
    pathName: 'home',
    component: Index,
    name: '首页',
    icon: 'home',
  },
  
  ...shopsRouter,
  ...goodsRouter,
  ...dealsRouter,
  ...bannerRouter,
  // ...integralRouter,
  // ...couponRouter,

  // ...memberRouters,
  // ...statisticsRouter,
  // ...websitesRouter,
  // ...distributionsRouter,
  // ...systemsRouter,
  ...marketingRouter,
  ...longhairRouter,
  // ...micromallsRouter,
  // ...appsRouter,
  // ...appletsRouter,
  ...settingRouter,
]

export default routerDevelop