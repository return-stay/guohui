// 预存款管理
import React from 'react'
import { Radio } from 'antd'

import PrepaidDepositMana from './PrepaidDepositMana'
import WechatWithdrawManage from './WechatWithdrawManage'
import AlipayWithdrawManage from './AlipayWithdrawManage'
import PrepaidDepositSetting from './PrepaidDepositSetting'
import PrepaidDepositDetail from './PrepaidDepositDetail'
export default class PrepaidDepositManage extends React.Component {
  constructor() {
    super()
    this.state = {
      prepaidDepositValue: 0,
      isPrepaidDepositManage: true,
      isPrepaidDepositDetail: false,
      titleList: [
        { value: '预存款管理', id: 0, type: 0 },
        { value: '微信提现管理', id: 1, type: 1 },
        { value: '支付宝提现管理', id: 2, type: 2 },
        { value: '预存款设置', id: 3, type: 3 },
      ],
    }
  }

  expressTabsChange = (e) => {

    let value = e.target.value
    console.log(value)

    this.setState({
      prepaidDepositValue: value
    })
  }
  // 查看明细
  detailsView = (item) => {
    console.log(item)
    this.setState({
      isPrepaidDepositManage: false,
      isPrepaidDepositDetail: true,
    })
  }

  prepaidDepositDetailGoback = ()=> {
    this.prepaidDepositManageFunction()
  }

  // 到预存款管理出事页面
  prepaidDepositManageFunction = () => {
    this.setState({
      isPrepaidDepositManage: true,
      isPrepaidDepositDetail: false,
    })
  }
  render() {
    const { titleList, prepaidDepositValue,isPrepaidDepositManage,isPrepaidDepositDetail } = this.state
    return (
      <>

        {
          isPrepaidDepositManage && (
            <div>
              <div style={{ paddingBottom: 10, borderBottom: '1px solid #d9d9d9' }}>

                <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
                  {
                    titleList.map((item, index) => {
                      return (
                        <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>
                      )
                    })
                  }
                </Radio.Group>
              </div>

              {prepaidDepositValue === 0 && <PrepaidDepositMana detailsView={this.detailsView} />}
              {prepaidDepositValue === 1 && <WechatWithdrawManage />}
              {prepaidDepositValue === 2 && <AlipayWithdrawManage />}
              {prepaidDepositValue === 3 && <PrepaidDepositSetting />}
            </div>
          )
        }

        {isPrepaidDepositDetail && <PrepaidDepositDetail prepaidDepositDetailGoback={this.prepaidDepositDetailGoback} />}



      </>
    )
  }
}