

import React from 'react'
import { Modal, message, Form, Input } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import Gimage from '../../../../common/Gimage'
import UserDetail from './UserDetail'
import request from "../../../../utils/request";
// import {
//   UserRecommendUser,
//   UserRecommendUserCancel,
//   UserSetUserLabel,
// } from '../../../../config/api'
class UserManage extends React.Component {
  state = {
    isDetail: false,
    orderType: 0,
    orderStatus: '0',
    selectedRowKeys: [],
    urls: {
      list: '/user/v1/search',
      listMethod: 'post',
    },
    tabValue: '1',
    messageText: '新增用户'
  }

  recommendHandle = (item, type) => {
    let modalText = '确定取消推荐该用户吗？'
    if (type === 1) {
      modalText = '确定推荐该用户吗？'
    }
    const that = this
    Modal.confirm({
      title: '提示',
      content: modalText,
      onOk() {
        let url = ''
        if (type === 1) {
          // url = UserRecommendUser
        } else {
          // url = UserRecommendUserCancel
        }
        request({
          url: url,
          params: {
            md5Str: localStorage.getItem('authed'),
            userid: item.id,
          },
        }).then(res => {
          if (res.code === 100) {
            let text = ''
            if (type === 1) {
              text = '推荐成功'
            } else {
              text = '取消推进成功'
            }
            message.success(text)
            that.tableChild.sortingParameters();
          }
        })
      },
    })
  }

  selectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys)
    this.setState({
      selectedRowKeys
    })
  }

  successCallback = () => {
    this.tableChild.sortingParameters();
  }

  setLable = (item) => {
    // let selectedRowKeys = this.state.selectedRowKeys
    // if (selectedRowKeys.length > 0) {
    //   this.addChild.show(selectedRowKeys)
    // } else {
    //   message.warning('至少选择一个用户')
    // }
    this.addChild.show(item.id)
  }

  render() {
    const _columns = (that) => {
      return [
        {
          title: '用户ID',
          key: 'userId',
          dataIndex: 'userId',
          align: 'center',
          width: 80,
        },
        {
          title: '用户名称',
          dataIndex: 'userName',
          key: 'userName',
          width: 130,
        },
        {
          title: '头像/昵称',
          key: 'headimageurl',
          width: 120,
          align: 'center',
          render(item) {
            return <div >
              <Gimage src={item.portrait} style={{ height: 30 }} />
              <div style={{ fontSize: 13, marginTop: 4 }}>{item.nickName}</div>
            </div>
          }
        },

        {
          title: '性别',
          key: 'gender',
          dataIndex: 'gender',
          align: 'center',
          width: 60,
          render(sex) {
            return <span>{sex === 0 ? '男' : '女'}</span>
          }
        },
        {
          title: '手机号',
          key: 'mobile',
          dataIndex: 'mobile',
          align: 'center',
          width: 140,
        },
        {
          title: '注册渠道',
          key: 'channel',
          dataIndex: 'channel',
          align: 'center',
          width: 140,
        },
        {
          title: '微信唯一码',
          key: 'uniqueCode',
          dataIndex: 'uniqueCode',
          align: 'center',
          width: 140,
        },
        {
          title: '分享唯一码 ',
          key: 'shareCode',
          dataIndex: 'shareCode',
          align: 'center',
          width: 140,
        },

        {
          title: '所属公司',
          key: 'companyName',
          dataIndex: 'companyName',
          align: 'center',
          width: 140,
        },
        {
          title: '是否有效',
          key: 'available',
          dataIndex: 'available',
          align: 'center',
          width: 100,
          render(available) {
            return <span>{available === 0 ? '正常' : '禁用'}</span>
          }
        },
        {
          title: '创建时间',
          key: 'createTimeStr',
          dataIndex: 'createTimeStr',
          align: 'center',
          width: 200,
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   fixed: 'right',
        //   align: 'center',
        //   width: 200,
        //   render: (item) => {
        //     const spanStyle = { color: '#1890ff', cursor: 'pointer' }
        //     return (
        //       <>
        //         {
        //           item.recommend === 0 ?
        //             <span style={spanStyle} onClick={() => this.recommendHandle(item, 1)}>推荐</span> :
        //             <span style={spanStyle} onClick={() => this.recommendHandle(item, 0)}>取消推荐</span>

        //         }
        //         <Divider type="vertical" />
        //         <span style={spanStyle} onClick={() => this.setLable(item)}>设置标签</span>
        //       </>
        //     )
        //   }
        // }
      ]
    }

    const { urls, artistid, isDetail } = this.state
    const searchData = [
      { type: 'input', field: 'userName', width: '170px', label: '用户名称' },
      { type: 'input', field: 'nickName', width: '170px', label: '用户昵称' },
      { type: 'chooseTime', field: 'time', label: '注册时间', beginTime: 'startTime', EndTime: 'endTime' },
      {
        type: 'select', field: 'available', width: '170px', label: '用户状态', placeholder: '请选择用户状态', list: [
          { id: 0, value: 0, label: '正常' },
          { id: 1, value: 1, label: '禁用' }
        ]
      },
      { type: 'input', field: 'channel', width: '170px', label: '注册渠道', placeholder: '请输入用户注册渠道' },
    ]
    return (
      <div className="om-box user-bg">
        {/* <div style={{ marginBottom: 10 }}><Button onClick={this.setLable}>批量设置标签</Button></div> */}
        <GtableEdit
          urls={urls}
          rowKey={record => record.userId}
          searchData={searchData}
          columns={_columns}
          pagination={true}
          isRowSelection={true}
          query={{ orderDirection: 1 }}
          bordered={true}
          selectChange={this.selectChange}
          triggerRef={ref => { this.tableChild = ref }}
        />

        <UserAddFrom triggerRef={ref => { this.addChild = ref }} userid={0} successCallback={this.successCallback} />
        {
          isDetail && <UserDetail artistid={artistid} goback={this.goback} />
        }
      </div>
    )
  }
}


export default UserManage




class UserAdd extends React.Component {

  constructor() {
    super()
    this.state = {
      ids: [],
      visible: false
    }
  }

  componentDidMount() {
    this.props.triggerRef && this.props.triggerRef(this)
  }

  show = (ids) => {
    this.setState({
      visible: true,
      ids,
    })
  }

  onOk = (e) => {
    // const that = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        // let ids = that.state.ids
        // request({
        //   url: UserSetUserLabel,
        //   method: 'get',
        //   params: {
        //     md5Str: localStorage.getItem('authed'),
        //     userid: ids,
        //     ...values
        //   },
        // }).then(res => {
        //   console.log(res)
        //   that.onCancel()
        //   that.props.successCallback && that.props.successCallback()
        // })
      }
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { visible } = this.state

    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    }

    const { getFieldDecorator } = this.props.form;
    return <Modal
      title="设置标签"
      visible={visible}
      onOk={this.onOk}
      onCancel={this.onCancel}
      width={600}
    >

      <Form {...formLayout}>

        <Form.Item label="标签名称">
          {getFieldDecorator('userLabel', { valuePropName: 'value', rules: [{ required: true, message: '请输入用户标签' }] })(<Input style={{ width: '100%' }} placeholder='请输入用户标签' />)}
        </Form.Item>
      </Form>


    </Modal>
  }
}

const UserAddFrom = Form.create()(UserAdd)