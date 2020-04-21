import React from 'react'

import { Radio } from 'antd'

import AfterSalesReasonSetting from './AfterSalesReasonSetting'
import TradingParameter from './TradingParameter'
export default class DealSetting extends React.Component {

  constructor() {
    super()
    this.state = {
      settingType: 0,
      titleList: [
        { value: '交易参数', id: 0, type: 0 },
        { value: '售后原因设置', id: 1, type: 1 },
      ]
    }
  }

  settingTabsChange = (e) => {
    let type = e.target.value

    this.setState({
      settingType: type,
    })
  }
  render() {
    const { titleList,settingType } = this.state
    return (
      <>
        <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.settingTabsChange}>
          {
            titleList.map((item, index) => {
              return (
                <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>
              )
            })
          }
        </Radio.Group>


        {
          settingType === 0? <TradingParameter /> : <AfterSalesReasonSetting />
        }

      </>
    )
  }
}