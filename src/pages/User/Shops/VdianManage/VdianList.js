import React from 'react'
import { Divider, Modal, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'

const { confirm } = Modal
export default class VdianList extends React.Component {

  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 31,
          name: "测试专用店铺",
          creatTime: "2019/11/12 18:11:22",
          vshopTypes: "热门微店",
          categoryName: "美食",
          visiteNum: 1,
          buyNum: 0,
          StateStr: "已关闭",
          IsOpenStr: "已关闭",
          IsOpen: true,
        }
      ]
    }
  }

  setToAdvocate = (item) => {
    console.log(item)
    message.success('设置主推成功')
  }

  soldOut = (item) => {
    confirm({
      title: '下架后该商家的微店将无法访问且不再显示在商城微店列表中,是否确定下架 第一站商家?',
      onOk() {
        console.log(item);
      },
    });
  }

  setHot = (item) => {
    message.success('设置热门成功')
  }
  render() {
    let { urls, dataSource } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '微店名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '创建时间',
          key: 'creatTime',
          dataIndex: 'creatTime',
        },
        {
          title: '微店类型',
          key: 'vshopTypes',
          dataIndex: 'vshopTypes',
        },
        {
          title: '状态',
          key: 'StateStr',
          dataIndex: 'StateStr'
        },
        {
          title: '进店浏览量',
          key: 'visiteNum',
          dataIndex: 'visiteNum',
          sorter: true,
        },
        {
          title: '成交量',
          key: 'buyNum',
          dataIndex: 'buyNum',
        },
        {
          title: '预览',
          key: 'IsOpen',
          dataIndex: 'IsOpen',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.setToAdvocate(item) }}>设为主推</span>
                <Divider type="vertical" />

                {
                  item.IsOpen && (
                    <>
                      <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.setHot(item) }}>设为热门</span>
                      <Divider type="vertical" />
                    </>
                  )
                }
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.soldOut(item) }}>下架</span>

              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'Name', label: '微店名称' },
      {
        type: 'select', field: 'ShopGrade', width: '170px', label: '微店类型', initialValue: '0', list: [
          { id: 0, value: '0', label: '请选择...' },
          { id: 1, value: 'vip', label: '钻石店铺' },
          { id: 2, value: 'putong', label: '普通会员' },
          { id: 3, value: 'huangjin', label: '黄金店铺' },
        ]
      },
      {
        type: 'select', field: 'Status', width: '170px', label: '状态', initialValue: '0', list: [
          { id: 0, value: '0', label: '默认' },
          { id: 1, value: 'bukeyong', label: '不可用' },
          { id: 2, value: 'daishenhe', label: '待审核' },
          { id: 3, value: 'beijujue', label: '被拒绝' },
        ]
      },
    ]
    return (
      <div>

        <GtableEdit
          urls={urls}
          columns={_columns}
          searchData={searchData}
          isRowSelection={false}
          dataSource={dataSource}
        />
      </div>
    )
  }
}