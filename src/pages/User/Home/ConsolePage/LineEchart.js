
import React from 'react'
import ReactEcharts from 'echarts-for-react';

class LineEchart extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ['#1ca5b880', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  }

  render() {
    // const { style } = this.props
    // const dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
    const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    const yMax = 500;
    const dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    const getOtionObj = {
      color: ['#1ca5b880'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'direct access',
          type: 'bar',
          barWidth: '60%',
          data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
        }
      ]
    };

    // Enable data zoom when user click bar.
    // var zoomSize = 6;
    // myChart.on('click', function (params) {
    //   myChart.dispatchAction({
    //     type: 'dataZoom',
    //     startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    //     endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    //   });
    // });

    return (
      <ReactEcharts
        option={getOtionObj}
        style={{ height: '600px' ,width: '100%'}}
        className='react_for_echarts' />
    )
  }
}


export default LineEchart