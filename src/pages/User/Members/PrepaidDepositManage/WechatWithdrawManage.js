import React from 'react'
import { Divider, Modal, Form, Input, Radio, Icon } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'

import '../LabelManage/index.less'
const { TextArea } = Input

export default class WechatWithdrawManage extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '',
      },
      dataSource: []
    }
  }

  detailsView = (item) => {
    console.log(item)
    this.props.detailsView(item)
  }

  introduceANew = (item) => {
    console.log(item)
    this.modalChild.show(item)
  }
  render() {
    const _columns = (that) => {
      return [
        {
          title: '选择',
          key: 'realName',
          dataIndex: 'realName',
        },
        {
          title: '提现单号',
          key: 'userName',
          dataIndex: 'userName',
        },
        {
          title: '状态',
          key: 'balance',
          dataIndex: 'balance',
        },
        {
          title: '提现会员账号',
          key: 'freezeAmount',
          dataIndex: 'freezeAmount',
        },
        {
          title: '微信昵称',
          key: 'chargeAmount',
          dataIndex: 'chargeAmount',
        },
        {
          title: '提现金额',
          key: 'presentAmount',
          dataIndex: 'presentAmount',
        },
        {
          title: '申请时间',
          key: 'userName5',
          dataIndex: 'userName5',
        },
        {
          title: '处理时间',
          key: 'userName4',
          dataIndex: 'userName4',
        },
        {
          title: '付款时间',
          key: 'userName3',
          dataIndex: 'userName3',
        },
        {
          title: '付款流水号',
          key: 'userName2',
          dataIndex: 'userName2',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.detailsView(item) }}>查看明细</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.introduceANew(item) }}>加减款</span>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'select', field: 'shanpinfenlei', width: '170px', label: '状态', initialValue: 'quanbu', list: [
        { id: 0, value: 'quanbu', label: '全部' },
        { id: 1, value: 'daichuli', label: '待处理' },
        { id: 2, value: 'fukuanshibai', label: '付款失败' },
        { id: 3, value: 'tixianchenggong', label: '提现成功' },
        { id: 4, value: 'yijujue', label: '已拒绝' },
        { id: 5, value: 'fukuanzhong', label: '付款中' },
      ] },
      { type: 'input', field: 'danhao', label: '提现单号' },
      { type: 'input', field: 'userVip', label: '提现会员' },
    ]
    const { urls, dataSource } = this.state
    return (
      <div style={{ marginTop: 10 }}>
        <h5 className='help-default'>
          <Icon type="info-circle" />
          <span style={{ marginLeft: 10 }}>
            说明：使用微信企业付款需要企业预先充值（登录微信支付平台——点击资金管理——选择充值），请您确保微信账户有足够的余额用于会员提现。若会员提现处理失败，可能原因如下：
            <p style={{ marginBottom: 0 }}>1、新入驻90天内的商户，且连续交易未满30天不支持企业付款功能。</p>
            <p style={{ marginBottom: 0 }}>2、企业帐号余额不足</p>
            <p style={{ marginBottom: 0 }}>3、系统超时</p>
            <p style={{ marginBottom: 0 }}>4、商户未开通此接口权限</p>
          </span>
        </h5>
        <GtableEdit
          ulrs={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
        />

        <PrepaidDepositManaModal triggerRef={ref => this.modalChild = ref} />
      </div>
    )
  }
}



class PrepaidDepositManaModalForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '加减款',
      moneyValue: 1,
      visible: false,
      prepaidDepositManaItem: {}
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }
  show = (item) => {
    this.setState({
      visible: true,
      prepaidDepositManaItem: item
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  onok = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.onCancel()
      }
    });
  }
  onMoneyChange = (e) => {
    console.log(e)
    this.setState({
      moneyValue: e.target.value,
    });
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { title, visible, prepaidDepositManaItem, moneyValue } = this.state

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onok}
      >
        <Form {...formItemLayout}>

          <Form.Item label="会员账号">
            <span>{prepaidDepositManaItem.realName}</span>
          </Form.Item>
          <Form.Item label="可用余额">
            <span>{prepaidDepositManaItem.balance}元</span>
          </Form.Item>
          <Form.Item label="金额变动">
            {/* {getFieldDecorator('jinebiandong', { valuePropName: 'value', rules: [{ required: true, message: '此项为必填项' }] })(
              <Input data-type="user" style={{ width: 150 }} />
            )} */}

            <Radio.Group onChange={this.onMoneyChange} value={moneyValue}>
              <Radio style={radioStyle} value={1}>
                加款 {moneyValue === 1 ? (<><Input style={{ height: 28, width: 100, margin: '0 4px 0 10px' }} />元</>) : null}
              </Radio>
              <Radio style={radioStyle} value={2}>
                减款 {moneyValue === 2 ? (<><Input style={{ height: 28, width: 100, margin: '0 4px 0 10px' }} />元</>) : null}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('Remark', { valuePropName: 'value' })(
              <TextArea rows={4} />
            )}
          </Form.Item>
        </Form>

      </Modal>
    )
  }
}

const PrepaidDepositManaModal = Form.create()(PrepaidDepositManaModalForm)