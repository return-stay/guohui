import React from 'react'

import GtableEdit from '../../../../common/GtableEdit'
import {Icon} from 'antd'
import './index.less'
export default class YetAccountList extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 897,
          CreateTime: "2020-01-25 00:00:06",
          AccountNo: "202001250000063409401",
          AccountType: "佣金收入",
          PlatAccountType: 1,
          Income: "85.88",
          Expenditure: null,
          Balance: "143001.92",
          DetailId: "103",
          DetailLink: "/Admin/Billing/SettlementOrders?detailId=103",
        }
      ]
    }
  }

  check = () => {
    this.props.check(3)
  }
  render() {

    let { urls, dataSource } = this.state;
    const _columns = () => {
      const _this = this
      return [
        {
          title: '时间',
          key: 'CreateTime',
          dataIndex: 'CreateTime',
        },
        {
          title: '类型',
          key: 'AccountType',
          dataIndex: 'AccountType',
          sorter: true,
        },
        {
          title: '收入',
          key: 'Income',
          dataIndex: 'Income',
        },
        {
          title: '支出',
          key: 'Expenditure',
          dataIndex: 'Expenditure',
        },
        {
          title: '余额',
          key: 'Balance',
          dataIndex: 'Balance',
        },
        {
          title: '收支流水号',
          key: 'AccountNo',
          dataIndex: 'AccountNo',
        },

        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.check(item) }}>查看明细</div>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'chooseTime', field: 'date', label: '时间' },
      { type: 'select', field: 'paytype', label: '类型', initialValue: 0,width: 170, list: [
          { id: '0', value: 0, label: '全部' },
          { id: '1', value: 1, label: '佣金收入' },
          { id: '2', value: 2, label: '营销服务费' },
        ]
      },
    ]
    return (
      <div>

        <div className="yal-title"><Icon type="info-circle" style={{marginRight: 10}} />结余总额：143001.92 , 结余总额 = 佣金收入 + 营销服务费 + 入驻缴费 </div>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
        />
      </div>
    )
  }
}