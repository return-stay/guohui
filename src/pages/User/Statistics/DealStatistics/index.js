import React from 'react'
import { Popover, Icon } from 'antd'
import LineReactEcharts from '../../../../common/GreactEcharts/LineReactEcharts'

import TitleSearch from '../GoodsStatistics/TitleSearch'
import './index.less'
export default class DealStatistics extends React.Component {

  searchMember = (data) => {
    console.log(data)
  }
  getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },

      series: [
        {
          name: '漏斗图',
          type: 'funnel',
          left: '10%',
          top: 60,
          //x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 60, name: '访问' },
            { value: 40, name: '咨询' },
            { value: 20, name: '订单' },
          ]
        }
      ]
    }
  }

  getBottomOption = () => {
    return {
      grid: {
        bottom: 80
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#505765'
          }
        },
        formatter: (param) => {
          let paramDom = param.map(item => {
            return `<div>${item.seriesName}: ${item.value}</div>`
          })
          let str = paramDom.join('')
          console.log(str)
          return str
        }
      },
      legend: {
        data: ['付款金额', '付款人数', '付款件数', '下单转化率', '付款转化率', '成交转化率'],
        bottom:  10,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: false },
          data: [
            '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00',].map(function (str) {
              return str.replace(' ', '\n');
            })
        }
      ],
      yAxis: [
        {
          name: '数量',
          type: 'value',
          max: 500,
        },
        {
          name: '转化率',
          max: 100,
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        }
      ],
      series: [
        {
          name: '付款金额',
          type: 'line',
          animation: false,
          lineStyle: {
            width: 1
          },
          markArea: {
            silent: true,
            data: [[{
              xAxis: '2009/9/12\n7:00'
            }, {
              xAxis: '2009/9/22\n7:00'
            }]]
          },
          data: [
            97, 96, 196, 195, 195, 194, 194, 194, 194, 194]
        },
        {
          name: '付款人数',
          type: 'line',
          animation: false,
          lineStyle: {
            width: 1
          },
          markArea: {
            silent: true,
            data: [[{
              xAxis: '2009/9/12\n7:00'
            }, {
              xAxis: '2009/9/22\n7:00'
            }]]
          },
          data: [
            197, 196, 196, 195, 195, 194, 194, 194, 194, 194]
        },
        {
          name: '付款件数',
          type: 'line',
          animation: false,
          lineStyle: {
            width: 1
          },
          markArea: {
            silent: true,
            data: [[{
              xAxis: '2009/9/12\n7:00'
            }, {
              xAxis: '2009/9/22\n7:00'
            }]]
          },
          data: [
            197, 196, 196, 195, 195, 194, 194, 194, 194, 194]
        },
        {
          name: '下单转化率',
          type: 'line',
          animation: false,
          lineStyle: {
            width: 1
          },
          markArea: {
            silent: true,
            data: [[{
              xAxis: '2009/9/12\n7:00'
            }, {
              xAxis: '2009/9/22\n7:00'
            }]]
          },
          data: [
            197, 196, 196, 195, 195, 194, 194, 194, 194, 194]
        },
        {
          name: '付款转化率',
          type: 'line',
          animation: false,
          lineStyle: {
            width: 1
          },
          markArea: {
            silent: true,
            data: [[{
              xAxis: '2009/9/12\n7:00'
            }, {
              xAxis: '2009/9/22\n7:00'
            }]]
          },
          data: [
            197, 196, 196, 195, 195, 194, 194, 194, 194, 194]
        },
        {
          name: '成交转化率',
          type: 'line',
          yAxisIndex: 1,
          animation: false,
          lineStyle: {
            width: 1
          },
          markArea: {
            silent: true,
            data: [
              [{
                xAxis: '2009/9/10\n7:00'
              }, {
                xAxis: '2009/9/20\n7:00'
              }]
            ]
          },
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
          ]
        }
      ]
    }
  }
  render() {
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (<div style={{ padding: 20, width: 520 }}>
      <h5>温馨提示：</h5>
      <ul>
        <li style={listStyle}>
          <span style={{ color: '#747474' }}>统计了时间段内新增会员数的走势和与前一时间段的对比。</span>
        </li>

        <li style={listStyle}>
          <div style={{ color: '#747474' }}>统计了时间段内不同地区的下单量/下单金额。</div>
        </li>
      </ul>
    </div>)
    return (
      <div className="ds-box">

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px 20px' }}>
          <TitleSearch
            searchMember={this.searchMember}
          />


          <div>
            <Popover content={content} placement="leftBottom">
              <Icon type="question-circle" style={{ color: '#ccc', cursor: 'pointer' }} />
            </Popover>

            <span style={{ color: '#2481d1', cursor: 'pointer' }} onClick={this.enterData}>
              <Icon type="vertical-align-bottom" style={{ margin: '0 5px 0 10px', fontSize: 20 }} />导出数据
                </span>

          </div>
        </div>

        <div className="chart-box">
          <div >
            <div className="chart_list">
              <div className="chart_list_cell">
                <i className="gd01"></i>
                <span>浏览量</span>
                <b>292</b>
              </div>
            </div>
            <div className="chart_list">
              <div className="chart_list_cell">
                <i className="gd02"></i>
                <span>下单人数</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <span>订单数</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <span>下单件数</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <span>下单金额</span>
                <b>292</b>
              </div>
            </div>
            <div className="chart_list">
              <div className="chart_list_cell">
                <i className="gd03"></i>
                <span>付款人数</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <i className="gd03"></i>
                <span>付款订单数</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <i className="gd03"></i>
                <span>付款件数</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <i className="gd03"></i>
                <span>付款金额</span>
                <b>292</b>
              </div>
              <div className="chart_list_cell">
                <i className="gd03"></i>
                <span>客单价</span>
                <b>292</b>
              </div>

            </div>
          </div>
          <LineReactEcharts
            getOption={this.getOption}
            style={{ height: '280px', width: '400px', position: 'absolute', left: '600px' }}
          />
        </div>


        <div style={{ padding: 50 }}>
          <LineReactEcharts
            getOption={this.getBottomOption}
            style={{ height: '420px', width: '800px', }}
          />
        </div>
      </div>
    )
  }
}