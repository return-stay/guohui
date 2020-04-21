import React from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import './index.less'
import NotFound from '../NotFound'
import connect from '../../utils/connect'
import MyCenter from './MyCenter'
import { getMenuItem, filterRoutes } from '../../utils'
import { Layout, Menu, Icon, Tooltip } from 'antd'
import logo from '../../asset/login/logo.png'
import logo_text_zh from '../../asset/login/logo_text_zh.png'
// import logo_text_en from '../../asset/login/logo_text_en.png'
// import { recursionRouterTwo } from '../../utils/recursion-router'
const { Header, Content, Sider } = Layout

@connect
class User extends React.Component {
    state = {
        collapsed: false,
        list: [123],
        openKeys: ['/user/goods'],
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    getBreadList = (path) => {
        const pathList = path.slice(1).split("/")
        return pathList.map((item, index) => {
            return {
                name: item,
                path: index > 0 ? `/${pathList[index - 1]}/${item}` : `/${item}`
            }
        })
    }
    logOut = () => {
        const { dispatch, authChangeAction } = this.props
        localStorage.removeItem('authed')
        dispatch(authChangeAction(null))
    }

    componentDidMount() {
        const path = this.props.location.pathname
        const { dispatch, permissionAction, headerAction } = this.props
        let authed = this.props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
        if (authed && this.props.state.permissionList.length === 1) {
            dispatch(permissionAction(path))
        }
        dispatch(headerAction({ parent: '首页', parentPath: '', current: '', currentPath: '' }))

    }
    componentDidUpdate(prevProps, prevState) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        //默认进入子组件index
        if (this.props.location.pathname === '/user') {
            return (
                <Redirect path="/user" exact={true} to={{ pathname: '/user/home' }} />
            )
        }
        const { permissionList } = this.props.state
        const path = this.props.location.pathname
        const defaultOpenKeys = filterRoutes(path)
        // const breadList = recursionRouterTwo(defaultOpenKeys, permissionList)
        // console.log(defaultOpenKeys)
        return (
            <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>

                <LeftMeun defaultOpenKeys={defaultOpenKeys} collapsed={this.state.collapsed} />
                {/* <Sider trigger={null} collapsible style={{ height: '100vh', overflow: 'auto' }} width={200} className="sider-custom" collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        {
                            this.state.collapsed ?
                                <>
                                    <p>收藏</p>
                                    <p>在线</p>
                                </> : <img src={logo} alt="logo" />
                        }
                    </div>
                    <Menu onClick={this.menuClick} theme="dark" defaultOpenKeys={defaultOpenKeys} selectedKeys={[path]} mode="inline">
                        {
                            getMenuItem(permissionList)
                        }
                    </Menu>
                </Sider> */}
                <Layout style={{ height: '100vh', paddingTop: '64px', overflow: 'auto', position: 'relative', paddingBottom: '40px' }}>
                    <Header className="header-style">
                        {/* <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        /> */}

                        <div></div>

                        {/* <div className="header-middle">
                            <Link to="/user/ceshi" className="header-middle-item" ><Icon type='appstore' /> 测试头功能</Link>
                        </div> */}

                        <MyCenter userInfo></MyCenter>
                    </Header>
                    <Content>
                        {/* <div style={{ background: '#fff', borderTop: '1px solid #ccc',paddingLeft: 28 }}>
                            <Breadcrumb style={{ marginLeft: '20px', height: 64, lineHeight: '64px' }}>
                                {
                                    getBreadItem(breadList)
                                }
                            </Breadcrumb>
                            {
                                headerObj && <>
                                    <p style={{padding: '10px 0', marginBottom: 0}}>{headerObj.parent}</p>

                                    {headerObj.current && <h2 style={{fontSize: 20, paddingBottom: 20}}>{headerObj.current}</h2>}
                                </>
                            }
                        </div> */}
                        <div className="user-cont">
                            <Switch>
                                {permissionList.map((value, key) => {
                                    return (
                                        <Route
                                            routes={value}
                                            key={key}
                                            exact={value.exact ? true : false}
                                            path={value.path}
                                            component={value.component}
                                            list={this.state.list}
                                        />
                                    );
                                })}
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default User


@connect
class LeftMeun extends React.Component {
    constructor() {
        super()
        this.state = {
            actionMenuPath: '',
            menuChild: [],
            collapsed: false,
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed)
        this.setState({ collapsed });
    };

    actionMenu = () => {
        const { permissionList } = this.props.state
        const { defaultOpenKeys } = this.props
        let arr = []
        for (let i = 0; i < permissionList.length; i++) {
            if (permissionList[i].path === defaultOpenKeys[0]) {
                arr = permissionList[i].children
            }
        }
        return arr
    }
    render() {
        const { permissionList } = this.props.state
        const { defaultOpenKeys } = this.props
        const menuChild = this.actionMenu()
        console.log(menuChild)
        const { collapsed } = this.state
        return (
            <div className="menu-box" style={{ display: 'flex' }}>

                <div className="left-menu-box">
                    <div className="logo-text">
                        <img src={logo_text_zh} alt="logo" />
                    </div>
                    {
                        permissionList.map((item, index) => {
                            return <Tooltip placement="right" title={item.name} key={index}>
                                <Link to={item.redirect || item.path}
                                    className={defaultOpenKeys[0] === item.path ? 'menu-prent menu-prent-action' : 'menu-prent'}
                                    data-path={item.path}
                                >
                                    {
                                        item.icon ? <Icon type={item.icon} style={{ fontSize: 26 }} /> : item.name
                                    }

                                </Link>
                            </Tooltip>
                        })
                    }
                </div>
                <div className="logo">
                    {/* {
                            collapsed ?
                                <>
                                    <p>收藏</p>
                                    <p>在线</p>
                                </> : <img src={logo} alt="logo" />
                        } */}
                    <img src={logo} alt="logo" />
                </div>

                {
                    (menuChild && menuChild.length >0) && <Sider theme="light" collapsible style={{ height: '100vh', overflow: 'auto' }} width={200} className="sider-custom" collapsed={collapsed} onCollapse={this.onCollapse}>

                    <Menu theme="light" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={[defaultOpenKeys[1]]} style={{ paddingTop: 70, borderRight: 'none' }}>
                        {
                            menuChild && getMenuItem(menuChild)
                        }
                    </Menu>
                </Sider>
                }
                
            </div>

        )
    }
}
