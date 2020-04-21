import AsyncComponent from '../../../utils/asyncComponent'

const HomeTemplate = AsyncComponent(() => import('./HomeTemplate'))
const ArticleManage = AsyncComponent(() => import('./ArticleManage'))
const ArticleSort = AsyncComponent(() => import('./ArticleSort'))
export {
  HomeTemplate,
  ArticleManage,
  ArticleSort,
}