import React from 'react'
import TitleSearch from './TitleSearch'

import GtableEdit from '../../../../common/GtableEdit'
export default class MerchandiseSales extends React.Component {

  constructor() {
    super()

    this.state = {
      urls: {
        list: ''
      },
      dataSource: [
        {
          Id: 2532,
          ProductName: "我离开去我家",
          StartDate: "/Date(1581091200000)/",
          EndDate: "/Date(1581091200000)/",
          VistiCounts: 6,
          SaleCounts: 0,
          SaleAmounts: 0,
          OrderCounts: null,
          ShopId: 0,
          VisitUserCounts: 4,
          PayUserCounts: 0,
          SinglePercentConversion: 0,
          Conversion: 0,
          _Conversion: 0,
          SinglePercentConversionString: "0.00%",
        }
      ]
    }
  }


  searchMember = (data) => {
    console.log(data)
  }
  render() {
    const _columns = (that) => {
      return [
        {
          title: '商品名称',
          key: 'ProductName',
          dataIndex: 'ProductName',
        },
        {
          title: '浏览量',
          key: 'VistiCounts',
          dataIndex: 'VistiCounts',
          sorter: true,
          width: 100,
        },
        {
          title: '浏览人数',
          key: 'VisitUserCounts',
          dataIndex: 'VisitUserCounts',
          sorter: true,
          width: 110,
        },
        {
          title: '付款人数',
          key: 'PayUserCounts',
          dataIndex: 'PayUserCounts',
          sorter: true,
          width: 110,
        },
        {
          title: '单品转化率',
          key: 'SinglePercentConversion',
          dataIndex: 'SinglePercentConversion',
          sorter: true,
          render(SinglePercentConversion) {
            return <span>{SinglePercentConversion}%</span>
          },
          width: 130,
        },
        {
          title: '销售数量',
          key: 'SaleCounts',
          dataIndex: 'SaleCounts',
          sorter: true,
          width: 110,
        },
        {
          title: '销售金额',
          key: 'SaleAmounts',
          dataIndex: 'SaleAmounts',
          sorter: true,
          width: 110,
        },
      ]
    }
    const { urls, dataSource } = this.state
    return (
      <div>

        <TitleSearch searchMember={this.searchMember} />


        <GtableEdit
          urls={urls}
          columns={_columns}
          dataSource={dataSource}
          isRowSelection={false}
        />
      </div>
    )
  }
}