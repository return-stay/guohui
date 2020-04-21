import AsyncComponent from '../utils/asyncComponent'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const appletsRouter = [
  {
    path: '/user/applets',
    component: SecondLevelComponent,
    pathName: 'applets',
    name: '小程序',
    icon: 'api',
    children: []
  },
]


export default appletsRouter