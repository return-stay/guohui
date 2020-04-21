import React from 'react'
import { Divider, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import VdianReplace from './VdianReplace'
export default class MainlyPopularizeVdian extends React.Component {

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
          addTime: "2020/2/4 22:34:01",
          squence: 1,
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

  Replace = (item) => {
    console.log(item)
    // message.success('替换成功')
    this.replaceChild.show(item)
  }
  // 替换成功回调
  replaceSuccess=()=> {
    console.log('jj')
  }


  setNormal = (item) => {
    message.success('设置普通成功')
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
          title: '添加时间',
          key: 'addTime',
          dataIndex: 'addTime',
        },
        {
          title: '创建时间',
          key: 'creatTime',
          dataIndex: 'creatTime',
        },
        {
          title: '进店浏览量',
          key: 'visiteNum',
          dataIndex: 'visiteNum',
        },
        {
          title: '成交量',
          key: 'buyNum',
          dataIndex: 'buyNum',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.Replace(item) }}>替换</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.setNormal(item) }}>置为普通</span>

              </>
            )
          }
        }
      ]
    }

    return (
      <div>

        <GtableEdit
          urls={urls}
          columns={_columns}
          isRowSelection={false}
          dataSource={dataSource}
        />

        <VdianReplace tirggerRef={ref => this.replaceChild = ref} replaceSuccess={this.replaceSuccess} />
      </div>
    )
  }
}