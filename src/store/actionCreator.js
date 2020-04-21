import { AUTH_CHANGE, PERMISSION_CHANGE, CURRENT_CHANGE,HEADER_CHANGE } from './actionTypes'
import { createActions } from 'redux-actions';
import { recursionRouter } from '../utils/recursion-router'
import routes from '../router'
import routerDevelop from '../routerDevelop' //开发路由
// import request from '../utils/request'
import { filterRoutes } from '../utils'
import { recursionRouterThree } from '../utils/recursion-router'

// export const doAuthChangeAction = (res) => {
//     return {
//         type:AUTH_CHANGE,
//         authStatus:res
//     }
// }
export const doAuthChangeAction = createActions(
    {
        [AUTH_CHANGE]: (res) => {
            return {
                authStatus: res
            }
        },
        [PERMISSION_CHANGE]: (permissionList, currentList, avatar, name) => {
            return {
                permissionList,
                currentList,
                avatar,
                name
            }
        },
        [CURRENT_CHANGE]: (list) => {
            return {
                currentList: list
            }
        },
        [HEADER_CHANGE]: (obj) => {
            return {
                headerObj: obj
            }
        }
    }
)

export const authChangeAction = (token) => {
    console.log(token)
    return (dispatch) => {
        const action = doAuthChangeAction.authChange(token)
        console.log(action)
        dispatch(action)
    }
}

export const permissionAction = (path) => {
    return (dispatch) => {
        // request({
        //     url: '/user/info',
        //     method: 'get',
        // })
        // .then(res =>{
        //     const allList = routes[2].children
        //     res.data.data.push('index')//把首页丢进去
        //     // const permissionList = recursionRouter(res.data.data,allList) //生产路由 
        //     const routerlist = recursionRouter(res.data.data,allList)
        //     const permissionList = routerlist.concat(routerDevelop)

        //     const defaultOpenKeys = filterRoutes(path)
        //     const currentList = recursionRouterThree(defaultOpenKeys,permissionList)
        //     const action = doAuthChangeAction.permissionChange(permissionList,currentList,res.data.avatar,res.data.name)
        //     dispatch(action)
        // })

        setTimeout(() => {
            let res = {
                code: 1,
                data: {
                    avatar: "https://randy168.com/1533262153771.gif",
                    name: "admin",
                    roles: ["admin"],
                    data: ['order-message']
                }
            }

            const allList = routes[2].children
            res.data.data.push('home')//把首页丢进去
            // const permissionList = recursionRouter(res.data.data,allList) //生产路由 
            const routerlist = recursionRouter(res.data.data, allList)
            const permissionList = routerlist.concat(routerDevelop)

            const defaultOpenKeys = filterRoutes(path)
            const currentList = recursionRouterThree(defaultOpenKeys, permissionList)
            const action = doAuthChangeAction.permissionChange(permissionList, currentList, res.data.avatar, res.data.name)
            dispatch(action)
        }, 100);
    }
}

export const currentAction = (list) => {
    return (dispatch) => {
        const action = doAuthChangeAction.currentChange(list)
        dispatch(action)
    }
}

export const headerAction = (obj) => {
    return (dispatch) => {
        const action = doAuthChangeAction.headerChange(obj)
        dispatch(action)
    }
}

