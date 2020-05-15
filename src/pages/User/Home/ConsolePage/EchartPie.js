
import React from 'react'
import ReactEcharts from 'echarts-for-react';

class EchartPie extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  }

  render() {
    const { style } = this.props
    const getOtionObj = {
      title: {
        text: 'Weather statistics',
        subtext: 'Fictitious data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['Xiliang', 'Yizhou', 'Chongzhou', 'Jinzhou', 'Youzhou']
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {
              value: 1548,
              name: 'Youzhou',
            },
            { value: 535, name: 'Jinzhou' },
            { value: 510, name: 'Chongzhou' },
            { value: 634, name: 'Yizhou' },
            { value: 735, name: 'Xiliang' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return (
      <ReactEcharts
        option={getOtionObj}
        style={style}
        className='react_for_echarts' />
    )
  }
}


export default EchartPie