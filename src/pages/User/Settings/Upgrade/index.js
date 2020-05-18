import React from 'react'
import { Button } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import AddUpgrade from './AddUpgrade'
// import request from "../../../../utils/request";

export default class Upgrade extends React.Component {
  constructor() {
    super()

    this.state = {
      urls: {
        list: '/grade/search',
        listMethod: 'post',
      },
    }
  }

  add = () => {
    this.addChild.show()
  }

  addSuccess = () => {
    this.tableChild.sortingParameters();
  }
  render() {
    const _columns = (that) => {
      return [
        {
          title: 'APP名称',
          key: 'appName',
          dataIndex: 'appName',
          align: 'center',
          width: 80,
        },
        {
          title: '系统版本号',
          key: 'appVersion',
          dataIndex: 'appVersion',
          width: 120,
          align: 'center',
        },
        {
          title: '下载地址 ',
          key: 'downAddress',
          dataIndex: 'downAddress',
          align: 'center',
        },
        {
          title: '是否强制升级',
          key: 'mustUp',
          dataIndex: 'mustUp',
          align: 'center',
          width: 120,
          render(sex) {
            return <span>{sex === 0 ? '否' : '是'}</span>
          }
        },
        {
          title: '升级说明',
          key: 'upDetail',
          dataIndex: 'upDetail',
          align: 'center',
          width: 100,
        },
        {
          title: '升级时间',
          key: 'createTime',
          dataIndex: 'createTime',
          align: 'center',
          width: 140,
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   fixed: 'right',
        //   align: 'center',
        //   width: 100,
        //   render: (item) => {
        //     const spanStyle = { color: '#1890ff', cursor: 'pointer' }
        //     return (
        //       <>
        //         <span style={spanStyle} onClick={() => this.setLable(item)}>设置标签</span>
        //       </>
        //     )
        //   }
        // }
      ]
    }

    const { urls } = this.state
    const searchData = [
      { type: 'input', field: 'appName', width: '170px', label: 'APP名称' },
      { type: 'input', field: 'appVersion', width: '170px', label: '系统版本号' },
      { type: 'input', field: 'detail', width: '170px', label: '升级说明' },
    ]
    return <div className="user-box">

      <Button type="primary" icon="plus" style={{ marginBottom: 12 }} onClick={this.add}>新增</Button>
      <GtableEdit
        urls={urls}
        rowKey={record => record.id}
        searchData={searchData}
        columns={_columns}
        pagination={true}
        isRowSelection={false}
        query={{ orderDirection: 1 }}
        bordered={true}
        selectChange={this.selectChange}
        triggerRef={ref => { this.tableChild = ref }}
      />


      <AddUpgrade triggerRef={ref => { this.addChild = ref }} successCallback={this.addSuccess} />
    </div>
  }
}