import React from 'react'
// import { Radio, Popover, Icon, } from 'antd'
import ShopManageTable from './ShopManageTable'
import ShopDetail from './ShopDetail'

import InTheAudit from './InTheAudit'
import BusinessCategoryAudit from './BusinessCategoryAudit'
import AuditDetail from './AuditDetail'
import BusinessCategoryAuditDetail from './BusinessCategoryAuditDetail'
export default class ShopManage extends React.Component {
  state = {
    titleList: [
      { value: '店铺管理', id: 1, type: 1 },
      { value: '入驻审核', id: 2, type: 2 },
      { value: '经营类目审核', id: 3, type: 3 },
    ],
    titleType: 1,
    isShopHome: true,
    isShopInfo: false,
    isAuditInfo: false,
  }
  setOtherBool = () => {
    this.setState({
      isShopHome: true,
      isShopInfo: false,
      isAuditInfo: false,
      isBusinessDetail: false,
    })
  }
  // 店铺详情返回
  shopDetailBack = () => {
    this.setState({
      titleType: 1,
    })
    this.setOtherBool()
  }
  // 审核详情
  auditDetailBack = () => {
    this.setState({
      titleType: 2
    })
    this.setOtherBool()
  }


  // 经营类目审核返回
  businessDetailBack = () => {
    this.setState({
      titleType: 3,
    })
    this.setOtherBool()
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    this.setState({
      titleType: type
    })
  }

  // 查看店铺详情
  checkShopInfo = (item, type) => {
    this.setState({
      isShopHome: false,
      isShopInfo: true,

    }, () => {
      if (type === 'edit') {
        this.shopDetailChild.edit(item)
      } else {
        this.shopDetailChild.check(item)
      }
    })
  }
  // 审核详情
  auditInfo = (item) => {
    this.setState({
      isShopHome: false,
      isAuditInfo: true,
    }, () => {
      this.auditInfoChild.show(item)
    })
  }
  // 商家类目审核详情
  checkBusinessCategoryAuditDetail = (item) => {
    this.setState({
      isShopHome: false,
      isBusinessDetail: true,
    }, () => {
      this.businessDetailChild.show(item)
    })

  }
  render() {

    let { isShopHome, titleType, isShopInfo, isAuditInfo ,isBusinessDetail} = this.state;
    // const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    // const content = (
    //   <div style={{ padding: 20, width: 520 }}>
    //     <h5>温馨提示：</h5>
    //     <ul>
    //       <li style={listStyle}>
    //         <span style={{ color: '#747474' }}>官方自营店默认拥有所有类目的经营权限，入驻商家需要申请经营类目。</span>
    //       </li>

    //       <li style={listStyle}>
    //         <div style={{ color: '#747474' }}>商家冻结后，商家将无法登录卖家中心，店铺所有商品都会下架， 商家下面的所有门店也会冻结。商家解冻后，所有商品需要重新上架，所有门店也需要重新解冻。</div>
    //       </li>
    //     </ul>
    //   </div>
    // );

    return (
      <>

        {
          isShopHome && (
            <div>
              {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
                <Radio.Group value={titleType} buttonStyle="solid" size="large" onChange={this.expressTabsChange}>
                  {
                    titleList.map((item) => {
                      return (
                        <Radio.Button key={item.id} value={item.id}>{item.value}</Radio.Button>
                      )
                    })
                  }
                </Radio.Group>

                <Popover content={content} placement="leftBottom">
                  <Icon type="question-circle" style={{ color: '#ccc' }} />
                </Popover>
              </div> */}

              <div style={{ marginTop: 0 }}>
                {
                  titleType === 1 && <ShopManageTable checkShopInfo={this.checkShopInfo} />
                }
                {
                  titleType === 2 && <InTheAudit auditInfo={this.auditInfo} />
                }
                {
                  titleType === 3 && <BusinessCategoryAudit checkBusinessCategoryAuditDetail={this.checkBusinessCategoryAuditDetail} />
                }
              </div>

            </div>
          )
        }

        {
          isShopInfo && (
            <ShopDetail tirggerRef={ref => this.shopDetailChild = ref} shopDetailBack={this.shopDetailBack} />
          )
        }

        {
          isAuditInfo && <AuditDetail tirggerRef={ref => this.auditInfoChild = ref} auditDetailBack={this.auditDetailBack} />
        }
        {
          isBusinessDetail && (
            <BusinessCategoryAuditDetail tirggerRef={ref => this.businessDetailChild = ref} businessDetailBack={this.businessDetailBack} />
          )
        }
      </>
    )
  }
}
