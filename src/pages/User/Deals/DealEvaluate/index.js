import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'

export default class DealEvaluate extends React.Component {

  state = {
    urls: {
      list: ''
    }
  }
  render() {

    let { urls } = this.state;
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      return [
        {
          title: '订单号',
          key: 'OrderId',
          dataIndex: 'OrderId',
        },
        {
          title: '店铺',
          key: 'ShopName',
          dataIndex: 'ShopName',
        },
        {
          title: '评价会员',
          key: 'UserName',
          dataIndex: 'UserName',
        },
        {
          title: '商品描述',
          key: 'DeliveryMark',
          dataIndex: 'DeliveryMark',
        },
        {
          title: '物流服务',
          key: 'PackMark',
          dataIndex: 'PackMark',
        },
        {
          title: '服务态度',
          key: 'ServiceMark',
          dataIndex: 'ServiceMark',
        },
        {
          title: '评价日期',
          key: 'CommentDate',
          dataIndex: 'CommentDate',
        },
        {
          title: '操作',
          render: (item) => {
            return (
              <>
                <div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={(e) => { that.handleDelete(e, item) }}>删除</div>
              </>
            )
          }
        }
      ]
    }

    const dataSource = [{
      Id: 280,
      OrderId: 2020010889644064,
      ShopName: "风华电子店铺",
      UserName: "wx04wcs2",
      CommentDate: "2020/1/26",
      PackMark: 5,
      DeliveryMark: 5,
      ServiceMark: 5,
    }]

    const searchData = [
      { type: 'chooseTime', field: 'shangpinleixing', beginTime: 'pingjiashijian',EndTime: 'pingjiashijianend',label: '评价时间', isEndTime: false, },
      { type: 'input', field: 'OrderId', label: '订单编号' },
      { type: 'input', field: 'ShopName', label: '店铺名' },
      { type: 'input', field: 'ProductName', label: '评价人' },
    ]
    return (
      <>

        <GtableEdit
          rowKey={record => record.Id}
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          searchData={searchData}
          isRowSelection={false}
          pagination={true}
          cancelPopText="确认删除该评价吗"
        />
      </>
    )
  }
}
