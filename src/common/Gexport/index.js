import React from 'react'
import { Button } from 'antd'
import baseURL from '../../utils/baseUrl'
import {searchJoint} from '../../utils'
// import request from '../../utils/request'
import PropTypes from 'prop-types';

class Gexport extends React.Component {
  // 导出列表那牛
  handleExport = (e)=> {
    const {url, query} = this.props
    const queryStr = searchJoint(query)
    const queryUrl = `${baseURL}${url}${queryStr}`;
    window.location.href = queryUrl;
    // console.log(this.props.query)
    // 
    // const token = localStorage.getItem('authed')
    // request({
    //   url: url,
    //   method: 'get',
    //   params: {
    //     ...query,
    //     token,
    //   }
    // }).then(res => {
    //   if (res.code === 100) {
    //     message.success('成功');
    //     // that.tableChild.sortingParameters();
    //   }
    // }).catch((err) => {
    //   // message.error(err.message)
    //   message.error('失败')
    // })
  }
  render () {
    const {btnType, btnStyle, btnText  } = this.props
    return (
      <Button type={btnType} style={btnStyle} onClick={this.handleExport}>{btnText}</Button>
    )
  }
}

Gexport.propTypes = {
  url: PropTypes.string, //导出的地址
  query: PropTypes.object, //导出的参数
  btnText: PropTypes.string, //按钮文字
  btnStyle: PropTypes.object, //按钮样式
  btnType: PropTypes.string, // 按钮类型
}

Gexport.defaultProps = {
  btnType: 'primary',
  btnText: '导出列表',
}

export default Gexport