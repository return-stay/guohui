import React from 'react'

import GtableEdit from '../../../../common/GtableEdit'
export default class TheBalanceDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 623,
          shopId: 694,
          shopName: "sKOLLEY",
          amount: 0.01,
          createTime: "2020-01-25 00:00:07",
          cycle: "2020-01-10 00:00:00-2020-01-25 00:00:00",
          detailId: "103",
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
          title: '商家名称',
          key: 'shopName',
          dataIndex: 'shopName',
        },
        {
          title: '结算金额',
          key: 'amount',
          dataIndex: 'amount',
          sorter: true,
        },
        {
          title: '结算时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '结算周期',
          key: 'cycle',
          dataIndex: 'cycle',
        },

        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.check(item) }}>查看</div>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'chooseTime', field: 'date', label: '结算时间' },
      { type: 'input', field: 'name', label: '商家名称' },
    ]
    return (
      <div>


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