import React from 'react'

import { Divider } from 'antd'

const merchData = [
  {
    Id: 2,
    DealTime: "2020-02-05 11:20:18",
    ApplyTime: "2019-09-04 17:40:35",
    SellerId: 569,
    SellerName: "selleradmin",
    CashAmount: "100.00",
    CashType: "微信",
    Account: "1111111",
    AccountName: "1111",
    ShopId: 1,
    ShopName: "风华电子店铺",
    WithStatus: 4,
    Status: "提现失败",
    AccountNo: 201909041740345600,
    AccountNoText: "201909041740345614",
    ShopRemark: "",
    PlatRemark: "",
  }
]


const columnsSuccess = (_this) => {
  const columns = (that) => {
    return [
      {
        title: '审核时间',
        key: 'DealTime',
        dataIndex: 'DealTime',
      },
      {
        title: '申请时间',
        key: 'ApplyTime',
        dataIndex: 'ApplyTime',
      },
      {
        title: '商家',
        key: 'ShopName',
        dataIndex: 'ShopName',
      },
      {
        title: '申请金额',
        key: 'CashAmount',
        dataIndex: 'CashAmount'
      },
      {
        title: '提现方式',
        key: 'CashType',
        dataIndex: 'CashType',
        sorter: true,
      },
      {
        title: '账户',
        key: 'Account',
        dataIndex: 'Account',
      },
      {
        title: '收款账户姓名',
        key: 'AccountName',
        dataIndex: 'AccountName',
      },
      {
        title: '交易流水号',
        key: 'AccountNo',
        dataIndex: 'AccountNo',
      },
      {
        title: '备注',
        key: 'PlatRemark',
        dataIndex: 'PlatRemark',
      }
    ]
  }
  return columns
}

const columnsPending = (_this) => {
  const columns = (that) => {
    return [
      {
        title: '申请时间',
        key: 'ApplyTime',
        dataIndex: 'ApplyTime',
      },
      {
        title: '商家',
        key: 'ShopName',
        dataIndex: 'ShopName',
      },
      {
        title: '申请金额',
        key: 'CashAmount',
        dataIndex: 'CashAmount'
      },
      {
        title: '提现方式',
        key: 'CashType',
        dataIndex: 'CashType',
        sorter: true,
      },
      {
        title: '账户',
        key: 'Account',
        dataIndex: 'Account',
      },
      {
        title: '收款账户姓名',
        key: 'AccountName',
        dataIndex: 'AccountName',
      },
      {
        title: '操作',
        render: (item) => {
          return (
            <>
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.setToAdvocate(item) }}>设为主推</span>
              <Divider type="vertical" />
              {
                item.IsOpen && (
                  <>
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.setHot(item) }}>设为热门</span>
                    <Divider type="vertical" />
                  </>
                )
              }
              <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.soldOut(item) }}>下架</span>

            </>
          )
        }
      }
    ]
  }
  return columns
}

export {
  merchData,
  columnsSuccess,//提现成功
  columnsPending, //待处理
}