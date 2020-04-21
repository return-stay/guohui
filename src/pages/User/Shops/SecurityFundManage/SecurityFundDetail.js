import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import { PageHeader } from 'antd'
export default class SecurityFundDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 25,
          Date: "2020-02-04 01:47",
          Balance: -1000,
          Operator: "admin",
          Description: "lkh",
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
          key: 'Date',
          dataIndex: 'Date',
        },
        {
          title: '金额',
          key: 'Balance',
          dataIndex: 'Balance',

        },
        {
          title: '操作人',
          key: 'Operator',
          dataIndex: 'Operator',
        },
        {
          title: '说明',
          key: 'Description',
          dataIndex: 'Description',
        },
      ]
    }
    const searchData = [
      { type: 'input', field: 'name', label: '操作人' },
      { type: 'chooseTime', field: 'date', label: '时间' },
    ]

    return (
      <div>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={this.onBack}
          title="保证金明细"
        />
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false} />
      </div>
    )
  }
}