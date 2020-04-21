import AsyncComponent from '../utils/asyncComponent'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const micromallsRouter = [
  {
    path: '/user/micromalls',
    component: SecondLevelComponent,
    pathName: 'micromalls',
    name: '微商城',
    icon: 'wechat',
    children: []
  },
]


export default micromallsRouter