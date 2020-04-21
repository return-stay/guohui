import React from 'react'
import { Radio, Divider, Form, Modal, Input, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import SecurityFundDetail from './SecurityFundDetail'
import MarginRuleSetting from './MarginRuleSetting'
const { TextArea } = Input
export default class SecurityFundManage extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      isSecurityFundDetail: false,
      titleType: 1,
      titleList: [
        { value: '保证金管理', id: 1, type: 1 },
        { value: '保证金规则设置', id: 2, type: 2 },
      ],
      dataSource: [
        {
          Id: 1,
          shopName: "风华电子店铺",
          type: "正常",
          totalBalance: 34073,
          currentBalance: 20527,
          date: "2020-01-16 14:28:59",
          needPay: 0,
          enableLabels: true,
        }
      ]
    }
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    this.setState({
      titleType: type
    })
  }
  charge = (item) => {
    console.log('扣款')
    this.securityChild.show(item)
  }
  check = (item) => {
    this.setState({
      isSecurityFundDetail: true,
    })
  }

  securityFundDetailBack = () => {
    this.setState({
      isSecurityFundDetail: false,
    })
  }
  render() {

    let { urls, dataSource, titleType, titleList, isSecurityFundDetail } = this.state;
    const _columns = () => {
      const _this = this
      return [
        {
          title: '店铺名称',
          key: 'shopName',
          dataIndex: 'shopName',
        },
        {
          title: '缴纳状态',
          key: 'type',
          dataIndex: 'type',

        },
        {
          title: '缴纳保证金',
          key: 'totalBalance',
          dataIndex: 'totalBalance',
          sorter: true,
        },
        {
          title: '当前余额',
          key: 'currentBalance',
          dataIndex: 'currentBalance',
          sorter: true,
        },
        {
          title: '应缴金额',
          key: 'needPay',
          dataIndex: 'needPay',
        },
        {
          title: '最近缴纳时间',
          key: 'date',
          dataIndex: 'date',
          sorter: true,
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.charge(item) }}>扣款</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.check(item) }}>查看明细</span>
              </>
            )
          }
        }
      ]
    }
    const searchData = [
      { type: 'input', field: 'name', label: '店铺名称' },
      {
        type: 'select', field: 'paytype', label: '缴纳状态', initialValue: 0, width: 170, list: [
          { id: '0', value: 0, label: '----' },
          { id: '1', value: 1, label: '正常' },
          { id: '2', value: 2, label: '欠费' },
        ]
      },
    ]

    return (
      <div>
        {
          isSecurityFundDetail ? (
            <SecurityFundDetail onBack={this.securityFundDetailBack} />
          ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20, marginBottom: 10 }}>
                  <Radio.Group value={titleType} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
                    {
                      titleList.map((item) => {
                        return (
                          <Radio.Button key={item.id} value={item.id}>{item.value}</Radio.Button>
                        )
                      })
                    }
                  </Radio.Group>
                </div>

                {
                  titleType === 1 && <GtableEdit
                    urls={urls}
                    columns={_columns}
                    dataSource={dataSource}
                    searchData={searchData}
                    isRowSelection={false}
                  />
                }

                {
                  titleType === 2 && <MarginRuleSetting />
                }
              </>
            )
        }
        <SecurityFundForm tirggerRef={ref=> this.securityChild = ref} />

      </div>
    )
  }
}


class SecurityFundModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      title: '',
    }
  }

  componentDidMount() {
    this.props.tirggerRef && this.props.tirggerRef(this)
  }
  show = (item) => {
    console.log(item)
    this.setState({
      visible: true,
      title: '保证金扣款'
    })
  }

  onCancel = () => {
    this.setState({
      visible: false,
    })
  }
  onOk = (e) => {
    e.preventDefault();
    const that = this
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);

        message.success('保存成功')
        that.onCancel()
      }
    });
  }
  render() {

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    const { getFieldDecorator } = this.props.form;
    const { visible, title, } = this.state
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <Form {...formItemLayout}>

          <Form.Item label="当前保证金(元)"> 15 </Form.Item>
          <Form.Item label="扣除金额(元)">
            {getFieldDecorator('charge', { valuePropName: 'value' })(
              <Input style={{ width: 300 }} />
            )}
          </Form.Item>

          <Form.Item label="扣除说明">
            {getFieldDecorator('remark', { valuePropName: 'value' })(
              <TextArea style={{ width: 300 }} />
            )}
          </Form.Item>
        </Form>

      </Modal>
    )
  }
}


const SecurityFundForm = Form.create()(SecurityFundModal)
