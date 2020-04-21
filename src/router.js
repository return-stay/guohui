import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import Index from './pages/User/Home'
// import GoodsList from './pages/User/Goods/GoodsList'
// import GoodsClassify from './pages/User/Goods/GoodsClassify'
// import UserManage from './pages/User/Permission/UserManage'
// import RoleManage from './pages/User/Permission/RoleManage'
// import MenuManage from './pages/User/Permission/MenuManage'
// import OrderList from './pages/User/OrderManage/OrderList'
// import ReturnGoods from './pages/User/OrderManage/ReturnGoods'
// import ProductionList from './pages/User/OrderManage/ProductManage/ProductionList'
// import ReviewManage from './pages/User/OrderManage/ProductManage/ReviewManage'
// import NotFound from './pages/NotFound'
// import SecondLevelComponent from './common/SecondLevelComponent'
// import ThirdLevelComponent from './common/ThirdLevelComponent'

import AsyncComponent from './utils/asyncComponent'
import PersonalCenter from './pages/PersonalCenter'
import Ceshi from './pages/Ceshi'

// const Home = AsyncComponent(() => import('./pages/Home'))
// const Login = AsyncComponent(() => import('./pages/Login'))
// const User = AsyncComponent(() => import('./pages/User'))
// const Index = AsyncComponent(() => import('./pages/User/Home'))
// const GoodsList = AsyncComponent(() => import('./pages/User/Goods/GoodsList'))
// const GoodsClassify = AsyncComponent(() => import('./pages/User/Goods/GoodsClassify'))
// const UserManage = AsyncComponent(() => import('./pages/User/Permission/UserManage'))
// const RoleManage = AsyncComponent(() => import('./pages/User/Permission/RoleManage'))
// const MenuManage = AsyncComponent(() => import('./pages/User/Permission/MenuManage'))
// const OrderList = AsyncComponent(() => import('./pages/User/OrderManage/OrderList'))
// const ReturnGoods = AsyncComponent(() => import('./pages/User/OrderManage/ReturnGoods'))
// const ProductionList = AsyncComponent(() => import('./pages/User/OrderManage/ProductManage/ProductionList'))
// const ReviewManage = AsyncComponent(() => import('./pages/User/OrderManage/ProductManage/ReviewManage'))
const NotFound = AsyncComponent(() => import('./pages/NotFound'))

// const SecondLevelComponent = AsyncComponent(() => import('./common/SecondLevelComponent'))
// const ThirdLevelComponent = AsyncComponent(() => import('./common/ThirdLevelComponent'))

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        requiresAuth: false
    },
    {
        path: '/login',
        component: Login,
        requiresAuth: false,
    },
    {
        path: '/ceshi',
        component: Ceshi,
        requiresAuth: false,
    },
    {
        path: '/user',
        component: User,
        requiresAuth: true, //需要登陆后才能跳转的页面
        children: [
            {
                path: '/user/home',
                pathName: 'home',
                component: Index,
                name: '首页',
                icon: 'home'
            },
        ]
    },
    {
        path: '/personalCenter',
        component: PersonalCenter,
        requiresAuth: false,
    },

    {
        path: '*',
        component: NotFound,
        requiresAuth: false,
    }
]

export default routes