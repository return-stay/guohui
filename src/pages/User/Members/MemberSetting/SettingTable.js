import React from 'react'
import { Divider, Card } from 'antd';
import GtableEdit from '../../../../common/GtableEdit'
import BaseForm from '../../../../common/BaseForm'
import Buttons from './Buttons'
export default class SettingTable extends React.Component {

  state = {
    urls: {
      list: '',
      add: ''
    },
    selectedRowKeys: '', selectedRows: [],
    dataSource: [
      {
        Id: 1599,
        RealName: "",
        Email: null,
        CellPhone: "-",
        QQ: null,
        UserName: "wxy7wtag",
        Sex: 0,
        BirthDay: null,
        Disabled: false,
        LastLoginDate: "/Date(1580189983000)/",
        Occupation: null,
        TotalAmount: 0,
        NetAmount: 0,
        CreateDate: "/Date(1580189983000)/",
        CreateDateStr: "2020-01-28 13:39:43",
        GradeName: "vip0",
        Photo: "/Storage/Member/1599/headImage.jpg",
        Nick: "萝卜",
        MemberLabels: null,
        InviteUserName: null,
        AvailableIntegral: 0,
        HistoryIntegral: 0,
        OrderNumber: 0,
        LastConsumptionTime: null,
        Platform: 5,
        PlatformText: "商城小程序",
        IconSrc: "/images/WeiXinSmallProg.png",
      }
    ]
  }

  blocking = (e) => {
    console.log(e)
  }

  editLabel = (e) => {
    console.log(e)
  }

  modifyPassword = (e) => {
    console.log(e)
  }

  check = (e) => {
    console.log(e)
  }

  search = (e) => {
    console.log(e)
  }

  selectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows)
    this.setState({
      selectedRowKeys, selectedRows
    })
  }
  render() {
    let { urls, dataSource, selectedRowKeys, selectedRows } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '会员名',
          key: 'UserName',
          dataIndex: 'UserName',
        },
        {
          title: '手机号',
          key: 'CellPhone',
          dataIndex: 'CellPhone',
        },
        {
          title: '等级',
          key: 'GradeName',
          dataIndex: 'GradeName',
        },
        {
          title: '消费金额',
          key: 'AvailableIntegral',
          dataIndex: 'AvailableIntegral',
          sorter: true,
        },
        {
          title: '消费次数',
          key: 'TotalAmount',
          dataIndex: 'TotalAmount',
          sorter: true,
        },

        {
          title: '最近消费时间',
          key: 'CreateDateStr',
          dataIndex: 'CreateDateStr',
          sorter: true,
        },
        {
          title: '购买商品类型',
          key: 'VirtualSaleCounts',
          dataIndex: 'VirtualSaleCounts',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.editLabel(e, item) }}>编辑标签</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.check(e, item) }}>查看</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.modifyPassword(e, item) }}>修改密码</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => this.blocking(e)}>冻结</span>
              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'name', field: 'name', label: '会员名' },
      { type: 'input', field: 'dianpu', label: '昵称' },
      { type: 'input', field: 'code', label: '手机号码' },
      { type: 'select', field: 'shanpinfenlei', width: '170px', label: '会员等级', placeholder: '请输入所属品牌', list: [{ id: 'jusk', value: '全部', label: '全部' }] },
      { type: 'select', field: 'erjifenlei', width: '170px', label: '会员状态', disabled: true, placeholder: '请输入所属品牌', list: [{ id: 'jusk', value: 'jusk', label: 'jusk', disabled: true, }] },
      { type: 'select', field: 'sanjifenlei', width: '170px', label: '会员来源', disabled: true, placeholder: '请输入所属品牌', list: [{ id: 'jusk', value: 'jusk', label: 'jusk', disabled: true, }] },
      { type: 'select', field: 'shangpinleixing', width: '170px', label: '会员标签', placeholder: '请输入所属品牌', list: [{ id: 'jusk', value: 'jusk', label: 'jusk', }] },
      { type: 'chooseTime', label: '注册时间' },
      { type: 'select', field: 'shifouweixin', width: '170px', label: '是否关注微信', placeholder: '请输入所属品牌', list: [{ id: 'jusk', value: 'jusk', label: 'jusk', }] },
      { type: 'select', field: 'shifouruzhushangjia', width: '170px', label: '是否入驻商家', placeholder: '请输入所属品牌', list: [{ id: 'jusk', value: 'jusk', label: 'jusk', }] },
    ]
    return (
      <div style={{ marginTop: 10 }}>
        <div style={{ margin: '10px 0' }}>
          <Buttons btns={{ isSetting: true }} selectedRowKeys={selectedRowKeys} selectedRows={selectedRows} />
        </div>
        {
          searchData && searchData.length > 0 && (
            <Card>
              <BaseForm data={searchData} handleSearch={this.search} />
            </Card>
          )
        }

        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          selectChange={this.selectChange}
          pagination={true}
        />

      </div>
    )
  }
}