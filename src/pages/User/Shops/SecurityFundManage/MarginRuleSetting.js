import React from 'react'
import { Icon,Switch } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import './index.less'
export default class MarginRuleSetting extends React.Component {

  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 0,
          leimu: '印刷用品',
          yingjiaojine: 10000,
          tuihuo: false,
        }
      ]
    }
  }
  render() {
    let { urls, dataSource } = this.state;
    const _columns = () => {
      return [
        {
          title: '类目',
          key: 'leimu',
          dataIndex: 'leimu',
        },
        {
          title: '应缴金额（元）',
          key: 'yingjiaojine',
          dataIndex: 'yingjiaojine',
          editable: true,
        },
        {
          title: '七天无理由退换货',
          key: 'tuihuo',
          render(item) {
            return (
              <Switch
                checkedChildren={<Icon type="plus" />}
                unCheckedChildren={<Icon type="minus" />}
                defaultChecked={item.tuihuo}
              />
            )
          }
        },
      ]
    }
    return (
      <div>

        <div className='title-help'>
          <Icon type="info-circle" style={{ marginRight: 10 }} />
          平台可根据商城的一级分类设置经营该类目的商家应缴纳保证金，商家缴纳相应保证金后，可在商品详情页、店铺首页及订单列表页面出现消费者保障标识；当商家同时经营多个一级类目时则按最高值缴纳；当开启七天无理由退换后，在缴纳保证经卖家的商品详情页面、店铺首页及订单列表页面将出现七天无理由退换货标识。
        </div>


        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          isRowSelection={false} />
      </div>
    )
  }
}