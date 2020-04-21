import React from 'react'

import TitleSearch from './TitleSearch'

import LineReactEcharts from '../../../../common/GreactEcharts/LineReactEcharts'
export default class SalesAnalysis extends React.Component {
  constructor() {
    super()

    this.state = {
      chartData: [
        {
          CategoryId: 1,
          CategoryName: "印刷用品",
          SaleCounts: 0,
          SaleAmounts: 0,
          AmountRate: 0,
          CountRate: 0,
        },
        {
          CategoryId: 1,
          CategoryName: "美食",
          SaleCounts: 0,
          SaleAmounts: 0,
          AmountRate: 0,
          CountRate: 0,
        },
        {
          CategoryId: 1,
          CategoryName: "音频设备",
          SaleCounts: 0,
          SaleAmounts: 0,
          AmountRate: 0,
          CountRate: 0,
        },
      ],
    }
  }

  genData = (data) => {
    let legendData = []
    let seriesData = []
    for (let i = 0; i < data.length; i++) {
      legendData.push(data[i].CategoryName);
      seriesData.push({
        name: data[i].CategoryName,
        value: data[i].SaleCounts
      });
    }

    return {
      legendData: legendData,
      seriesData: seriesData,
      selected: true,
    }
  }


  getOption = () => {
    const { chartData } = this.state

    const data = this.genData(chartData)
    return {
      title: [
        {
          text: '一级分类商品销售数',
          left: '10%',
          textStyle: {
            color: "#888",
            fontSize: 16,
            fontWeight: 'normal',
          }
        },
        {
          text: '二级分类商品销售数',
          left: '60%',
          textStyle: {
            color: "#888",
            fontSize: 16,
            fontWeight: 'normal',
          }
        }
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 20,
        data: data.legendData,

        selected: data.selected
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          left: 20,
          right: '40%',
        }, {
          name: '二级分类呢访问来源',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          left: '50%',
        }
      ]
    }
  }
  searchMember = (data) => {
    console.log(data)
  }
  render() {
    return (
      <div>
        <TitleSearch searchMember={this.searchMember} />


        <div style={{ display: 'flex', width: '100%', margin: '10px 0' }}>

          <div style={{ flex: 1 }}>
            <LineReactEcharts getOption={this.getOption} style={{ width: '100%' }} />
          </div>

        </div>




      </div>
    )
  }
}