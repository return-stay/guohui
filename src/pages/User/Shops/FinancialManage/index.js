import React from 'react'
import { Radio, Popover, Icon } from 'antd'
import FinancialOverview from './FinancialOverview'
import SettlementPeriodSetting from './SettlementPeriodSetting'

import WaitAccountList from './WaitAccountList'
import WaitAccountOrder from './WaitAccountOrder'

import TheBalanceDetails from './TheBalanceDetails'
import YetAccountList from './YetAccountList'
import YetAccountOrder from './YetAccountOrder'
export default class FinancialManage extends React.Component {
  constructor() {
    super()

    this.state = {
      titleList: [
        { value: '财务总览', id: 1, type: 1 },
        { value: '待结算列表', id: 2, type: 2 },
        { value: '已结算列表', id: 3, type: 3 },
        { value: '结余明细', id: 4, type: 4 },
        { value: '结算周期设置', id: 5, type: 5 },
      ],
      titleType: 1,
      isHomeShow: true,
      isWaitAccountOrder: false, //代付款订单
    }
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    this.setState({
      titleType: type
    })
  }

  typeCallback = (type) => {
    console.log(type)
    this.setState({
      titleType: Number(type)
    })
  }

  check = (type) => {
    console.log(type)
    switch (type) {
      case 2:
        this.setState({
          isHomeShow: false,
          isWaitAccountOrder: true
        })
        break;
      case 3:
        this.setState({
          isHomeShow: false,
          isYetAccountOrder: true
        })
        break;
      default:
        this.setState({
          isHomeShow: true,
        })
        break;
    }

  }

  onBack = () => {
    this.setState({
      isHomeShow: true,
      isWaitAccountOrder: false,
      isTheBalanceDetailsOrder: false,
      isYetAccountOrder: false,
    })
  }
  render() {
    let { titleList, titleType, isHomeShow, isWaitAccountOrder, isYetAccountOrder } = this.state;
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (
      <div style={{ padding: 20, width: 520 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>每个结算周期内平台与商家对所有“已完成”且过了售后维权期的订单进行核算，统计出与各个商家需要结算的金额。</span>
          </li>

          <li style={listStyle}>
            <span style={{ color: '#747474' }}>计算公式：平台应结金额 = 订单实付金额 + 积分抵扣金额 - 平台抽佣 - 分销佣金 - 退款金额</span>
          </li>
        </ul>
      </div>
    );
    return (
      <div>
        {
          isHomeShow && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20, marginBottom: 10 }}>
                <Radio.Group value={titleType} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
                  {
                    titleList.map((item) => {
                      return (
                        <Radio.Button key={item.id} value={item.id}>{item.value}</Radio.Button>
                      )
                    })
                  }
                </Radio.Group>

                <Popover content={content} placement="leftBottom">
                  <Icon type="question-circle" style={{ color: '#ccc' }} />
                </Popover>
              </div>

              {
                titleType === 1 && (
                  <FinancialOverview typeCallback={this.typeCallback} />
                )
              }
              {
                titleType === 2 && (
                  <WaitAccountList check={this.check} />
                )
              }
              {
                titleType === 3 && (
                  <TheBalanceDetails check={this.check} />
                )
              }
              {
                titleType === 4 && (
                  <YetAccountList check={this.check} />
                )
              }
              {
                titleType === 5 && (
                  <SettlementPeriodSetting />
                )
              }
            </>
          )
        }


        {
          isWaitAccountOrder && <WaitAccountOrder onBack={this.onBack} />
        }

        {
          isYetAccountOrder && <YetAccountOrder onBack={this.onBack} />
        }
      </div>
    )
  }
}