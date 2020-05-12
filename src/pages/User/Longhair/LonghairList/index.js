

import React from 'react'
import { Tabs, Divider, message, Modal } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import LonghairAdd from './LonghairAdd'
import Gimage from '../../../../common/Gimage'
import LonghairDetail from './LonghairDetail'
import request from "../../../../utils/request";
import { ArtistRecommend, ArtistUpDown, ArtistDelete } from '../../../../config/api'
const { TabPane } = Tabs
class LonghairList extends React.Component {
  state = {
    isDetail: false,
    orderType: 0,
    orderStatus: '0',
    urls: {
      list: '/artist/findArtist',
      listMethod: 'post',
    },
    tabValue: '1',
    messageText: '新增艺术家'
  }
  tabChange = (e) => {
    this.setState({
      tabValue: e,
      artistid: null,
      messageText: '新增艺术家',
    })
  }

  successCallback = () => {
    this.setState({
      tabValue: '1',
      messageText: '新增艺术家'
    }, () => {
      this.tableChild.sortingParameters();
    })
  }

  show = (item, str) => {
    this.setState({
      tabValue: '2',
      artistid: item.artistId,
      messageText: str === 'edit' ? '编辑艺术家' : '查看详情'
    })
  }

  edit = (item) => {
    this.show(item, 'edit')
  }

  checkDetiai = (item) => {
    this.setState({
      isDetail: true,
      artistid: item.artistId,
    })
  }
  goback = () => {
    this.setState({
      isDetail: false,
      artistid: null,
    })
  }

  handleDelete = (item) => {
    console.log(item)
    const that = this
    this.modalConfirm('确定删除该艺术家吗？', () => {
      request({
        url: ArtistDelete,
        params: {
          artistId: item.artistId,
        }
      }).then(res => {
        if (res.code === 100) {
          message.success('删除成功')
          that.tableChild.sortingParameters();
        }
      })
    })
  }

  modalConfirm = (text, callback) => {
    Modal.confirm({
      title: '提示',
      content: text,
      onOk() {
        callback && callback()
      },
    })
  }

  recommendHandle = (item, type) => {
    let modalText = '确定取消推荐吗？'
    if (type === 0) {
      modalText = '确定推荐该艺术家吗？'
    }
    const that = this

    this.modalConfirm(modalText, () => {
      request({
        url: ArtistRecommend,
        params: {
          artistId: item.artistId,
          recommend: type
        }
      }).then(res => {
        if (res.code === 100) {
          let text = ''
          if (type === 1) {
            text = '取消推荐成功'
          } else {
            text = '推荐成功'
          }
          message.success(text)
          that.tableChild.sortingParameters();
        }
      })
    })

  }
  availableHandle = (item, type) => {
    let modalText = '确定下线该艺术家吗？'
    if (type === 0) {
      modalText = '确定上线该艺术家吗？'
    }
    const that = this

    this.modalConfirm(modalText, () => {
      request({
        url: ArtistUpDown,
        params: {
          artistId: item.artistId,
          status: type
        }
      }).then(res => {
        if (res.code === 100) {
          let text = ''
          if (type === 1) {
            text = '下线成功'
          } else {
            text = '上线成功'
          }
          message.success(text)
          that.tableChild.sortingParameters();
        }
      })
    })
  }

  render() {
    const _columns = (that) => {
      return [
        {
          title: '序号',
          key: 'artistId',
          dataIndex: 'artistId',
        },
        {
          title: '艺术家头像',
          key: 'portrait',
          dataIndex: 'portrait',
          width: 90,
          render(portrait) {
            return <Gimage src={portrait} style={{ height: 30 }} />
          }
        },

        {
          title: '艺术家名称',
          key: 'artistName',
          dataIndex: 'artistName',
          width: 110,
        },
        {
          title: '粉丝数',
          key: 'count',
          sorter: true,
          render(item) {
            return <span>{item.fansCount}</span>
          }
        },
        {
          title: '拍品数量',
          key: 'all',
          sorter: true,
          render(item) {
            return <span>{item.productCount}</span>
          }
        },
        {
          title: '状态',
          key: 'available',
          dataIndex: 'available',
          render(available) {
            return <span>{available === 0 ? "已上线" : "已下线"}</span>
          }
        },
        {
          title: '是否签约',
          key: 'signing',
          dataIndex: 'signing',
          render(signing) {
            return <span>{signing === 0 ? "未签约" : "已签约"}</span>
          }
        },
        {
          title: '是否推荐',
          key: 'recommend',
          dataIndex: 'recommend',
          render(recommend) {
            return <span>{recommend === 0 ? "推荐" : "未推荐"}</span>
          }
        },
        {
          title: '添加时间',
          key: 'createTimeStr',
          dataIndex: 'createTimeStr',
          width: 170,
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
          render: (item) => {
            const spanStyle = { color: '#1890ff', cursor: 'pointer' }
            return (
              <>
                <span style={spanStyle} onClick={() => this.edit(item)}>编辑</span>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={() => { this.checkDetiai(item) }}>查看详情</span>
                <Divider type="vertical" />
                <span style={spanStyle} onClick={() => this.handleDelete(item)}>删除</span>
                <Divider type="vertical" />
                {
                  item.recommend === 0 ?
                    <span style={spanStyle} onClick={() => this.recommendHandle(item, 1)}>取消推荐</span> :
                    <span style={spanStyle} onClick={() => this.recommendHandle(item, 0)}>推荐</span>
                }
                <Divider type="vertical" />
                {
                  item.available === 0 ?
                    <span style={spanStyle} onClick={() => this.availableHandle(item, 1)}>下线</span> :
                    <span style={spanStyle} onClick={() => this.availableHandle(item, 0)}>上线</span>
                }
              </>
            )
          }
        }
      ]
    }

    const { urls, tabValue, messageText, artistid, isDetail } = this.state
    const searchData = [
      { type: 'input', field: 'keyword', width: '170px', label: '艺术家名称', placeholder: '请输入艺术家名称', },
      {
        type: 'select', field: 'available', width: '170px', label: '状态', list: [
          { label: '全部', value: '-1' },
          { label: '下线', value: '1' },
          { label: '上线', value: '0' },
        ], placeholder: '请选择状态'
      },
      {
        type: 'select', field: 'recommend', width: '170px', label: '是否推荐', list: [
          { label: '全部', value: '-1' },
          { label: '推荐', value: '0' },
          { label: '不推荐', value: '1' },
        ], placeholder: '请选择'
      },
      {
        type: 'select', field: 'signing', width: '170px', label: '是否签约', list: [
          { label: '全部', value: '-1' },
          { label: '已签约', value: '1' },
          { label: '未签约', value: '0' },
        ], placeholder: '请选择'
      },
    ]
    return (
      <div className="om-box user-bg">
        <div style={{ display: isDetail ? 'none' : 'block' }}>
          <Tabs activeKey={tabValue} onChange={this.tabChange}>
            <TabPane tab="艺术家列表" key="1">
              <GtableEdit
                urls={urls}
                rowKey={record => record.artistId}
                searchData={searchData}
                columns={_columns}
                bordered={false}
                pagination={true}
                isRowSelection={false}
                triggerRef={ref => { this.tableChild = ref }}
              />
            </TabPane>
            <TabPane tab={messageText} key="2">
              {tabValue === '2' && <LonghairAdd triggerRef={ref => this.addChild = ref} successCallback={this.successCallback} messageText={messageText} artistid={artistid} />}
            </TabPane>
          </Tabs>
        </div>
        {
          isDetail && <LonghairDetail artistid={artistid} goback={this.goback} />
        }
      </div>
    )
  }
}


export default LonghairList