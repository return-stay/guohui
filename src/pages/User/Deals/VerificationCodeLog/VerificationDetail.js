import React from 'react'

import { Card, Row, Col, Icon, Table, Collapse } from 'antd'
const { Panel } = Collapse;
export default class VerificationDetail extends React.Component {
  collapseChange = (e) => {
    console.log(e)
  }
  render() {
    return (
      <div className="od-detail">
        <div className="od-top">

          <Card title="订单信息" style={{ flex: 1, marginRight: '20px' }}>
            <Row>
              <Col span={6} className="col-left-item">订单状态：</Col>
              <Col span={16}>待发货</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">订 单 号：</Col>
              <Col span={16}>2020012052811950</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">买家：</Col>
              <Col span={16}>a2523990990</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">下单时间：</Col>
              <Col span={16}>2020-01-20 02:38:54</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">支付方式：</Col>
              <Col span={16}>货到付款</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">支付时间：</Col>
              <Col span={16}>2020-01-20 02:38:54</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">联系电话：</Col>
              <Col span={16}>18074675159</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">核销地址：</Col>
              <Col span={16}>辽宁省 营口市 站前区 八田地街道 体育馆路1-甲3西北方向100米</Col>
            </Row>
          </Card>
          <Card title="用户信息" style={{ flex: 1 }}>
            <Row>
              <Col span={6} className="col-left-item">收 货 人：</Col>
              <Col span={16}>待发货</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">手机号码：</Col>
              <Col span={16}>2020012052811950</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">收货地址：</Col>
              <Col span={16}>a2523990990</Col>
            </Row>
            <Row>
              <Col span={6} className="col-left-item">发货时间：</Col>
              <Col span={16}>2020-01-20 02:38:54</Col>
            </Row>
          </Card>
        </div>

        <div style={{ marginTop: 10 }}>
          <VerificationList dataSource={this.props.data} />
        </div>


        <div className="od-title">

          <Icon type="file-text" /> 订单清单
        </div>

        <div className="order-list">

          <OrderList dataSource={[{ id: 0, key: 1 }]} />

        </div>


        <div className="od-top" style={{ marginTop: 16 }}>
          <div className="od-top-left">
            <div className="od-top-left-title">买家留言:</div>
            <div className="od-top-left-cont"></div>
          </div>
          <div className="od-top-right">

            <div className="od-top-right-text">
              <span className="od-top-right-text-left">商品总价：</span>
              <span>￥149.00</span>
            </div>
            <div className="od-top-right-text">
              <span className="od-top-right-text-left">运费：</span>
              <span>￥200.00</span>
            </div>
            <div className="od-top-right-text" style={{ color: '#ff434c' }}>
              <span className="od-top-right-text-left">订单实付金额：</span>
              <span>￥349.00</span>
            </div>
            <div className="od-top-right-text">
              <span className="od-top-right-text-left">货到付款：</span>
              <span>￥349.00</span>
            </div>
          </div>
        </div>

        <Collapse
          bordered={false}
          onChange={this.collapseChange}
          expandIconPosition='right'
        >
          <Panel header="物流详情" key="1" style={{ marginTop: 20, border: 0 }}>
            <LogisticsDetails />
          </Panel>

          <Panel header="订单操作日志" key="2" style={{ marginTop: 20, border: 0 }}>
            <OrderOperationLog dataSource={[{ id: 0, key: 1 }]} />
          </Panel>
        </Collapse>

      </div>
    )
  }
}


const OrderList = (props) => {
  const _columns = [
    {
      title: '商品',
      key: 'name',
      dataIndex: 'teacherName',
      render(grade) {
        return (
          <>
            <div className="">
              {grade}
            </div>
          </>
        )
      }
    },
    {
      title: '规格',
      key: 'dingdna',
      dataIndex: 'teacherName',
    },
    {
      title: '单价/数量',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: '总价',
      key: 'zhifushijian',
      dataIndex: 'teacherName',
    },
    {
      title: '佣金',
      key: 'fukanfangshi',
      dataIndex: 'grade',
    }
  ]
  const { dataSource } = props
  return (
    <Table dataSource={dataSource} columns={_columns} pagination={false} />
  )
}

const VerificationList = (props) => {
  const _columns = [
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
  const { dataSource } = props
  return (
    <Table dataSource={dataSource} columns={_columns} pagination={false} />
  )
}

const LogisticsDetails = (props) => {
  return (<div>物流信息</div>)
}


const OrderOperationLog = (props) => {
  console.log(props)
  const _columns = [
    {
      title: '操作者',
      key: 'dingdna',
      dataIndex: 'teacherName',
    },
    {
      title: '时间',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '描述',
      key: 'teacherName',
      dataIndex: 'teacherName',
    }
  ]
  const { dataSource } = props
  return (
    <Table dataSource={dataSource} columns={_columns} pagination={false} />
  )
}