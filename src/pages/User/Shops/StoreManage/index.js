import React from 'react'
import { Radio, Popover, Icon } from 'antd'
import StoreList from './StoreList'
import StoreLabelSetting from './StoreLabelSetting'
import StoreGoods from './StoreGoods'
export default class StoreManage extends React.Component {
  state = {
    titleList: [
      { value: '门店列表', id: 1, type: 1 },
      { value: '门店标签设置', id: 2, type: 2 },
    ],
    titleType: 1,
    isShopHome: true,
    isStoreGoods: false,
  }

  expressTabsChange = (e) => {
    let type = e.target.value
    this.setState({
      titleType: type
    })
  }
  // 店铺详情返回
  shopDetailBack = () => {
    this.setState({
      titleType: 1,
    })
    this.setOtherBool()
  }

  storeGoods = (item) => {
    this.setState({
      storeGoodsItem: item,
      isShopHome: false,
      isStoreGoods: true,
    })
  }
  storeGoodsBack = () => {
    this.setState({
      isShopHome: true,
      isStoreGoods: false,
    })
  }
  render() {

    let { titleList, isShopHome, titleType, isStoreGoods } = this.state;
    const listStyle = { color: '#b2ebf2', listStyleType: 'square', marginTop: 10, fontSize: 14 }
    const content = (
      <div style={{ padding: 20, width: 520 }}>
        <h5>温馨提示：</h5>
        <ul>
          <li style={listStyle}>
            <span style={{ color: '#747474' }}>门店标签：平台可设置标签来帮助会员筛选门店，商家添加门店时可以打上某门店标签。平台编辑周边门店页面时可以导航过去，显示标签所关联的本市所有门店。</span>
          </li>

          <li style={{ color: 'red', listStyleType: 'square', marginTop: 10, fontSize: 14 }}>
            <div style={{ color: 'red' }}>注意：冻结门店后，门店商品都会下架。解冻后，门店商品需要重新上架。</div>
          </li>
        </ul>
      </div>
    );

    return (
      <>

        {
          isShopHome && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
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
              </div>

              <div style={{ marginTop: 10 }}>
                {
                  titleType === 1 && <StoreList storeGoods={this.storeGoods} />
                }
                {
                  titleType === 2 && <StoreLabelSetting />
                }
              </div>

            </div>
          )
        }

        {isStoreGoods && (
          <StoreGoods storeGoodsBack={this.storeGoodsBack} />
        )}
      </>
    )
  }
}
