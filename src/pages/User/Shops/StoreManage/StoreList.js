import React from 'react'

import { Divider, Modal, Input } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import { withRouter } from 'react-router-dom'
import Gimage from '../../../../common/Gimage'
import './index.less'
const { confirm } = Modal;
class StoreList extends React.Component {
  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          ShopName: "test店铺",
          ShopBranchInTagNames: "",
          ShopBranchTagId: null,
          Id: 128,
          ShopId: 378,
          ShopBranchName: "故宫门店",
          AddressId: 3653,
          AddressDetail: "景山前街4号故宫博物院内",
          AddressFullName: "北京,北京市,东城区,东华门街道,景山前街4号故宫博物院内",
          ContactUser: "123",
          ContactPhone: "-",
          Status: 0,
          CreateDate: "/Date(-62135596800000)/",
          UserName: null,
          PasswordOne: null,
          PasswordTwo: null,
          RegionIdPath: null,
          ServeRadius: 0,
          Longitude: 0,
          Latitude: 0,
          ShopImages: null,
          Distance: 0,
          DistanceUnit: null,
          Enabled: false,
          AddressPath: null,
          IsStoreDelive: false,
          IsAboveSelf: false,
          DeliveFee: 0,
          FreeMailFee: 0,
          IsFreeMail: false,
          DeliveTotalFee: 0,
          StoreOpenStartTime: { Ticks: 0, Days: 0, Hours: 0, Milliseconds: 0, Minutes: 0, Seconds: 0, TotalDays: 0, TotalHours: 0 },
          StoreOpenEndTime: { Ticks: 0, Days: 0, Hours: 0, Milliseconds: 0, Minutes: 0, Seconds: 0, TotalDays: 0, TotalHours: 0 },
          RecommendSequence: 0,
          IsRecommend: false,
          CommentScore: 0,
          DaDaShopId: null,
          IsAutoPrint: false,
          PrintCount: 0,
          EnableSellerManager: false,
          IsShelvesProduct: false,
        }
      ]
    }
  }

  // 商品
  storeGoods = (item) => {
    this.props.storeGoods(item)
  }

  freeze = (item) => {
    confirm({
      title: '冻结店铺将导致商家无法登陆后台,商品会自动下架，请谨慎操作！',
      onOk() {
        console.log(item);
      },
    });
  }

  orderNavigation = (item) => {
    console.log(item)
    this.props.history.push({
      pathname: '/user/deals/order'
    })
  }

  interlinkage = (item) => {
    this.interlinkageChild.show(item)
  }
  render() {
    let { urls, dataSource } = this.state;
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '门店名称',
          key: 'ShopBranchName',
          dataIndex: 'ShopBranchName',
        },
        {
          title: '商家',
          key: 'ShopName',
          dataIndex: 'ShopName',
        },
        {
          title: '标签',
          key: 'Latitude',
          dataIndex: 'Latitude',
        },
        {
          title: '联系人',
          key: 'ContactUser',
          dataIndex: 'ContactUser',
        },
        {
          title: '联系方式',
          key: 'ContactPhone',
          dataIndex: 'ContactPhone',
          sorter: true,
        },
        {
          title: '门店地址',
          key: 'AddressFullName',
          dataIndex: 'AddressFullName',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.freeze(item) }}>冻结</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.orderNavigation(item) }}>订单</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.storeGoods(item) }}>商品</span>

                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.interlinkage(item) }}>链接</span>
              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'Name', label: '门店名称' },
      { type: 'input', field: 'User', label: '联系人' },
      {
        type: 'select', field: 'ShopGrade', width: '170px', label: '门店选择', initialValue: '0', list: [
          { id: 0, value: '0', label: '请选择...' },
          { id: 1, value: 'vip', label: '钻石店铺' },
          { id: 2, value: 'putong', label: '普通会员' },
          { id: 3, value: 'huangjin', label: '黄金店铺' },
        ]
      },
      {
        type: 'select', field: 'Status', width: '170px', label: '上架名称', initialValue: '0', list: [
          { id: 0, value: '0', label: '请选择...' },
          { id: 1, value: 'bukeyong', label: '不可用' },
          { id: 2, value: 'daishenhe', label: '待审核' },
          { id: 3, value: 'beijujue', label: '被拒绝' },
        ]
      },
    ]

    return (
      <>
        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
        />
        <InterlinkageModal triggerRef={ref => this.interlinkageChild = ref} />
      </>
    )
  }
}

export default withRouter(StoreList)


class InterlinkageModal extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }
  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  show = (item) => {
    this.setState({
      visible: true,
      interlinkageItem: item
    })
  }

  onCancel = (item) => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { visible } = this.state;
    return (
      <Modal
        visible={visible}
        title="门店链接"
        footer={null}
        onCancel={this.onCancel}
        destroyOnClose={true}
      >

        <div className="im-line">
          <div className="im-line-left"><i>*</i> 推广链接：</div>
          <div className="im-line-right">
            <Input value="http://tiyan.himall.kuaidiantong.cn/m-wap/shopbranch/index/128" />
          </div>
        </div>


        <div className="im-line">
          <div className="im-line-left"> 二维码：</div>
          <div className="im-line-right">
            <Gimage />
          </div>
        </div>

      </Modal>
    )
  }
}