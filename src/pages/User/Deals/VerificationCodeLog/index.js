import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import VerificationDetail from './VerificationDetail'
import '../OrderManage/index.less'
export default class VerificationCodeLog extends React.Component {
  state = {
    isDetail: false,
    dataSource: [
      {
        PayDateText: "2020-01-16 10:49:07",
        StatusText: "待核销",
        Name: "风华电子店铺",
        VerificationTimeText: "",
        Id: 549,
        OrderId: 2020011630312447,
        OrderItemId: 5140,
        Status: 1,
        VerificationCode: "1131 **** 3647",
        VerificationTime: null,
        VerificationUser: "",
        QRCode: null,
        SourceCode: null,
        PayDate: "/Date(1579142947000)/",
        ShopId: 1,
        ShopBranchId: 0,
        ModifiedColumns: ["Id", "OrderId", "OrderItemId", "Status", "VerificationCode", "VerificationTime", "VerificationUser"],
        EnableLazyLoad: true,
        IgnoreReference: false,
      }
    ],
  }

  checkDetail = (e) => {
    this.setState({
      isDetail: true,
    })
  }

  render() {
    const { isDetail, dataSource } = this.state

    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '订单号',
          key: 'OrderId',
          dataIndex: 'OrderId',
          render(OrderId) {
            return (
              <span style={{color: '#2481d1', cursor: 'pointer'}} onClick={_this.checkDetail}>{OrderId}</span>
            )
          }
        },
        {
          title: '核销码',
          key: 'VerificationCode',
          dataIndex: 'VerificationCode',
        },
        {
          title: '状态',
          key: 'StatusText',
          dataIndex: 'StatusText',
        },
        {
          title: '付款时间',
          key: 'PayDateText',
          dataIndex: 'PayDateText',
        },
        {
          title: '核销时间',
          key: 'VerificationTimeText',
          dataIndex: 'VerificationTimeText',
        },
        {
          title: '商家/门店',
          key: 'Name',
          dataIndex: 'Name',
        },
        {
          title: '核销人',
          key: 'VerificationUser',
          dataIndex: 'VerificationUser',
        },
      ]
    }
    const searchData = [
      { type: 'input', field: 'name', label: '订单号' },
      { type: 'select', field: 'shanpinfenlei', width: '170px', label: '核销码状态', list: [{ id: '0', value: '全部', label: '全部' }] },
      // { type: 'chooseTime', field: 'shangpinleixing', label: '付款时间' },
      { type: 'input', field: 'dianpu', label: '核销码' },
      { type: 'input', field: 'code', label: '上架/门店' },
      // { type: 'chooseTime', field: 'hexiaoshijian', label: '核销时间',beginTime: 'beginTimeTwo',EndTime: 'EndTimeTwo' },
    ]
    return (
      <div>

        {
          isDetail ? <VerificationDetail data={dataSource} /> : <GtableEdit
            searchData={searchData}
            columns={_columns}
            bordered={false}
            pagination={true}
            isRowSelection={false}
            dataSource={dataSource}
          />
        }


      </div>
    )
  }
}