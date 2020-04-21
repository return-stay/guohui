import React from 'react'
import { List } from 'antd';
import GtableEdit from '../../../../common/GtableEdit'
import Gimage from '../../../../common/Gimage'
import Gpopover from '../../../../common/Gpopover'

import './index.less'
export default class RefundManage extends React.Component {
  state = {
    urls: {
      list: '',
      add: '',
      edit: ''
    },
    titleList: [
      { value: '退款记录', id: 0, type: 0 },
      { value: '待处理', id: 1, type: 1 },
    ],
    visible: false,
    refundItem: {}
  }

  checkRefud = (e, item) => {
    this.onOK(e, item)
  }

  onOK = (e, item) => {
    this.setState({
      visible: true,
      refundItem: item,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }
  render() {


    let { urls, titleList, visible, refundItem } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '订单号',
          key: 'OrderId',
          dataIndex: 'OrderId',
        },
        {
          title: '店铺',
          key: 'ShopName',
          dataIndex: 'ShopName',
        },
        {
          title: '商品',
          key: 'ProductName',
          render(item) {
            return (<div className="product-name-box">
              <Gimage url={item.ThumbnailsUrl} style={{ width: 40, height: 40 }} />
              <span className={true ? "product-name-text product-name-text-color" : "product-name-text"}>{item.ProductName}</span>
            </div>)
          }
        },
        {
          title: '买家',
          key: 'UserName',
          dataIndex: 'UserName',
        },
        {
          title: '申请日期',
          key: 'ApplyDate',
          dataIndex: 'ApplyDate',
        },
        {
          title: '退款',
          key: 'SalePrice',
          dataIndex: 'SalePrice',
          render: (SalePrice) => {
            return <div style={{ color: '#ff6600' }}>￥{SalePrice}</div>
          }
        },
        {
          title: '处理状态',
          key: 'RefundStatus',
          dataIndex: 'RefundStatus',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.checkRefud(e, item) }}>查看原因</div>
              </>
            )
          }
        }
      ]
    }

    const dataSource = [{
      RefundId: 852,
      OrderId: 2020011376018961,
      AuditStatus: "退款成功",
      ConfirmStatus: "退款成功",
      ApplyDate: "2020/1/13",
      ShopId: 1,
      ShopName: "风华电子店铺",
      UserId: 1584,
      UserName: "aaaaz",
      ContactPerson: "bsbdhxh",
      ContactCellPhone: "-",
      RefundAccount: "",
      Amount: "238.00",
      ReturnQuantity: 0,
      Quantity: 0,
      SalePrice: "238.00",
      ProductName: "新款秋显瘦收腰韩版英伦学院风长袖千鸟格圆领蓬蓬公主 女连衣裙",
      Reason: "颜色问题",
      ReasonDetail: "",
      ExpressCompanyName: null,
      ShipOrderNumber: null,
      Payee: "",
      PayeeAccount: "",
      ProductId: 2520,
      ThumbnailsUrl: "/Storage/Shop/1/Products/2520/1_100.png",
      RefundMode: 2,
      ManagerRemark: "(原退到预存款转线下退款)",
      SellerRemark: "卖家超时未处理，系统自动同意售后",
      RefundStatus: "退款成功",
      RefundPayType: "线下收款",
      RefundPayStatus: 1,
      ApplyNumber: 1,
      nextSecond: 0,
      CertPic1: "",
      CertPic2: "",
      CertPic3: "",
      ShopBranchId: 0,
      ShopBranchName: null,
      IsVirtual: false,
      VerificationCodeIds: "",
      RefundBatchNo: "",
    }]

    const searchData = [
      { type: 'chooseTime', field: 'shangpinleixing',beginTime: 'tuikuanshijianbegin',EndTime: 'tuikuanshijianend', label: '退款时间', isEndTime: false, },
      { type: 'input', field: 'OrderId', label: '订单编号' },
      { type: 'input', field: 'ShopName', label: '店铺名' },
      { type: 'input', field: 'ProductName', label: '商品名称' },
      { type: 'input', field: 'UserName', label: '买家' },
    ]
    return (
      <>
        <GtableEdit
          rowKey={record => record.RefundId}
          urls={urls}
          titleList={titleList}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
          pagination={true}
        />

        <RefundPop refundItem={refundItem} visible={visible} onOK={this.onOK} onClose={this.onClose} okShow={false} cancelText='确定' />
      </>
    )
  }
}

@Gpopover
class RefundPop extends React.Component {
  render() {
    const { refundItem } = this.props
    const data = [
      { key: '售后编号', label: 'RefundId' },
      { key: '理由', label: 'Reason' },
      { key: '说明', label: 'ReasonDetail' },
      { key: '联系人', label: 'UserName' },
      { key: '联系方式', label: 'ContactCellPhone' },
      { key: '退款金额', label: 'SalePrice' },
      { key: '退款方式', label: 'RefundPayType' },
      { key: '商家处理', label: 'SellerRemark' },
      { key: '平台备注', label: 'ManagerRemark' },

    ]
    return (
      <div>
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <span className="refund-item-title"> {item.key}</span><span>{refundItem[item.label]}</span>
            </List.Item>
          )}
        />
      </div>
    )
  }
}