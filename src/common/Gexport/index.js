import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types';

class Gexport extends React.Component {
  // 导出列表那牛
  handleExport = (e)=> {}
  render () {
    return (
      <Button type={this.props.btnType} style={this.props.btnStyle} onClick={this.handleExport}>{this.props.btnText}</Button>
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