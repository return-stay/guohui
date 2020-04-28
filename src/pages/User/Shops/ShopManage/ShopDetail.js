import React from 'react'
import { Row, Col, Button, message, Modal } from 'antd'
import Gimage from '../../../../common/Gimage'
import { ShopDetial, ShopStatus, ShopUpdate } from '../../../../config/api'
import { dismantleSearch } from '../../../../utils'
import { withRouter } from 'react-router-dom'
import request from '../../../../utils/request'
import AuditDecline from './AuditDecline'
import './detail.less'
const { confirm } = Modal;
class ShopDetail extends React.Component {

  constructor() {
    super()

    this.state = {
      info: {},
      merchantDTO: {},
    }
  }

  componentDidMount() {
    let searchObj = dismantleSearch(this)
    this.setState({
      ...searchObj
    }, () => {
      this.init()
    })

  }
  init = () => {
    let id = this.state.id
    request({
      url: ShopDetial,
      params: {
        id: id,
      },
    }).then(res => {
      console.log(res)
      let resdata = res.data
      this.setState({
        info: resdata,
        merchantDTO: resdata.merchantDTO || {},
      })
    })
  }

  auditDeclineCallback = () => {
    this.init()
  }

  // 创建店铺
  createShop = () => {
    console.log('创建店铺')
    this.createShopRequest()
  }
  // 创建店铺请求
  createShopRequest = () => {
    const that = this
    const info = this.state.info
    const merchant = this.state.merchantDTO
    delete info.merchantDTO
    let params = {
      shop: info,
      merchant: merchant,
    }
    console.log(params)
    request({
      url: ShopUpdate,
      method: 'post',
      data: params
    }).then(res => {
      if (res.code === 100) {
        that.init()
      } else {
        message.success(res.message)
      }
      this.setState({
        confirmLoading: false,
      })
    }).catch(err => {
      console.log(err)
    })
  }
  // 不通过审核
  failTheAudit = (item) => {
    let merchantId = this.state.id
    this.audtChild.show(merchantId)
  }
  // 通过审核
  getApproved = () => {
    const id = this.state.id
    const that = this
    confirm({
      title: '提示',
      content: '确认通过审核吗？',
      onOk() {
        request({
          url: ShopStatus,
          method: 'post',
          data: {
            shopId: Number(id),
            state: 2,
            operator: 'admin',
          }
        }).then(res => {
          message.success('通过审核')
          that.init()
          // that.createShop()
        })
      },
    });
  }
  render() {

    const { info, merchantDTO } = this.state
    return (
      <div className="shop-detail">
        <h1 className="item-title" style={{ borderTop: 'none' }}>基础信息</h1>
        {
          info.attribute === 0 ? <>
            <Row>
              <Col span={6}>
                <span className="col-title">申请人：</span><span>{merchantDTO.name}</span>
              </Col>
              <Col span={6}>
                <span className="col-title">联系方式：</span><span>{merchantDTO.mobile}</span>
              </Col>
              <Col span={6}>
                <span className="col-title" style={{ width: 100 }}>身份证号码：</span><span>{merchantDTO.idCard}</span>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <span className="col-title">证件类型：</span><span>身份证</span>
              </Col>
              <Col span={6}>
                <span className="col-title">申请类型：</span><span>个人</span>
              </Col>
            </Row>
          </> : <>
              <Row>
                <Col span={6}>
                  <span className="col-title">法人姓名：</span><span>{merchantDTO.legalName}</span>
                </Col>
                <Col span={6}>
                  <span className="col-title">联系方式：</span><span>{merchantDTO.mobile}</span>
                </Col>
                <Col span={6}>
                  <span className="col-title">申请类型：</span><span>企业</span>
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  <span className="col-title">身份证号：</span><span>{merchantDTO.idCard}</span>
                </Col>
              </Row>
            </>
        }

        <h2 className="item-title">银行信息</h2>

        <Row>
          <Col span={10}>
            <span className="col-title">开户行：</span><span>{merchantDTO.bankOpen}</span>
          </Col>
          <Col span={10}>
            <span className="col-title">银行卡号：</span><span>{merchantDTO.bankNum}</span>
          </Col>
        </Row>

        <h2 className="item-title">图片信息</h2>

        <Row>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="col-title" style={{ width: 100 }}>身份证图片：</span>
              <Gimage style={{ height: 200, marginRight: 20 }} src={merchantDTO.back} alt="图片" />
              <Gimage style={{ height: 200 }} src={merchantDTO.front} alt="图片" />
            </div>
          </Col>
        </Row>

        {
          merchantDTO.attribute === 1 && <Row>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span className="col-title" style={{ width: 100 }}>营业执照</span>
                <Gimage style={{ height: 200, marginRight: '10px' }} src={info.license} />
              </div>
            </Col>
          </Row>
        }

        <h2 className="item-title">店铺信息</h2>

        <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 16 }}>
          <Row>
            <Col span={24}>
              <span className="col-title">店铺名称：</span><span>{info.name}</span>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <span className="col-title">主营业务：</span><span>{info.mainBiz}</span>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span className="col-title" style={{ width: 100 }}>店铺logo：</span>
                <Gimage style={{ height: 120, marginRight: '10px' }} src={info.logo} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span className="col-title" style={{ width: 100 }}>店铺封面图：</span>
                <Gimage style={{ height: 120, marginRight: '10px' }} src={info.cover} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span className="col-title">店铺介绍：</span><span>{info.shopDesc}</span>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={24} style={{ marginTop: 40 }}>
            <span className="col-title"></span>
            <span>
              {
                info.state === 0 && <>
                  <Button onClick={this.failTheAudit}>不通过审核</Button>
                  <Button type="primary" style={{ marginLeft: 20 }} onClick={this.getApproved}>通过审核</Button>
                </>
              }

              {/* {
                info.state === 3 && <Button type="primary" style={{ marginLeft: 20 }} onClick={this.createShop}>创建店铺</Button>
              } */}
            </span>
          </Col>
        </Row>
        <AuditDecline triggerRef={ref => this.audtChild = ref} successCallback={this.auditDeclineCallback} />
      </div>
    )
  }
}

export default withRouter(ShopDetail)