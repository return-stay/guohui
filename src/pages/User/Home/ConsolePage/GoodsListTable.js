import React from 'react'
import PropTypes from 'prop-types';
import GtableEdit from '../../../../common/GtableEdit'


class GoodsListTable extends React.Component {

  render() {
    const { urls, columns } = this.props
    const _columns = () => {
      return columns
    }
    let dataSource = [
      {
        goodsId: 33811,
        cateName: "string",
        goodsCode: "F35097",
        goodsName: "x A Bathing Ape Green Camo BAPE Ultra Boost (2019)",
        goodsCover: "https://cdn.filestackcontent.com/qabv0mY0RRyeD4rBxdvX",
        skuId: 85862,
        cateId: 0,
        soleCount: 0,
        createTimeStr: null,
        sellGoodsPic: [
          "https://klekt.oss-eu-west-1.aliyuncs.com/43154694-47c7-4acd-8f2c-8c04f2d8f6ec.png",
          "https://klekt.oss-eu-west-1.aliyuncs.com/71f89ae1-844e-4730-804f-31aa92fec741.png",
          "https://klekt.oss-eu-west-1.aliyuncs.com/1fd5a0fe-57f8-46cd-b737-aff3993c43d0.png",
        ],
        price: 1420.8,
        inventory: 1,
        createTime: 1586613498000,
        specValue: "New+Defents,US5",
        sizeId: 23,
        status: "New+Defents",
        sellerId: 42,
        sellerName: "Fan Fan",
        sellerEmail: "1432812361@qq.com",
        available: 2,
        goodsStatus: "New",
        consignee: "We’re",
        mobile: "35252452",
        address: "Sdfsggaeraerga",
        payType: "credit_card",
        orderId: 106,
        orderNo: "446488114253541376",
        actualPrice: 10,
        orderTime: 1586617527000,
        repertory: 10,
      }
    ]
    const {queryData,rowKey} = this.props
    return (
      <div>
        <GtableEdit
          urls={urls}
          rowKey={rowKey}
          columns={_columns}
          bordered={false}
          isRowSelection={false}
          dataSource={queryData || dataSource}
          query={{ queryStatus: 0, orderType: 0, loading: false, }}
        />
      </div>
    )
  }
}

GoodsListTable.propTypes = {
  rowKey: PropTypes.func, //选择默认的rowkey
}

GoodsListTable.defaultProps = {
  rowKey: record => record.goodsId,
}

export default GoodsListTable