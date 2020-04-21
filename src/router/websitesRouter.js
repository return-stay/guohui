import AsyncComponent from '../utils/asyncComponent'
import {
  HomeTemplate,
  ArticleManage,
  ArticleSort
} from '../pages/User/Websites'
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const websitesRouter = [
  {
    path: '/user/websites',
    component: SecondLevelComponent,
    pathName: 'websites',
    name: '网站',
    icon: 'layout',
    redirect: '/user/websites/homeTemplate',
    children: [
      {
        path: '/user/websites/homeTemplate',
        pathName: 'websites-home-template',
        component: HomeTemplate,
        name: '首页模板',
      },
      {
        path: '/user/websites/articleManage',
        pathName: 'websites-article-manage',
        component: ArticleManage,
        name: '文章管理',
      },
      {
        path: '/user/websites/articleSort',
        pathName: 'websites-article-sort',
        component: ArticleSort,
        name: '文章分类',
      },
    ]
  },
]


export default websitesRouter