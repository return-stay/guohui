import React from 'react'
import { Divider, Modal, Form, Input, Radio } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
const { TextArea } = Input
export default class PrepaidDepositMana extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '',
      },
      dataSource: [
        {
          Id: 1465,
          userId: 1465,
          userName: "q752481828",
          realName: "q752481828",
          balance: 99999955.05,
          freezeAmount: 0,
          chargeAmount: 99999999,
          presentAmount: 0,
        }
      ]
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
          title: '会员账号',
          key: 'realName',
          dataIndex: 'realName',
        },
        {
          title: '会员姓名',
          key: 'userName',
          dataIndex: 'userName',
        },
        {
          title: '账户可用资金',
          key: 'balance',
          dataIndex: 'balance',
          sorter: true,
        },
        {
          title: '冻结金额',
          key: 'freezeAmount',
          dataIndex: 'freezeAmount',
          sorter: true,
        },
        {
          title: '累计充值金额',
          key: 'chargeAmount',
          dataIndex: 'chargeAmount',
          sorter: true,
        },
        {
          title: '累计赠送金额',
          key: 'presentAmount',
          dataIndex: 'presentAmount',
          sorter: true,
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
      { type: 'input', field: 'name', label: '会员账号' },
    ]
    const { urls, dataSource } = this.state
    return (
      <div style={{ marginTop: 10 }}>
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