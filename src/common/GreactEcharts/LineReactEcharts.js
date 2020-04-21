import React from 'react'
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import './index.less'
class LineReactEcharts extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  }

  render() {
    const { getOption, style } = this.props
    const getOtionObj = getOption(this)
    return (
      <ReactEcharts
        option={getOtionObj}
        style={style}
        className='react_for_echarts' />
    )
  }
}


LineReactEcharts.propTypes = {
  style: PropTypes.object
}

LineReactEcharts.defaultProps = {
  style: {
    height: '350px',
    width: '1000px'
  }
}

export default LineReactEcharts