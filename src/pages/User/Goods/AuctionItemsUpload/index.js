import React from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import AddAuctionItems from './AddAuctionItems'
import './index.less'
const { TextArea } = Input
class AuctionItemsUpload extends React.Component {
  constructor() {
    super()

    this.state = {
      urls: {
        list: '/product/findByPage',
        listMethod: 'POST',
        add: '',
        edit: '',
        delete: '',
      },
    }
  }
  componentDidMount() {
  }

  add = () => {
    this.addChild.add()
  }
  edit = () => {
    this.addChild.edit()
  }
  render() {


    const _columns = (that) => {
      return [
        {
          title: '内部编号',
          key: 'productName',
          render() {
            return (
              <div>xinxi</div>
            )
          }
        },
        {
          title: '拍品名称',
          key: 'productCategoryId',
          dataIndex: 'productCategoryId',
        },
        {
          title: '拍品属性',
          key: 'startPrice',
          dataIndex: 'startPrice',
        },
        {
          title: '数量',
          key: 'endPrice',
          dataIndex: 'endPrice',
          sorter: true,
        },
        {
          title: '作者',
          key: 'startStock',
          dataIndex: 'startStock',
        },
        {
          title: '拍卖届数',
          key: 'startSalesVolume',
          dataIndex: 'startSalesVolume',
          sorter: true,
        },
        {
          title: '年代',
          key: 'status',
          dataIndex: 'status',
        },
        {
          title: '质地形式',
          key: 'VirtualSaleCounts',
          dataIndex: 'VirtualSaleCounts',
        },
        {
          title: '规格',
          key: 'guige',
          dataIndex: 'guige',
        },
        {
          title: '保留价',
          key: 'baoliujia',
          dataIndex: 'baoliujia',
        },
        {
          title: '保证金',
          key: 'baozhengjin',
          dataIndex: 'baozhengjin',
        },
        {
          title: '备注',
          key: 'beizhu',
          dataIndex: 'beizhu',
        }
      ]
    }
    const formLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 12 },
    }

    const { urls } = this.state

    const { getFieldDecorator } = this.props.form
    return (
      <div style={{paddingBottom: 60}}>
        <Form>

          <Row>
            <Col span={6}>
              <Form.Item label="委托方" {...formLayout}>
                {getFieldDecorator('weituofang', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="证件类型" {...formLayout}>
                {getFieldDecorator('zhengjianle', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="证件号码" {...formLayout}>
                {getFieldDecorator('zhengjianhaoma', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="手机" {...formLayout}>
                {getFieldDecorator('shouji', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label="联系地址" {...formLayout}>
                {getFieldDecorator('lianxidizhi', { valuePropName: 'value' })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="国家" {...formLayout}>
                {getFieldDecorator('guojia', { valuePropName: 'value' })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="省份" {...formLayout}>
                {getFieldDecorator('shengfen', { valuePropName: 'value' })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="城市" {...formLayout}>
                {getFieldDecorator('chengshi', { valuePropName: 'value' })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label="其他联系方式" {...formLayout}>
                {getFieldDecorator('otherPhone', { valuePropName: 'value' })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="佣金（%）" {...formLayout}>
                {getFieldDecorator('yongjin', { valuePropName: 'value', rules: [{ required: true, message: '' }] })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="合同签订日期" {...formLayout}>
                {getFieldDecorator('hetongriqi', { valuePropName: 'value' })(<Input placeholder='' />)}
              </Form.Item>
            </Col>
            <Col span={6}></Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="业务员" {...formLayout}>
                {getFieldDecorator('yewuyuan', { valuePropName: 'value' })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="银行账号" {...formLayout}>
                {getFieldDecorator('yinhangzhanghao', { valuePropName: 'value' })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="开户行信息" {...formLayout}>
                {getFieldDecorator('kaihuxinxi', { valuePropName: 'value' })(<Input placeholder='请输入名称' />)}
              </Form.Item>
            </Col>
            <Col span={6}></Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="备注" {...formLayout}>
                {getFieldDecorator('reack', { valuePropName: 'value' })(<TextArea placeholder='请输入名称' style={{ width: 900, maxWidth: 900 }} />)}
              </Form.Item>
            </Col>
          </Row>



          <div>
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.add}>新增拍品信息</Button>
            <Button style={{ marginRight: 10 }} onClick={this.edit}>编辑拍品信息</Button>
            <Button type="danger" style={{ marginRight: 10 }}>删除拍品信息</Button>
            <Button style={{ marginRight: 10 }}>从旧合同中转入</Button>
            <Button>导出EXCEL</Button>
          </div>

          <div style={{ marginTop: 20 }}>
            <GtableEdit
              urls={urls}
              columns={_columns}
              rowKey={rek => rek.productSpecId}
            />
          </div>

          <div className="bottom-btns">
            <Button type="primary" style={{ marginRight: 10 }}>保存</Button>
            <Button style={{ marginRight: 10 }}>保存并转库房</Button>
            <Button style={{ marginRight: 10 }}>取消</Button>
          </div>
        </Form>


        <AddAuctionItems triggerRef={ref=>this.addChild = ref} />
      </div>
    )
  }
}

export default Form.create()(AuctionItemsUpload)