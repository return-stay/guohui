import React from 'react'
import GtableEdit from '../../../../common/GtableEdit'

import PropTypes from 'prop-types';
class CouponTable extends React.Component {
  constructor() {
    super()
    this.state = {
      urls: {
        list: '',
        delete: '',
      },
      dataSource: [
        {
          Id: 300,
          CouponName: "测试主动发送优惠券",
          Price: 50,
          OrderAmount: "不限制",
          ShopId: 0,
          ShopName: "风华电子店铺",
          EndTime: "/Date(1580745599000)/",
          strEndTime: "2020-02-03",
          StartTime: "/Date(1577980800000)/",
          strStartTime: "2020-01-03",
          Num: 1000,
          useNum: 0,
          inventory: 1000,
          perMax: 0,
          IsUse: 0,
          UseArea: 0,
          Remark: "",
        }
      ]
    }
  }

  selectChange = (selectedRowKeys, selectedRows) => {
    this.props.selectChange && this.props.selectChange(selectedRowKeys, selectedRows)
  }
  render() {

    let { urls, dataSource } = this.state;
    const { isAction, isRowSelection ,searchData} = this.props
    // sortedInfo = sortedInfo || {};
    const _columns = (that) => {
      let arr = [
        {
          title: '优惠券名称',
          key: 'CouponName',
          dataIndex: 'CouponName',
          render(CouponName) {
            return (<span style={{ color: '#1890ff' }}>{CouponName}</span>)
          }
        },
        {
          title: '商家',
          key: 'ShopName',
          dataIndex: 'ShopName',
        },
        {
          title: '面额',
          key: 'Price',
          dataIndex: 'Price',
        },
        {
          title: '剩余数量',
          key: 'inventory',
          dataIndex: 'inventory',
        },
        {
          title: '使用条件',
          key: 'OrderAmount',
          dataIndex: 'OrderAmount',
        },
        {
          title: '有效期',
          key: 'productCode',
          render(item) {
            return (
              <span>{item.strStartTime}-{item.strEndTime}</span>
            )
          }
        },
      ]

      if (isAction) {
        arr.push(
          {
            title: '操作',
            render: (item) => {
              return (<span style={{ color: '#1890ff' }} onClick={(e) => { that.handleDelete(e, item) }}>删除</span>)
            }
          }
        )
      }
      return arr
    }
    return (
      <GtableEdit
        urls={urls}
        columns={_columns}
        dataSource={dataSource}
        selectChange={this.selectChange}
        isRowSelection={isRowSelection}
        searchData={searchData}
      />
    )
  }
}



CouponTable.propTypes = {
  isRowSelection: PropTypes.bool,
  isAction: PropTypes.bool,
  searchData: PropTypes.array,
}

CouponTable.defaultProps = {
  isRowSelection: true,
  isAction: true,
}

export default CouponTable