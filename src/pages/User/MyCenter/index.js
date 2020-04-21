import React from 'react'
import connect from '../../../utils/connect'
import { Menu, Icon, Dropdown } from 'antd';
import './index.less'
import { withRouter } from "react-router-dom";
import Gimage from '../../../common/Gimage'
@connect
class MyCenter extends React.Component {

  state = {
    visible: false,
  };

  visibleChange = (e) => {
    this.setState({
      visible: e
    })
  }

  userClick = (e)=> {
    this.setState({
      visible: false
    })
    this.props.history.push("/personalCenter");
  }

  logOut = () => {
    const { dispatch, authChangeAction } = this.props
    localStorage.removeItem('authed')
    dispatch(authChangeAction(null))
}
  render() {
    let { name } = this.props.state
    const menu = (
      <Menu style={{width: 160}}>
        <Menu.Item >
          <div className='user-menu' onClick={this.userClick}>
            个人中心
            <Icon type="user" />
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className='user-menu' onClick={this.logOut}>
            退出登录
            <Icon type="logout" />
          </div>
        </Menu.Item>
      </Menu>
    );
    const { visible } = this.state
    return (
      <Dropdown overlayClassName="user-style" overlay={menu} onVisibleChange={this.visibleChange}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{ color: visible ? '#08f' : '' }}>{name}</span>
          <Gimage style={{ width: 36, height: 36, borderRadius: 18, marginLeft: 10 }} src="https://tiyan.himall.kuaidiantong.cn/Storage/Shop/1/Products/2520/1_100.png" />

          <Icon style={{ marginLeft: 10 }} type={visible ? 'caret-up' : 'caret-down'} />
        </div>
      </Dropdown>
    )
  }
}

export default withRouter(MyCenter)