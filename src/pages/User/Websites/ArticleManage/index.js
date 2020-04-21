import React from 'react'
import { Divider } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import ArticleModal from './ArticleModal'
export default class ArticleManage extends React.Component {
  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 107,
          categoryId: 55,
          categoryName: "商城活动",
          isShow: true,
          title: "商城活动",
          displaySequence: 100,
          showurl: "https://tiyan.himall.kuaidiantong.cn/Article/Details/107",
          addDate: "2019-05-23 14:12:18",
        }
      ]
    }
  }

  copyUrl = (url) => {
    console.log(url)
  }
  // 添加，编辑成功回调
  onCallback = () => {

  }
  edit = (item) => {
    console.log(item)
    this.child.edit(item)
  }
  add = () => {
    this.child.add()
  }
  render() {

    let { urls, dataSource } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '标题',
          key: 'title',
          dataIndex: 'title',
        },
        {
          title: '分类',
          key: 'categoryName',
          dataIndex: 'categoryName',
        },
        {
          title: '排序',
          key: 'displaySequence',
          dataIndex: 'displaySequence',
          editable: true,
          sorter: true,
        },
        {
          title: '添加时间',
          key: 'addDate',
          dataIndex: 'addDate',
          sorter: true,
        },
        {
          title: '是否显示',
          key: 'isShow',
          dataIndex: 'isShow',
          render(isShow) {
            return <span>{isShow ? '是' : '否'}</span>
          }
        },
        {
          title: '复制地址',
          key: 'showurl',
          dataIndex: 'showurl',
          render(showurl) {
            return <span onClick={(showurl) => _this.copyUrl(showurl)}>复制地址</span>
          }
        },

        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff' }} onClick={(item) => _this.edit(item)}>编辑</span>
                <Divider type="vertical" />
                <span style={{ color: '#1890ff' }} onClick={(e) => { that.handleDelete(e, item) }}>删除</span>

              </>
            )
          }
        }
      ]
    }
    const searchData = [
      {
        type: 'select', field: 'erjifenlei', width: '170px', label: '文章分类', initialValue: '0', disabled: false, list: [
          { id: '0', value: '0', label: '全部' },
          { id: '1', value: '1', label: '商城公告' },
          { id: '2', value: '2', label: '投融资服务' }
        ]
      },
      {
        type: 'select', field: 'sanjifenlei', width: '170px', label: '二级分类', disabled: true, list: [
          { id: '0', value: '0', label: '全部' },
          { id: '1', value: '1', label: '商城公告' },
          { id: '2', value: '2', label: '投融资服务' }
        ]
      },
      { type: 'input', field: 'name', label: '商品名称' },
    ]
    return (
      <div>


        <GtableEdit
          functionButtons={{ isBatch: true, isAdd: true }}
          urls={urls}
          columns={_columns}
          searchData={searchData}
          dataSource={dataSource}
          addCallback={this.add}
        />

        <ArticleModal triggerRef={ref => this.child = ref} okCallback={this.onCallback} />

      </div>
    )
  }
}