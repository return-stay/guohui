import React from 'react'
import renderRoutes from './utils/renderRoutes'
import routes from "./router.js";
import { HashRouter as Router, Switch } from "react-router-dom";
import connect from './utils/connect'
import { ConfigProvider } from 'antd';
// import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');

@connect
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            locale: zhCN,
        };
    }
    render() {
        const { locale } = this.state;
        const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置
        let authed = this.props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
        return (
            <Router>
                <Switch>
                    <ConfigProvider locale={locale}>
                        {renderRoutes(routes, authed, authPath)}
                    </ConfigProvider>
                </Switch>
            </Router>
        )
    }
}

export default App
