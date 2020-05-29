import React from 'react'

import { Card, Icon, Table, Collapse, Modal, Steps, message } from 'antd'
import { dismantleSearch } from '../../../../utils'
import { OrderDetailApi,OrderMainDetail } from '../../../../config/api'
import request from '../../../../utils/request'
import Gimage from '../../../../common/Gimage'
import './index.less'
const { Panel } = Collapse;
const { Step } = Steps;

export default class OrderDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      childDTO: { productDTOList: [] },
      info: { OrderDetails: [], express: {}, addressDTO: {} },
      payDTO: {},
      productDTOList: []
    }
  }
  componentDidMount() {
    let obj = dismantleSearch(this)
    this.setState({
      ...obj
    })
    request({
      url: OrderDetailApi,
      params: {
        childOrderNo: obj.id,
        md5Str: localStorage.getItem('authed')
      },
    }).then(res => {
      this.setState({
        info: res.data,
        childDTO: res.data.childDTO,
        payDTO: res.data.payDTO || {},
      })
    })
    this.getOrderMainDetail()
  }

  getOrderMainDetail = () => {
    let obj = dismantleSearch(this)
    this.setState({
      ...obj
    })
    console.log(obj)
    request({
      url: OrderMainDetail,
      params: {
        mainOrderNo: obj.mainid,
        md5Str: localStorage.getItem('authed')
      },
    }).then(res => {
      this.setState({
        productDTOList: res.data.productDTOList
      })
    })
  }

  collapseChange = (e) => {
    console.log(e)
  }

  showExpress = (e) => {
    console.log(e)
    if (this.state.info.express && this.state.info.express.data) {
      this.logisticsChild.show()
    } else {
      message.warning('暂无物流详细信息')
    }
  }

  render() {
    const { info, childDTO, payDTO, productDTOList } = this.state
    // let payTypeText = ''
    // let payType = payDTO.payType
    // if (payType === 'WX-JSAPI') {
    //   payTypeText = '微信支付'
    // } else if (payType === 'WX-APP') {
    //   payTypeText = '微信APP支付'
    // } else if (payType === 'ALI-PAY') {
    //   payTypeText = '支付宝'
    // } else if (payType === 'BALANCE') {
    //   payTypeText = '余额'
    // } else if (payType === 'TRANSFER') {
    //   payTypeText = '转账'
    // }
    return (
      <div className="od-detail user-box">
        <div className="od-top">
          <Card title={"订单信息：" + info.orderNo} style={{ flex: 2, border: 'none', marginRight: '20px' }}>
            <div>
              <div className="colo-item">
                <span className="col-left-item">下单时间：</span>
                <span>{info.createTimeStr}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">支付时间：</span>
                <span>{payDTO.payTime}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">收货人信息：</span>
                <span>{info.addressDTO.consignee}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">收货人手机号：</span>
                <span>{info.addressDTO.orderPhone}</span>
              </div>
              <div className="colo-item" style={{ display: 'flex' }}>
                <span className="col-left-item" style={{ flexShrink: 0 }}>收货人地址：</span>
                <span>{info.addressDTO.orderAddress}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">买家留言：</span>
                <span>{info.userMsg}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">支付商户号：</span>
                <span>{payDTO.payFlowNumber}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">支付类型：</span>
                <span>{payDTO.payType}</span>
              </div>
              <div className="colo-item">
                <span className="col-left-item">支付流水号：</span>
                <span>{payDTO.payNo}</span>
              </div>
            </div>
          </Card>

          <Card title="订单状态" style={{ flex: 1, border: 'none', marginRight: '20px' }}>
            {
              info.state === 0 && <span style={{ color: "#333", fontSize: 24 }}>待付款</span>
            }
            {
              info.state === 1 && <span style={{ color: "#333", fontSize: 24 }}>已付款(待发货)</span>
            }
            {
              info.state === 2 && <span style={{ color: "#333", fontSize: 24 }}>已发货(待收货)</span>
            }
            {
              info.state === 4 && <span style={{ color: "#578f9a", fontSize: 24 }}>已完成</span>
            }
            {
              info.state === 5 && <span style={{ color: "#f0c3c4", fontSize: 24 }}>已取消</span>
            }
          </Card>
          <Card title="订单金额" style={{ flex: 1, border: 'none', }}>
            <div>

              <p style={{ color: "#333", fontSize: 18 }}>运费￥{childDTO.postage}</p>
              <p style={{ color: "#333", fontSize: 18 }}>优惠券金额￥{childDTO.couponAmount}</p>
              <p style={{ color: "#f0c3c4", fontSize: 20 }}>订单总价￥{childDTO.totalAmount}</p>
            </div>
          </Card>
        </div>
        <div className="od-title">
          <Icon type="file-text" /> 商品信息
        </div>
        <div className="order-list">
          {/* {
            childDTO && childDTO.productDTOList.length > 0 && <OrderList dataSource={childDTO.productDTOList} />
          } */}
          {
            productDTOList.length > 0 && <OrderList dataSource={productDTOList} />
          }
        </div>

        {/* <div className="od-title od-title-space">
          <span>商铺信息</span>
        </div>

        <div style={{ padding: 20, border: '1px solid #ccc' }}>
          <div>
            <div className="colo-item">
              <span className="col-left-item">提交时间：</span>
              <span>{info.createTime}</span>
            </div>
        </div> */}
        <div className="od-title od-title-space">
          <span>物流信息</span>
          <span className="od-title-right" onClick={this.showExpress}>查看物流信息</span>
        </div>

        {
          childDTO && <div style={{ padding: 20, border: '1px solid #ccc' }}>
            <LogisticsDetails expData={{ expName: childDTO.shipName, express: childDTO.shipNo, }} />
          </div>
        }

        <Collapse
          bordered={false}
          onChange={this.collapseChange}
          expandIconPosition='right'
        >
          <Panel header="订单记录" key="2" style={{ marginTop: 20, border: 0 }}>
            {
              info.traces && info.traces.length > 0 && <OrderOperationLog dataSource={info.traces || []} />
            }
          </Panel>
        </Collapse>
        <ShowExpress express={info.express || {}} triggerRef={ref => this.logisticsChild = ref} />
      </div>
    )
  }
}


const OrderList = (props) => {
  const _columns = [
    {
      title: '商品编号',
      key: 'productId',
      dataIndex: 'productId',
    },
    {
      title: '商品信息',
      key: 'productName',
      render(item) {
        return (
          <>
            <div className="goods-name-item">
              <Gimage src={item.productCover} style={{ width: 30, marginRight: 10 }} alt="图片" />{item.productName}
            </div>
          </>
        )
      }
    },
    {
      title: '商品规格',
      key: 'specParam',
      dataIndex: 'specParam',
      width: 200,
    },
    {
      title: '购买数量',
      key: 'skuCount',
      dataIndex: 'skuCount',
    },
    {
      title: '单价',
      key: 'salePrice',
      dataIndex: 'salePrice',
    },
    {
      title: '主标签',
      key: 'minorLabels',
      render(item) {
        let minorLabelsStr = item.minorLabels.join(',')
        return <span>{minorLabelsStr}</span>
      }
    },
    // {
    //   title: '应付金额',
    //   key: 'actualPrice',
    //   dataIndex: 'actualPrice',
    // }
  ]
  const { dataSource } = props
  return (
    <Table
      rowKey={record => record.skuId}
      dataSource={dataSource}
      columns={_columns}
      pagination={false} />
  )
}

const LogisticsDetails = (props) => {
  const expData = props.expData
  // console.log(expData)
  let nu = expData.express && expData.express.nu && ''
  return (<div>
    <div className="colo-item">
      <span className="col-left-item">物流公司：</span>
      <span>{expData.expName}</span>
    </div>
    <div className="colo-item">
      <span className="col-left-item">物流编号：</span>
      <span>{nu}</span>
    </div>
  </div>)
}


// 物流详情
class ShowExpress extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }
  show = () => {
    this.setState({
      visible: true,
    })
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { visible } = this.state
    const { express } = this.props
    // console.log(express)
    return <Modal
      visible={visible}
      title="物流信息"
      onCancel={this.onCancel}
      footer={null}
    >
      <div className="local-modal">

        <Steps progressDot direction="vertical">
          {
            express.data && express.data.map((item, index) => {
              return <Step key={index} style={{ width: '100%' }} title={item.context} description={item.ftime} />
            })
          }
        </Steps>
      </div>
    </Modal>
  }
}


// 订单操作

const OrderOperationLog = (props) => {
  console.log(props)
  const _columns = [
    // {
    //   title: '操作者',
    //   key: 'orderId',
    //   dataIndex: 'orderId',
    // },
    {
      title: '时间',
      key: 'traceTime',
      dataIndex: 'traceTime',
    },
    {
      title: '描述',
      key: 'traceDetail',
      dataIndex: 'traceDetail',
    }
  ]
  const { dataSource } = props
  return (
    <Table dataSource={dataSource} columns={_columns} pagination={false} rowKey={rew => rew.id} />
  )
}


