import React from 'react'

import GtableEdit from '../../../../common/GtableEdit'
export default class WaitAccountList extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 1,
          amount: 45522.76,
          shopName: "风华电子店铺",
          endTime: '2020/2/9 0:00:00',
          settlementInterval: '020-01-25 00:00:00--2020-02-09 00:00:00'
        }
      ]
    }
  }

  check = () => {
    this.props.check(2)
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
          title: '本期预计结算',
          key: 'amount',
          dataIndex: 'amount',
          sorter: true,
        },
        {
          title: '预计结算周期',
          key: 'endTime',
          dataIndex: 'endTime',
        },
        {
          title: '结算周期',
          key: 'settlementInterval',
          dataIndex: 'settlementInterval',
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
      { type: 'input', field: 'name', label: '商家名称', placeholder: '请输入商品名称' },
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