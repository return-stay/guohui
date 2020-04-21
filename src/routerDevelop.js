

import AsyncComponent from './utils/asyncComponent'
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
// import Index from './pages/User/Home'
const Index = () => AsyncComponent(()=> import('./pages/User/Home'))
const routerDevelop = [
  {
    path: '/user/home',
    pathName: 'home',
    component: Index,
    name: '首页',
    icon: 'home',
    children: [
      {
        path: '/user/home/control',
        pathName: 'home-control',
        // component: GoodsList,
        icon: 'control',
        name: '控制台',
        children: [
          {
            path: '/user/control/sale',
            pathName: 'control-sale',
            // component: GoodsList,
            name: '今日销售额',
          },
          {
            path: '/user/control/new-member',
            pathName: 'control-new-member',
            // component: GoodsList,
            name: '今日新增会员',
          },
          {
            path: '/user/index/new-store',
            pathName: 'index-new-store',
            // component: GoodsList,
            name: '今日新增店铺',
          },
        ]
      },
    ]
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
  // ...micromallsRouter,
  // ...appsRouter,
  // ...appletsRouter,
]

export default routerDevelop