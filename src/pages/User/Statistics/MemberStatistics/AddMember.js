import React from 'react'

import LineReactEcharts from '../../../../common/GreactEcharts/LineReactEcharts'
import TitleSearch from './TitleSearch';

export default class AddMember extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ['#ef855b', '#96cdf6'],
      chart: {
        XAxisData: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        SeriesData: [
          {
            Name: "2月新增会员",
            Data: [1, 0, 0, 2, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            Name: "1月新增会员",
            Data: [0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 6, 0, 3, 0, 2, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2, 0]
          }
        ],
        ExpandProp: null
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
        type: 'line',
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
        trigger: 'axis'
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
    
    const tdStyle = { backgroundColor: '#d9edf7', textAlign: 'center', padding: '20px 5px', border: '1px solid #ddd' }
    return (
      <div>

        <TitleSearch searchMember={this.searchMember} />

        <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>

          <LineReactEcharts getOption={this.getOption} />
        </div>

        <div style={{ marginTop: 20 }}>

          <table style={{ width: '100%', border: '1px solid #ddd' }}>

            <tbody>
              <tr>
                <td style={tdStyle}>二月新增会员： 9</td>
                <td style={tdStyle}>1月新增会员： 29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}