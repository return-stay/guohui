import React from 'react'
import { PageHeader } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'


import BillingDetails from './BillingDetails'
export default class WaitAccountOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      isBillingDetail: false,
      orderItem: {},
      dataSource: [
        {
          Id: 0,
          OrderId: 2020020328640960,
          strOrderId: "2020020328640960",
          Status: "待发货",
          ShopName: "风华电子店铺",
          PaymentTypeName: "预存款支付",
          OrderAmount: 216.34,
          PlatCommission: 0,
          DistributorCommission: 0,
          PlatCommissionReturn: 0,
          DistributorCommissionReturn: 0,
          FreightAmount: 10,
          RefundAmount: 0,
          SettlementAmount: 216.34,
          OrderFinshTimeStr: "0001-01-01 00:00:00",
          TaxAmount: 7.94,
          IntegralDiscount: 0,
          RefundDate: null,
          CreateDate: "/Date(1580706116000)/",
          RefundDateStr: "",
          CreateDateStr: "2020-02-03 13:01:56",
          SettlementCycle: "",
        }
      ]
    }
  }
  onBack = () => {
    this.props.onBack()
  }

  check = (item) => {
    this.setState({
      orderItem: item,
      isBillingDetail: true,
    })
  }
  billingDetailBack = () => {
    this.setState({
      isBillingDetail: false,
    })
  }
  render() {

    let { urls, dataSource, isBillingDetail } = this.state;
    const _columns = () => {
      const _this = this
      return [
        {
          title: '订单号',
          key: 'OrderId',
          dataIndex: 'OrderId',
        },
        {
          title: '订单状态',
          key: 'Status',
          dataIndex: 'Status',
          sorter: true,
        },
        {
          title: '店铺名称',
          key: 'ShopName',
          dataIndex: 'ShopName',
        },
        {
          title: '订单实付',
          key: 'OrderAmount',
          dataIndex: 'OrderAmount',
        },

        {
          title: '积分抵扣',
          key: 'PlatCommissionReturn',
          dataIndex: 'PlatCommissionReturn',
        },
        {
          title: '平台佣金',
          key: 'PlatCommission',
          dataIndex: 'PlatCommission',
        },
        {
          title: '分销佣金',
          key: 'DistributorCommission',
          dataIndex: 'DistributorCommission',
        },
        {
          title: '退款金额',
          key: 'DistributorCommissionReturn',
          dataIndex: 'DistributorCommissionReturn',
        },
        {
          title: '结算金额',
          key: 'SettlementAmount',
          dataIndex: 'SettlementAmount',
        },
        {
          title: '创建时间',
          key: 'CreateDateStr',
          dataIndex: 'CreateDateStr',
        },
        {
          title: '支付方式',
          key: 'PaymentTypeName',
          dataIndex: 'PaymentTypeName',
        },

        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.check(item) }}>查看详情</div>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'chooseTime', field: 'date', label: '创建时间' },
      { type: 'input', field: 'name', label: '订单编号', placeholder: '请输入商品名称' },
      {
        type: 'select', field: 'paytype', label: '支付方式', initialValue: 0, width: 170, list: [
          { id: '0', value: 0, label: '全部' },
          { id: '1', value: 1, label: '支付宝支付' },
          { id: '2', value: 2, label: '银联支付' },
        ]
      },
    ]
    return (
      <div>

        {
          isBillingDetail ? (
            <BillingDetails onBack={this.billingDetailBack} />
          ) : (
              <>
                <PageHeader
                  style={{
                    border: '1px solid rgb(235, 237, 240)',
                  }}
                  onBack={this.onBack}
                  title="待结算订单"
                />

                <GtableEdit
                  urls={urls}
                  columns={_columns}
                  dataSource={dataSource}
                  searchData={searchData}
                  isRowSelection={false}
                />
              </>
            )

        }


      </div>
    )
  }
}

