

const proxyTargetMap = {
    prod: '/api',
    // randy: 'http://39.97.231.232:8807',
    randy: 'http://120.27.62.181:8807',
    // randy: 'https://api.sczxpm.com/admin',
    peter: '/peter'
}
const API_TYPE = process.env.API_TYPE?process.env.API_TYPE:'randy'
// const baseUrl = process.env.NODE_ENV === 'production' ? 'https://icouncil.jindanke.cn/admin' : proxyTargetMap[API_TYPE]
let baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.sczxpm.com/admin' : proxyTargetMap[API_TYPE]

const WindowLocation = window.document.location

if(WindowLocation.pathname === '/testcms/') {
    baseUrl = 'https://icouncil.jindanke.cn/admin'
}
export default baseUrl