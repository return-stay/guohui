import axios from 'axios'
import baseURL from './baseUrl'
import { getLocal } from '../utils'
import { authChangeAction } from '../store/actionCreator'
import store from '../store'

//创建axios实例
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 200000, // 请求超时时间
    // withCredentials: true // 选项表明了是否是跨域请求
})
service.interceptors.request.use(config => {
    // 请求头添加token
    if (getLocal('authed')) {
        config.headers.Authorization = `Bearer ${getLocal('authed')}`
    }
    const flag = config.loading || false
    if(flag){
        let loading
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'block'
    }
    // if(config.method === 'post' || config.method === 'POST' ) {
    //     let type = 'Content-Type'
    //     config.headers[type] = 'application/x-www-form-urlencoded'
    // }
    return config;
}, err => {
    console.log('请求失败')
    return Promise.reject(err)
})



//拦截响应
service.interceptors.response.use(config => {
    if(config.data && config.data.loading !==false){
        let loading
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'none'
    }
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})



// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 100) {
            // res.code = res.data.code
            // res.message = res.data.msg
            if(res.code === 1002) {
                localStorage.removeItem('authed')
                store.dispatch(authChangeAction(null))
            }else {
                return Promise.reject(res)
            }
        }else  {
            return response.data
        }
    },
    error => {
        const { status } = error.response
        switch (status) {
            case 401:
            store.dispatch(authChangeAction(null))
                break;
        
            default:
                break;
        }
        return Promise.reject(error)
    }
)
export default service
