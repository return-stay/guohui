import React from 'react'
import { Modal, Icon, Button } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'

import '../LabelManage/index.less'

export default class AlipayWithdrawManage extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '',
      },
      dataSource: [
        {
          Id: 1,
          MemId: 967,
          MemberName: "xiaoxiao",
          NickName: "肖建业",
          OpenId: null,
          ApplyStatus: 4,
          ApplyStatusDesc: "已拒绝",
          ApplyAmount: 100,
          ApplyTime: "2019/2/28 20:39:19",
          ConfirmTime: "2019/5/23 12:58:36",
          PayTime: "",
          PayNo: null,
          OpUser: "admin",
          Remark: "123",
          ApplyType: null,
          Poundage: null,
          PayAmount: 100,
        }
      ]
    }
  }

  detailsRemark = (item) => {
    console.log(item)
    this.modalChild.show(item)
  }

  render() {
    const _columns = (that) => {
      return [
        {
          title: '提现单号',
          key: 'Id',
          dataIndex: 'Id',
        },
        {
          title: '状态',
          key: 'ApplyStatusDesc',
          dataIndex: 'ApplyStatusDesc',
        },
        {
          title: '提现会员账号',
          key: 'MemberName',
          dataIndex: 'MemberName',
        },
        {
          title: '真实姓名',
          key: 'NickName',
          dataIndex: 'NickName',
        },
        {
          title: '提现金额',
          key: 'ApplyAmount',
          dataIndex: 'ApplyAmount',
        },
        {
          title: '申请时间',
          key: 'ApplyTime',
          dataIndex: 'ApplyTime',
        },
        {
          title: '处理时间',
          key: 'ConfirmTime',
          dataIndex: 'ConfirmTime',
        },
        {
          title: '付款时间',
          key: 'PayTime',
          dataIndex: 'PayTime',
        },
        {
          title: '付款流水号',
          key: 'PayNo',
          dataIndex: 'PayNo',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.detailsRemark(item) }}>查看备注</span>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      {
        type: 'select', field: 'shanpinfenlei', width: '170px', label: '状态', initialValue: 'quanbu', list: [
          { id: 0, value: 'quanbu', label: '全部' },
          { id: 1, value: 'daichuli', label: '待处理' },
          { id: 2, value: 'fukuanshibai', label: '付款失败' },
          { id: 3, value: 'tixianchenggong', label: '提现成功' },
          { id: 4, value: 'yijujue', label: '已拒绝' },
          { id: 5, value: 'fukuanzhong', label: '付款中' },
        ]
      },
      { type: 'input', field: 'danhao', label: '提现单号' },
      { type: 'input', field: 'userVip', label: '提现会员' },
    ]
    const { urls, dataSource } = this.state
    return (
      <div style={{ marginTop: 10 }}>
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>
            说明：提现处理失败，可能原因如下：
            <p style={{ marginBottom: 0 }}>1、商户未开通此接口权限</p>
          </span>
        </h5>
        <GtableEdit
          ulrs={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
        />

        <AlipayWithdrawManageModal triggerRef={ref => this.modalChild = ref} />
      </div>
    )
  }
}



class AlipayWithdrawManageModal extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '查看原因',
      visible: false,
      AlipayWithdrawManageItem: {}
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }
  show = (item) => {
    this.setState({
      visible: true,
      AlipayWithdrawManageItem: item
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { title, visible, AlipayWithdrawManageItem } = this.state

    const FooterBtns = (
      <Button onClick={this.onCancel}>关闭</Button>
    )
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        footer={FooterBtns}
      >
        <span>{AlipayWithdrawManageItem.Remark}</span>

      </Modal>
    )
  }
}
