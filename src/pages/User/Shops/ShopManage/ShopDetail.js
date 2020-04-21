import React from 'react'
import { Row, Col, Button, message, Modal } from 'antd'
import Gimage from '../../../../common/Gimage'
import { MerchantDetail, MerchantAuditPass, ShopUpdate } from '../../../../config/api'
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
      shops: []
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
      url: MerchantDetail + '/' + id,
      params: { md5Str: localStorage.getItem('authed') },
    }).then(res => {
      console.log(res)
      console.log(this)
      this.setState({
        info: res.data,
        shops: res.data.shops
      })
    })
  }

  auditDeclineCallback = () => {
    this.init()
  }

  // 创建店铺
  createShop = () => {
    console.log('创建店铺')
    const info = this.state.info
    const shops = info.shops
    for (let i = 0; i < shops.length; i++) {
      if (shops[i].state === 0) {
        this.createShopRequest(shops[i])
      }
    }
    // this.props.history.push({
    //   pathname: '/user/shops/detail',
    //   search: searchJoint({
    //     type: '',
    //     id: info.id
    //   })
    // })
  }
  // 创建店铺请求
  createShopRequest = (shopItem) => {
    const that = this
    const info = this.state.info
    let params = {
      shopType: info.type,
      idCard: info.legalIdcardCode,
      mobile: info.mobile,
      bankCard: info.cardNo,
      bankName: info.openBank,
      idCardFrontPic: info.idCardFaceUrl,
      idCardFrontPicId: info.legalIdcardFaceId,
      idCardBackPic: info.idCardBackUrl,
      idCardBackPicId: info.legalIdcardBackId,
      userId: info.userId,
      state: 3,
    }

    if (info.type === 1) {
      params.userName = info.name
    } else {
      params.companyName = info.name
      params.userName = info.legalName
      params.businessLicenseFront = info.businessLicenseFaceUrl
      params.businessLicenseFrontId = info.businessLicenseFaceId
    }

    params.shopName = shopItem.shopName
    params.tradeIds = shopItem.tradeIds
    params.shopOwnerAccount = shopItem.shopownerAccount || '1'
    params.stars = shopItem.stars
    params.authLevel = shopItem.authLevel
    params.shopLogo = shopItem.logoPicUrl
    params.shopCover = shopItem.coverPicUrl
    params.shopDesc = shopItem.shopDesc
    params.recommend = shopItem.recommend
    console.log(params)
    request({
      url: ShopUpdate,
      method: 'post',
      params: { md5Str: localStorage.getItem('authed') },
      data: params
    }).then(res => {
      if (res.code === 100) {
        message.success('创建完成')
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
          url: MerchantAuditPass,
          method: 'post',
          params: { md5Str: localStorage.getItem('authed') },
          data: {
            merchantId: id
          }
        }).then(res => {
          message.success('通过审核')
          that.init()
        })
      },
    });
  }
  render() {

    const { info, shops } = this.state
    console.log(shops)
    return (
      <div className="shop-detail">
        <h1 className="item-title" style={{ borderTop: 'none' }}>基础信息</h1>
        {
          info.type === 1 ? <>
            <Row>
              <Col span={6}>
                <span className="col-title">申请人：</span><span>{info.name}</span>
              </Col>
              <Col span={6}>
                <span className="col-title">联系方式：</span><span>{info.mobile}</span>
              </Col>
              <Col span={6}>
                <span className="col-title" style={{ width: 100 }}>身份证号码：</span><span>{info.cardNo}</span>
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
                  <span className="col-title">法人姓名：</span><span>{info.legalName}</span>
                </Col>
                <Col span={6}>
                  <span className="col-title">联系方式：</span><span>{info.mobile}</span>
                </Col>
                <Col span={6}>
                  <span className="col-title">申请类型：</span><span>企业</span>
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  <span className="col-title">身份证号：</span><span>{info.legalIdcardCode}</span>
                </Col>
              </Row>
            </>
        }

        <h2 className="item-title">银行信息</h2>

        <Row>
          <Col span={10}>
            <span className="col-title">开户行：</span><span>{info.openBank}</span>
          </Col>
          <Col span={10}>
            <span className="col-title">银行卡号：</span><span>{info.cardNo}</span>
          </Col>
        </Row>

        <h2 className="item-title">图片信息</h2>

        <Row>
          <Col span={24}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="col-title" style={{ width: 100 }}>身份证图片：</span>
              <Gimage style={{ height: 200, marginRight: 20 }} src={info.idCardFaceUrl} alt="图片" />
              <Gimage style={{ height: 200 }} src={info.idCardBackUrl} alt="图片" />
            </div>
          </Col>
        </Row>

        {
          info.type === 0 && <Row>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span className="col-title" style={{ width: 100 }}>营业执照</span>
                <Gimage style={{ height: 200, marginRight: '10px' }} src={info.businessLicenseFaceUrl} />
              </div>
            </Col>
          </Row>
        }

        <h2 className="item-title">店铺信息</h2>

        {
          shops.map(item => {
            return <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 16 }} key={item.shopId}>
              <Row>
                <Col span={24}>
                  <span className="col-title">店铺名称：</span><span>{item.shopName}</span>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <span className="col-title">主营业务：</span><span>{item.trade}</span>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span className="col-title" style={{ width: 100 }}>店铺logo：</span>
                    <Gimage style={{ height: 120, marginRight: '10px' }} src={item.logoPicUrl} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span className="col-title" style={{ width: 100 }}>店铺封面图：</span>
                    <Gimage style={{ height: 120, marginRight: '10px' }} src={item.coverPicUrl} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <span className="col-title">店铺介绍：</span><span>{item.shopDesc}</span>
                </Col>
              </Row>
            </div>
          })
        }
        <Row>
          <Col span={24} style={{ marginTop: 40 }}>
            <span className="col-title"></span>
            <span>
              {info.state === 0 && <>
                <Button onClick={this.failTheAudit}>不通过审核</Button>
                <Button type="primary" style={{ marginLeft: 20 }} onClick={this.getApproved}>通过审核</Button>
              </>}

              {
                info.state === 3 && <Button type="primary" style={{ marginLeft: 20 }} onClick={this.createShop}>创建店铺</Button>
              }
            </span>
          </Col>
        </Row>
        <AuditDecline triggerRef={ref => this.audtChild = ref} successCallback={this.auditDeclineCallback} />
      </div>
    )
  }
}

export default withRouter(ShopDetail)