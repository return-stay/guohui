// 分组
import React from 'react'
import './index.less'
import PieReactEcharts from '../../../../common/GreactEcharts/PieReactEcharts'
import { Popover, Icon } from 'antd'
export default class Packet extends React.Component {
  constructor() {
    super()
    this.state = {
      isEcharts: false,
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
    }
  }


  getOtion = (that) => {
    const data = this.state.data
    const color = that.state.color
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color: color,
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: ' {d}%  ',
          },
        }
      ]
    }
    return option;
  }
  render() {
    console.log(this.state.data)
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10 }
    const content = (
      <div style={{ padding: 20, width: 420 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>记录最近1/3/6个月之内有过下单行为的用户数量。</span>
          </li>

          <li style={listStyle}>
            <div style={{ color: '#747474' }}>可以点击饼状图或具体会员数查看具体会员信息。</div>
          </li>
        </ul>
      </div>
    )
    return (
      <>
        <div>
          <div className="group-wp">
            <div className="group-wp-name">活跃会员</div>

            <Popover placement="bottomRight" content={content}>
              <Icon type="question-circle" style={{ color: '#ccc' }} />
            </Popover>
          </div>

          <PieReactEcharts data={this.state.data} getOtion={this.getOtion} style={{width: '900px'}} legend={{left: '20px'}}/>
        </div>
      </>
    )
  }
}