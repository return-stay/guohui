import React from 'react'

import LineReactEcharts from '../../../../common/GreactEcharts/LineReactEcharts'
import TitleSearch from '../MemberStatistics/TitleSearch';

export default class TheStoreRanking extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ['#ef855b', '#96cdf6'],
      chart: {
        XAxisData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
        SeriesData: [
          {
            Name: "店铺订单量Top15    2020-02-08至2020-02-08",
            Data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        ExpandProp: ["风华电子店铺", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
      }
    }
  }

  getOption = () => {
    let chart = this.state.chart

    let seriesArr = []

    let legendData = []
    let seriesData = this.state.chart.SeriesData
    for (let i = 0; i < seriesData.length; i++) {
      seriesArr.push({
        name: seriesData[i].Name,
        type: 'bar',
        smooth: true,
        data: seriesData[i].Data,
        markPoint: {
          data: [
            { type: 'max', name: '最大值', symbolSize: 30 },
            { type: 'min', name: '最小值', symbolSize: 30 }
          ]
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        },
      })
      legendData.push(seriesData[i].Name)
    }
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function (param) {
          param = param[0];
          return [
            "店铺: " + chart.ExpandProp[param.dataIndex],
             "订单量: " + param.name + '<br size=1 style="margin: 3px 0">',
          ].join('');
        }
      },
      color: this.state.color,
      legend: {
        top: '10',
        data: legendData
      },
      grid: {
        show: true,
        top: 70,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: true,
        showTitle: false, // 隐藏默认文字，否则两者位置会重叠
        feature: {
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: chart.XAxisData,
        splitLine: {
          show: true,
        },
        axisTick: {
          alignWithLabel: true,
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 人'
        }

      },
      series: seriesArr
    }
  }

  searchMember = (data) => {
    console.log(data)
  }
  render() {

    // const tdStyle = { backgroundColor: '#d9edf7', textAlign: 'center', padding: '20px 5px', border: '1px solid #ddd' }
    return (
      <div>

        <TitleSearch searchMember={this.searchMember} />

        <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>

          <LineReactEcharts getOption={this.getOption} />
        </div>
      </div>
    )
  }
}