import React from 'react'
import { Radio } from 'antd'

import Wechat from './wechat'
import Sent from './Sent'

import Coupon from '../MembersCommon/coupon'
import Email from '../MembersCommon/email'
import Note from '../MembersCommon/note'


export default class Affiliate extends React.Component {
  constructor() {
    super()

    this.state = {
      affiliateType: 0,
      titleList: [
        {
          id: 0,
          value: '群发微信消息',
        },
        {
          id: 1,
          value: '群发邮件',
        },
        {
          id: 2,
          value: '群发短信',
        },
        {
          id: 3,
          value: '群发优惠券',
        },
        {
          id: 4,
          value: '已发送消息',
        },
      ]
    }
  }

  tableTabsChange = (e) => {
    console.log(e)
    let affiliateType = e.target.value
    this.setState({
      affiliateType
    })
  }
  render() {
    const { titleList, affiliateType } = this.state
    return (
      <>

        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
          <Radio.Group defaultValue={0} buttonStyle="solid" size="large" onChange={this.tableTabsChange}>
            {
              titleList.map((item, index) => <Radio.Button key={item.id} value={index}>{item.value}</Radio.Button>)
            }
          </Radio.Group>
        </div>

        {
          affiliateType === 0 ? <Wechat /> : ''
        }

        {
          affiliateType === 1 ? <Email /> : ''
        }
        {
          affiliateType === 2 ? <Note /> : ''
        }

        {
          affiliateType === 3 ? <Coupon /> : ''
        }
        {
          affiliateType === 4 ? <Sent /> : ''
        }

      </>
    )
  }
}