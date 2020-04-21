import React from 'react'
import ReactEcharts from 'echarts-for-react';

import './index.less'
export default class PieReactEcharts extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  }

  dataValueSun = (data) => {
    let sun = 0
    for (let i = 0, len = data.length; i < len; i++) {
      sun += data[i].value
    }

    return sun
  }

  render() {
    const { data, getOtion, style, legend } = this.props
    const { color } = this.state
    const getOtionObj = getOtion(this)
    const dataSun = this.dataValueSun(data)
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: legend.top || 20, left: legend.left || 20, zIndex: 100 }}>
          <h3>{dataSun}人</h3>
          {
            data.map((item, index) => {
              return (
                <div key={index} className="legend">
                  <span className="legend-span legend-icon" style={{ backgroundColor: color[index] }}></span>
                  <span className="legend-span legend-name">{item.name}</span>
                  <span className="legend-span legend-value">{item.value}</span>
                </div>
              )
            })
          }
        </div>
        {
          getOtionObj && <ReactEcharts
            option={getOtionObj}
            style={{ height: style.height || '350px', width: style.width || '1000px' }}
            className='react_for_echarts' />
        }
      </div>
    )
  }
}