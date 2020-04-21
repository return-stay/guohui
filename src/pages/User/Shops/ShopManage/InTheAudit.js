import React from 'react'
import { Divider, Button, Modal, Tabs, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import shopManageData from './shopManageData'
import { withRouter } from 'react-router-dom'
import { searchJoint } from '../../../../utils'
import { MerchantBatchDel, MerchantAuditPass } from '../../../../config/api'

import request from '../../../../utils/request'
import AuditDecline from './AuditDecline'
const { confirm } = Modal
const { TabPane } = Tabs

class InTheAudit extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '/merchant/list',
        listMethod: 'post',
      },
      tabType: '0',
      dataSource: shopManageData,
      titleList: [
        { value: '待审核列表', id: 0, type: 0 },
        { value: '通过审核', id: 3, type: 3 },
        { value: '未通过审核', id: 1, type: 1 },
      ],
    }
  }
  selectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows,
    })
  }

  tabCallback = (key) => {
    this.setState({
      tabType: key
    }, () => {
      this.tableChild.sortingParameters();
    })
  }

  auditInfo = (item) => {
    this.props.auditInfo(item)
  }

  batchHandle = () => {
    let selectedRows = this.state.selectedRows
    if (selectedRows.length > 0) {
      let arr = []
      for (let i = 0; i < selectedRows.length; i++) {
        arr.push(selectedRows[i].merchantId)
      }

      this.deleteRequest(arr.join(','))

    } else {
      message.warning('请先选择至少一条数据')
    }
  }

  auditDeclineCallback = () => {
    this.tableChild.sortingParameters();
  }

  failTheAudit = (item) => {
    this.audtChild.show(item.merchantId)
  }
  // 通过审核
  getApproved = (item) => {
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
            merchantId: item.merchantId
          }
        }).then(res => {
          message.success('通过审核')
          that.tableChild.sortingParameters();
        })
      },
    });
  }

  detail = (item, status) => {
    this.props.history.push({
      pathname: '/user/shops/detail',
      search: searchJoint({
        status: status,
        shopType: item.type,
        id: item.merchantId,
      })
    })
  }

  deleteRequest = (ids) => {
    request({
      url: MerchantBatchDel,
      method: 'get',
      params: {
        md5Str: localStorage.getItem('authed'),
        merchantIds: ids,
      },
    }).then(res => {
      console.log(res)
      this.tableChild.sortingParameters();
    })
  }

  delete = (item) => {
    console.log(item)
    const that = this
    confirm({
      title: '确定删除吗?',
      content: '删除之后不可以恢复。',
      onOk() {
        that.deleteRequest(item.merchantId)
      },
    });
  }

  setHash = () => {
    console.log(window.location.hash)
    let gethash = window.location.hash
    window.location.hash = gethash + '?test=qw4'
  }

  render() {
    let { urls, titleList, tabType } = this.state;
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '序号',
          key: 'merchantId',
          dataIndex: 'merchantId',
        },
        {
          title: '申请人',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '手机号',
          key: 'mobile',
          dataIndex: 'mobile',
        },
        {
          title: '申请类型',
          key: 'type',
          dataIndex: 'type',
          render(type) {
            return <span >{type === 0 ? '企业' : '个人'}</span>
          }
        },
        // {
        //   title: '有效期',
        //   key: 'valid',
        //   dataIndex: 'valid',
        // },
        {
          title: '申请时间',
          key: 'createTime',
          dataIndex: 'createTime',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.detail(item, 'detail') }}>查看详情</span>

                {
                  item.state === 0 && (
                    <>
                      <Divider type="vertical" />
                      <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.failTheAudit(item) }}>不通过</span>
                      <Divider type="vertical" />
                      <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.getApproved(item) }}>通过</span>
                    </>
                  )
                }

                {
                  item.state === 3 && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.detail(item, 'create') }}>创建店铺</span>
                  </>
                }

                {
                  item.state !== 3 && <>
                    <Divider type="vertical" />
                    <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.delete(item) }}>删除</span>
                  </>
                }
              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'nameOrMobile', label: '姓名/手机号' },
      { type: 'chooseTime', field: 'date', label: '申请时间', beginTime: 'startTime', EndTime: 'endTime' },
      {
        type: 'select', field: 'type', width: '170px', label: '类型', placeholder: "请选择申请类型", list: [
          { id: 0, value: '0', label: '企业' },
          { id: 1, value: '1', label: '个人' },
        ]
      },
    ]

    return (
      <>
        {
          titleList && titleList.length > 0 && (
            <div >
              <Tabs defaultActiveKey='0' onChange={this.tabCallback}>
                {
                  titleList.map((item) => <TabPane tab={item.value} key={item.id}></TabPane>)
                }
              </Tabs>
            </div>
          )
        }
        <div>
          <Button onClick={this.batchHandle} style={{ marginBottom: 16, marginLeft: 10 }}>
            批量删除
          </Button>
          <Button onClick={this.setHash} style={{ marginBottom: 16, marginLeft: 10 }}>
            修改hash
          </Button>
        </div>
        <GtableEdit
          triggerRef={ref => this.tableChild = ref}
          rowKey={record => record.merchantId}
          urls={urls}
          searchData={searchData}
          columns={_columns}
          query={{
            state: Number(tabType),
          }}
          pagination={true}
          isRowSelection={true}
          selectChange={this.selectChange}
        />

        <AuditDecline triggerRef={ref => this.audtChild = ref} successCallback={this.auditDeclineCallback} />
      </>
    )
  }
}

export default withRouter(InTheAudit)

