import React from 'react'
import './index.less'
import { Radio, Icon } from 'antd'
import jieyu from '../../../../asset/shops/jieyu.png'
import daijiesuan from '../../../../asset/shops/jieyu.png'
import yijiesuan from '../../../../asset/shops/jieyu.png'


import LineReactEcharts from '../../../../common/GreactEcharts/LineReactEcharts'
export default class FinancialOverview extends React.Component {
  constructor() {
    super()
    this.state = {
      dateRadioValue: 1,
      chart: {
        XAxisData: ["01/30", "01/31", "02/01", "02/02", "02/03", "02/04", "02/05"],
        SeriesData: [
          {
            Name: "交易额走势图",
            Data: [0, 0, 0, 0, 216.34, 0, 0]
          }
        ],
        ExpandProp: [
          "2020/1/30 0:00:00的销售额为:0",
          "2020/1/31 0:00:00的销售额为:0",
          "2020/2/1 0:00:00的销售额为:0",
          "2020/2/2 0:00:00的销售额为:0",
          "2020/2/3 0:00:00的销售额为:216.34",
          "2020/2/4 0:00:00的销售额为:0",
          "2020/2/5 0:00:00的销售额为:0",
        ],
      }
    }
  }
  dateRadioChange = (e) => {
    let value = e.target.value
    this.setState({
      dateRadioValue: value,
    })
  }

  getOption = () => {
    let chart = this.state.chart
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: [chart.SeriesData[0].Name,]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: chart.XAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: chart.SeriesData[0].Name,
          type: 'line',
          stack: '总量',
          data: chart.SeriesData[0].Data,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        },
      ]
    }
  }

  typeCallback = (e) => {
    let type = e.currentTarget.getAttribute('data-type')
    console.log(type)
    this.props.typeCallback(type)
  }
  render() {
    const { dateRadioValue } = this.state
    return (
      <div>

        <ul className="overview-top">
          <li>
            <h5>总结余</h5>
            <p>
              <img alt="icon" src={jieyu} style={{ width: 36, height: 36, backgroundColor: '#f2a66f', padding: 6, borderRadius: '50%' }} />
              <span className="overview-top-text">143001.92</span>
              <span className="overview-top-a" data-type={2} onClick={this.typeCallback}>结余明细</span>
            </p>
          </li>
          <li>
            <h5>待结算</h5>
            <p>
              <img alt="icon" src={daijiesuan} style={{ width: 36, height: 36, padding: 6, borderRadius: '50%', backgroundColor: '#78c545' }} />
              <span className="overview-top-text">143001.92</span>
              <span className="overview-top-a" data-type={3} onClick={this.typeCallback}>待结算订单</span>
            </p>
          </li>
          <li>
            <h5>已结算</h5>
            <p>
              <img alt="icon" src={yijiesuan} style={{ width: 36, height: 36, padding: 6, borderRadius: '50%', backgroundColor: '#5cc7eb' }} />
              <span className="overview-top-text">143001.92</span>
              <span className="overview-top-a" data-type={4} onClick={this.typeCallback}>已结算订单</span>
            </p>
          </li>
        </ul>


        <div className="line-box">

          <div className="line-title">
            <h5>交易情况</h5>
            <Radio.Group value={dateRadioValue} size="small" onChange={this.dateRadioChange}>
              <Radio.Button value={1}>近七日</Radio.Button>
              <Radio.Button value={2}>近30日</Radio.Button>
              <Radio.Button value={3}>本月</Radio.Button>
            </Radio.Group>
          </div>


          <div style={{ border: '1px solid #ccc' }}>
            <LineReactEcharts getOption={this.getOption} />


            <div className="chart-footer">

              <ul>
                <li>
                  <p>
                    <Icon type="pie-chart" />
                    <span>0</span>
                    <br />
                    <em>昨日交易额</em>
                  </p>
                </li>
                <li>
                  <p>
                    <Icon type="pie-chart" />
                    <span>0</span>
                    <br />
                    <em>昨日交易额</em>
                  </p>
                </li>
                <li>
                  <p>
                    <Icon type="pie-chart" />
                    <span>0</span>
                    <br />
                    <em>昨日交易额</em>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    )
  }
}