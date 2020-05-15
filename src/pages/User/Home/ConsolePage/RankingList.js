import React from 'react'
import { Select } from 'antd'
import GoodsListTable from './GoodsListTable'
import Gimage from '../../../../common/Gimage'
import { DataHotUser, DataHotProduct, } from '../../../../config/api'
import request from '../../../../utils/request'
const { Option } = Select
export default class RankingList extends React.Component {
  constructor() {
    super()
    this.state = {
      listUrl: '/consoleDesk/queryCalDataOrder',
      data: [],
      columns: [
        {
          title: "排名",
          key: 'index',
          dataIndex: 'index',
          width: 80,
        },
        {
          title: "用户名称/头像",
          key: 'nickName',
          render(item) {
            return <div>
              <Gimage src={item.portrait} style={{ height: 30 }} />
              <span style={{marginLeft: 10}}>{item.nickName}</span>
            </div>
          }
        },
        {
          title: "下单数",
          key: 'orderCount',
          dataIndex: 'orderCount',
          width: 80,
        },
        {
          title: "消费金额",
          key: 'totalAmount',
          dataIndex: 'totalAmount',
          width: 100,
        },
      ]
    }
  }
  componentDidMount() {
    this.getInitList()
  }

  getInitList = (type = 1) => {

    let url = ''
    if (type === 1) {
      url = DataHotUser
    } else {
      url = DataHotProduct
    }
    request({
      url: url,
      params: {
        token: localStorage.getItem('authed')
      }
    }).then(res => {
      if (res.code === 100) {
        let list = res.data.dataList
        this.setState({
          data: list
        })
      }
    })
  }

  onOptionTypeChange = (e) => {
    const that = this;
    let columns = [];
    switch (e) {
      case 1:
        columns = [
          {
            title: "排名",
            key: 'index',
            dataIndex: 'index',
            width: 80,
          },
          {
            title: "用户名称/头像",
            key: 'nickName',
            render(item) {
              return <div>
                <Gimage src={item.portrait} style={{ height: 30 }} />
                <span style={{marginLeft: 10}}>{item.nickName}</span>
              </div>
            }
          },
          {
            title: "下单数",
            key: 'orderCount',
            dataIndex: 'orderCount',
            width: 80,
          },
          {
            title: "消费金额",
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            width: 100,
          },
        ]
        break;
      case 2:
        columns = [
          {
            title: "排名",
            key: 'index',
            dataIndex: 'index',
            width: 80,
          },
          {
            title: "图",
            key: 'productCover',
            dataIndex: 'productCover',
            width: 80,
            render(productCover) {
              return <Gimage src={productCover} style={{ height: 30 }} />
            }
          },
          {
            title: "商品名称",
            key: 'productName',
            dataIndex: 'productName',
          },
          {
            title: "订单数",
            key: 'orderCount',
            dataIndex: 'orderCount',
            width: 80,
          },
          {
            title: "成交额",
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            width: 100,
          },

        ]
        break;
      default:
        columns = []
    }

    this.setState({
      columns
    }, () => {
      that.getInitList(e)
    })
  }

  render() {
    const { columns, data } = this.state
    return <>
      <div className="radio-box">
        <span>筛选类型：</span>
        <Select style={{ width: 300 }} defaultValue={1} onChange={this.onOptionTypeChange}>
          <Option value={1}>热门用户</Option>
          <Option value={2}>热门商品</Option>
        </Select>
      </div>
      <GoodsListTable rowKey={record => record.index} columns={columns} queryData={data} />
    </>
  }
}