import AsyncComponent from '../utils/asyncComponent'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const appsRouter = [
  {
    path: '/user/apps',
    component: SecondLevelComponent,
    pathName: 'apps',
    name: 'app',
    icon: 'appstore',
    children: []
  },
]


export default appsRouter