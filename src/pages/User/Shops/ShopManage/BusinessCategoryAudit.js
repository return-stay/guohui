import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'
import shopManageData from './shopManageData'
import { withRouter } from 'react-router-dom'
class BusinessCategoryAudit extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: ''
      },
      dataSource: shopManageData,
    }
  }

  
  editCallback = () => { }
  goShopWebPage = (e) => {
    let shopid = e.currentTarget.getAttribute('data-shopid')
    console.log(shopid)
  }

  goStoreList = (e) => {
    let shopid = e.currentTarget.getAttribute('data-shopid')
    console.log(shopid)

    this.props.history.push({ pathname: '/user/shops/store', query: { name: 'sunny' } })
  }

  checkBusinessCategoryAuditDetail = (item) => {
    this.props.checkBusinessCategoryAuditDetail(item)
  }
  render() {
    let { urls, dataSource } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      const _this = this
      return [
        {
          title: '店铺名称',
          key: 'Name',
          render(item) {
            return <span style={{ color: '#2481d1' }} data-shopid={item.Id} onClick={_this.goShopWebPage}>{item.Name}</span>
          }
        },
        {
          title: '申请日期',
          key: 'EndDate',
          dataIndex: 'EndDate',
          sorter: true,
        },
        {
          title: '审核状态',
          key: 'Status',
          dataIndex: 'Status',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { _this.checkBusinessCategoryAuditDetail(item) }}>查看详情</span>
              </>
            )
          }
        }
      ]
    }

    const searchData = [
      { type: 'input', field: 'Name', label: '店铺名称' },
      {
        type: 'select', field: 'Status', width: '170px', label: '店铺状态', initialValue: '0', list: [
          { id: 0, value: '0', label: '默认' },
          { id: 1, value: 'bukeyong', label: '不可用' },
          { id: 2, value: 'daishenhe', label: '待审核' },
          { id: 3, value: 'beijujue', label: '被拒绝' },
        ]
      },
    ]

    return (
      <GtableEdit
        triggerRef={ref => this.child = ref}
        urls={urls}
        searchData={searchData}
        columns={_columns}
        dataSource={dataSource}
        isRowSelection={false}
        editCallback={this.editCallback}
      />
    )
  }
}

export default withRouter(BusinessCategoryAudit)