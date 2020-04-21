import React from 'react'
import { List } from 'antd';
import GtableEdit from '../../../../common/GtableEdit'
import Gpopover from '../../../../common/Gpopover'
import '../RefundManage/index.less'
export default class DealComplaint extends React.Component {
  state = {
    urls: {
      list: '',
      add: '',
      edit: ''
    },
    titleList: [
      { value: '所有记录', id: 0, type: 0 },
      { value: '待仲裁', id: 1, type: 1 },
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
          title: '投诉会员',
          key: 'UserName',
          dataIndex: 'UserName',
        },
        {
          title: '投诉原因',
          key: 'ComplaintReason',
          dataIndex: 'ComplaintReason',
        },
        {
          title: '投诉日期',
          key: 'ComplaintDate',
          dataIndex: 'ComplaintDate',
        },
        {
          title: '状态',
          key: 'ComplaintStatus',
          dataIndex: 'ComplaintStatus',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { this.checkRefud(e, item) }}>查看回复</div>
              </>
            )
          }
        }
      ]
    }

    const dataSource = [{
      Id: 18,
      OrderId: 2020011694568136,
      ComplaintStatus: "已结束",
      ShopName: "风华电子店铺",
      ShopPhone: "876588888",
      UserName: "selleradmin",
      UserPhone: "13530681820",
      ComplaintDate: "2020/1/16",
      ComplaintReason: "黄杰黄杰和",
      SellerReply: "没问题",
      PlatRemark: "协调",
    }]

    const searchData = [
      { type: 'chooseTime', field: 'tousuriqi', label: '投诉日期', beginTime: 'tousuriqi', isEndTime: false, },
      { type: 'input', field: 'OrderId', label: '订单编号' },
      { type: 'input', field: 'ShopName', label: '店铺名称' },
      { type: 'input', field: 'ProductName', label: '投诉会员' },
      { type: 'select', field: 'shanpinfenlei', width: '170px', label: '商品分类', placeholder: '请输入所属品牌', list: [{ id: 'quanbu', value: '全部', label: '全部' }] },
    ]
    return (
      <>
        <GtableEdit
          rowKey={record => record.Id}
          urls={urls}
          titleList={titleList}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
          pagination={true}
        />

        <RefundPop refundItem={refundItem} title='查看原因' visible={visible} onOK={this.onOK} onClose={this.onClose} okShow={false} cancelText='确定' />
      </>
    )
  }
}

@Gpopover
class RefundPop extends React.Component {
  render() {
    const { refundItem } = this.props
    const data = [
      { key: '订单号', label: 'RefundId' },
      { key: '投诉原因', label: 'ComplaintReason' },
      { key: '商家回复', label: 'SellerReply' },
      { key: '平台备注', label: 'PlatRemark' },

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