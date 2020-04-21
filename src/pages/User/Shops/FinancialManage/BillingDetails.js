import React from 'react'
import { Icon, PageHeader } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import './index.less'
export default class BillingDetails extends React.Component {

  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 0,
          date: '2020-02-03 13:01:56',
          type: '订单实付金额',
          money: '216.34'
        }
      ]
    }
  }

  onBack = () => {
    this.props.onBack()
  }
  render() {

    let { urls, dataSource } = this.state;
    const _columns = () => {
      return [
        {
          title: '时间',
          key: 'date',
          dataIndex: 'date',
        },
        {
          title: '类型',
          key: 'type',
          dataIndex: 'type',
          sorter: true,
        },
        {
          title: '金额',
          key: 'money',
          dataIndex: 'money',
        },
      ]
    }
    return (
      <div>

        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={this.onBack}
          title="结算金额明细"
        />
        <div className="yal-title"><Icon type="info-circle" style={{ marginRight: 10 }} />结算金额 = 订单实付金额 + 积分抵扣金额 - 平台佣金 - 分销佣金 - 退款金额 </div>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          isRowSelection={false}
        />

      </div>
    )
  }
}