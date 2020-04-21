import React from 'react'
import { PageHeader, Radio } from 'antd';
import GtableEdit from '../../../../common/GtableEdit'
export default class PrepaidDepositDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 19121414484629364,
          UserId: 0,
          CapitalID: 599,
          SourceType: 2,
          Amount: 123,
          SourceData: "19121414484626077",
          CreateTime: "2019/12/14 14:48:46",
          Remark: "充值,单号：19121414484626077(实验啊大苏打实打实大苏打卢卡斯觉得卡死了 管理员操作)",
          PayWay: "管理员操作",
          SourceTypeName: null,
          IsExitRefund: 0,
          PresentAmount: 0,
        }
      ]
    }
  }
  render() {
    const _columns = (that) => {
      return [
        {
          title: '时间',
          key: 'CreateTime',
          dataIndex: 'CreateTime',
          width: 200,
        },
        {
          title: '收入',
          key: 'shouru',
          dataIndex: 'Amount',
          width: 150,
          render: (Amount) => {
            if (Amount > 0) {
              return (<span>{Amount}</span>)
            }
          }
        },
        {
          title: '支出',
          key: 'zhichu',
          dataIndex: 'Amount',
          width: 150,
          render: (Amount) => {
            if (Amount < 0) {
              return (<span>{Amount}</span>)
            }
          }
        },
        {
          title: '备注',
          key: 'Remark',
          dataIndex: 'Remark',
        },
      ]
    }
    const searchData = [
      { type: 'chooseTime', field: 'zhuceshijian', label: '时间' },
    ]
    const { urls, dataSource } = this.state
    return (
      <div>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          onBack={() => this.props.prepaidDepositDetailGoback()}
          title="预存款管理"
          subTitle="查看预存款明细"
        />

        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Radio.Group defaultValue="a" size="small">
            <Radio.Button value="a">账户明细</Radio.Button>
            <Radio.Button value="b">领取红包</Radio.Button>
            <Radio.Button value="c">充值</Radio.Button>
            <Radio.Button value="d">提现</Radio.Button>
            <Radio.Button value="e">消费</Radio.Button>
            <Radio.Button value="f">退款</Radio.Button>
            <Radio.Button value="g">分销佣金</Radio.Button>
          </Radio.Group>
        </div>

        <GtableEdit
          ulrs={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
        />

      </div>
    )
  }
}