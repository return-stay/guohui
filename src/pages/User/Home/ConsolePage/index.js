import React from 'react'
import { Divider, Rate } from 'antd'
import { withRouter } from 'react-router-dom'
import AntvLine from './antvLine'
import WordEchart from './WordEchart'
// import GaugeEchart from './GaugeEchart'
import GoodsListTable from './GoodsListTable'
import RegisterShape from './RegisterShape'
import request from '../../../../utils/request'
import { ConsoleDeskQueryCalDataCenter } from '../../../../config/api'
import RankingList from './RankingList'
import '../index.less'
// import AddGoods from '../../Goods/TheSellerManage'
import home_3 from '../../../../asset/home/home_3.png'
import home_4 from '../../../../asset/home/home_4.png'
import home_5 from '../../../../asset/home/home_5.png'
import home_6 from '../../../../asset/home/home_6.png'
import home_7 from '../../../../asset/home/home_7.png'
import home_8 from '../../../../asset/home/home_8.png'
import home_9 from '../../../../asset/home/home_9.png'
import home_10 from '../../../../asset/home/home_10.png'
import home_11 from '../../../../asset/home/home_11.png'
import home_12 from '../../../../asset/home/home_12.png'
import Gimage from '../../../../common/Gimage/index.js';

class ConsolePage extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: null,
      editProductId: '',
      isAddGood: false,
      urls: {
        list: '',
        listMethod: 'post',
      },
      pendingData: [],
      // xinshuju
      dayAmount: 0, //今日累计金额
      dayOrderCount: 0, //: 今日订单数 ,
      dayProductCount: 0, // 今日商品数 ,
      dayShopCount: 0, // 今日店铺数 ,
      dayUserCount: 0, //今日用户数 ,
      totalAmount: 0, //累计金额 ,
      totalOrderCount: 0, // 累计订单数 ,
      totalProductCount: 0, // 累计商品数 ,
      totalShopCount: 0, //累计店铺数 ,
      totalUserCount: 0, // 累计用户数
    }
  }
  componentDidMount() {
    this.getConsoleData()
  }

  getConsoleData = () => {
    request({
      url: ConsoleDeskQueryCalDataCenter
    }).then(res => {
      const resdata = res.data
      this.setState({
        dayAmount: resdata.dayAmount, //今日累计金额
        dayOrderCount: resdata.dayOrderCount, //: 今日订单数 ,
        dayProductCount: resdata.dayProductCount, // 今日商品数 ,
        dayShopCount: resdata.dayShopCount, // 今日店铺数 ,
        dayUserCount: resdata.dayUserCount, //今日用户数 ,
        totalAmount: resdata.totalAmount, //累计金额 ,
        totalOrderCount: resdata.totalOrderCount, // 累计订单数 ,
        totalProductCount: resdata.totalProductCount, // 累计商品数 ,
        totalShopCount: resdata.totalShopCount, //累计店铺数 ,
        totalUserCount: resdata.totalUserCount, // 累计用户数
      })
    })
  }

  componentWillUnmount() {

  }

  checkDetail = (item) => {
    this.props.history.push('/user/goods/info?id=' + item.goodsId)
  }
  uccessBack = () => {
    this.goback()
    this.tableChild.sortingParameters()
  }

  goback = () => {
    this.setState({
      editProductId: '',
      isAddGood: false,
    })
  }
  render() {
    const {
      totalUserCount,
      dayUserCount,
      totalShopCount,
      dayShopCount,
      totalOrderCount,
      dayOrderCount,
      totalAmount,
      dayAmount,
      totalProductCount,
      dayProductCount,
      pendingData,
    } = this.state

    return (
      <div className="cp-box">
        <div style={{ display: 'none' }}>
          <audio id="myaudio" src="https://klekt.oss-eu-west-1.aliyuncs.com/ighczvjyvun.mp3" controls="controls"></audio>
        </div>
        <div className="cp-title">数据中心</div>
        <div className="cp-top-cont">
          <div className="cp-top-item">
            <div className="cp-top-item-t">累计用户</div>
            <div className="cp-top-item-n">{totalUserCount}</div>
            <div className="cp-top-item-d"><span>今日新增</span><span style={{ color: '#4ba0b7', marginLeft: 10 }}>+{dayUserCount}</span></div>
            <div className="cp-top-icon">
              <img src={home_3} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item">
            <div className="cp-top-item-t">累计店铺</div>
            <div className="cp-top-item-n">{totalShopCount}</div>
            <div className="cp-top-item-d"><span>今日新增</span><span style={{ color: '#4ba0b7', marginLeft: 10 }}>+{dayShopCount}</span></div>
            <div className="cp-top-icon">
              <img src={home_4} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item">
            <div className="cp-top-item-t">累计订单</div>
            <div className="cp-top-item-n">{totalOrderCount}</div>
            <div className="cp-top-item-d"><span>今日新增</span><span style={{ color: '#4ba0b7', marginLeft: 10 }}>+{dayOrderCount}</span></div>
            <div className="cp-top-icon">
              <img src={home_5} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item">
            <div className="cp-top-item-t">累计商品</div>
            <div className="cp-top-item-n">{totalProductCount}</div>
            <div className="cp-top-item-d"><span>今日新增</span><span style={{ color: '#4ba0b7', marginLeft: 10 }}>+{dayProductCount}</span></div>
            <div className="cp-top-icon">
              <img src={home_6} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item">
            <div className="cp-top-item-t">累计金额</div>
            <div className="cp-top-item-n">{totalAmount}</div>
            <div className="cp-top-item-d"><span>今日新增</span><span style={{ color: '#4ba0b7', marginLeft: 10 }}>+{dayAmount}</span></div>
            <div className="cp-top-icon">
              <img src={home_7} alt="1" />
            </div>
          </div>
        </div>
        <div className="cp-top-cont" style={{ marginTop: 20, display: 'none' }}>
          <div className="cp-top-item cp-top-li">
            <div className="cp-top-item-t">用户成单率</div>
            <div className="cp-top-item-shape">
              <RegisterShape divId="one-shape" dataObj={{ value: 0 }} arcColor="#f2a483" pointColor="#f2a483" />
            </div>
            <div className="cp-top-icon">
              <img src={home_8} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item cp-top-li">
            <div className="cp-top-item-t">用户悔单率</div>
            <div className="cp-top-item-shape">
              <RegisterShape divId="two-shape" dataObj={{ value: 0 }} arcColor="#b4e8c6" pointColor="#b4e8c6" />
            </div>
            <div className="cp-top-icon">
              <img src={home_9} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item cp-top-li">
            <div className="cp-top-item-t">参与出价新客占比</div>
            <div className="cp-top-item-shape">
              <RegisterShape divId="three-shape" dataObj={{ value: 0 }} arcColor="#f6c658" pointColor="#f6c658" />
            </div>
            <div className="cp-top-icon">
              <img src={home_10} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item cp-top-li">
            <div className="cp-top-item-t">新客成交额占比</div>
            <div className="cp-top-item-shape">
              <RegisterShape divId="fove-shape" dataObj={{ value: 0 }} />
            </div>
            <div className="cp-top-icon">
              <img src={home_11} alt="1" />
            </div>
          </div>
          <div style={{ width: 20 }}></div>
          <div className="cp-top-item cp-top-li">
            <div className="cp-top-item-t">新客成交单数占比</div>
            <div className="cp-top-item-shape">
              <RegisterShape divId="five-shape" dataObj={{ value: 0 }} arcColor="#ee7773" pointColor="#ee7773" />
            </div>
            <div className="cp-top-icon">
              <img src={home_12} alt="1" />
            </div>
          </div>
        </div>
        {
          (pendingData && pendingData.length > 0) && <div className="echart-box">
            <div>
              <h5 className="table-title">10条消息待处理</h5>

              <GoodsListTable queryData={pendingData} rowKey={record => record.goodsId} columns={[
                {
                  title: "商品信息",
                  key: 'goodsName',
                  width: 260,
                  render(item) {
                    return (
                      <div className="gl-table-th">
                        <Gimage style={{ height: 30, marginRight: 4, display: 'inline-block' }} src={item.goodsCover} alt="图片" />
                        <span className="gl-table-text">{item.goodsName}</span>
                      </div>
                    )
                  }
                },
                {
                  title: "商品图",
                  key: 'sellGoodsPic',
                  dataIndex: 'sellGoodsPic',
                  width: 160,
                  render(sellGoodsPic) {
                    let sellGoodsPicArr = sellGoodsPic || []
                    let nodeStr = (
                      <div>
                        {sellGoodsPicArr.map((item, index) => {
                          return <Gimage key={index} style={{ height: 30, marginRight: 14, display: 'inline-block' }} src={item} alt="tu" />
                        })}
                      </div>
                    )
                    return nodeStr
                  }
                },
                {
                  title: "商品名称",
                  key: 'sellerName',
                  dataIndex: 'sellerName',
                  width: 130,
                },
                {
                  title: "价格",
                  key: 'price',
                  dataIndex: 'price',
                  width: 90,
                  render(price) {
                    return <span>€{price}</span>
                  }
                },
                {
                  title: "guige",
                  key: 'specValue',
                  dataIndex: 'specValue',
                  width: 90,
                  render(specValue) {
                    let size = specValue.split(',')[1]
                    return <span>{size}</span>
                  }
                },
                {
                  title: 'Type',
                  key: 'status',
                  dataIndex: 'status',
                  width: 140,
                },
                {
                  title: "评分",
                  key: 'score',
                  width: 140,
                  render(item) {
                    let value = item.score
                    return item.sellType === 'crepRating' && <>
                      <Rate allowHalf value={value / 2} disabled style={{ fontSize: 10, verticalAlign: 'middle' }} />
                      <span style={{ marginLeft: 10, verticalAlign: 'middle' }}>{value}</span>
                    </>
                  }
                },
                {
                  title: "创建时间",
                  key: 'createTimeStr',
                  dataIndex: 'createTimeStr',
                  width: 180,
                },
                {
                  fixed: 'right',
                  title: "操作",
                  width: 240,
                  key: 'sellerEmail',
                  render: (item) => {
                    const spanStyle = { color: '#1890ff', cursor: 'pointer' }
                    return (
                      <>
                        <span style={spanStyle} onClick={() => { this.checkDetail(item) }}>查看</span>
                        {
                          item.sellType === 'crepRating' && <>
                            <Divider type="vertical" />
                            <span style={spanStyle} onClick={() => { }}>编辑</span>
                          </>
                        }
                        {
                          item.available === 2 && <>
                            <Divider type="vertical" />
                            <span style={spanStyle} onClick={() => { this.putaway(item) }}>上架</span>
                          </>
                        }
                        {
                          item.available === 0 && <>
                            <Divider type="vertical" />
                            <span style={spanStyle} onClick={() => { this.putaway(item, 'Soldout') }}>下架</span>
                          </>
                        }
                        {
                          item.sellType === 'crepRating' && <>
                            <Divider type="vertical" />
                            <span style={spanStyle} onClick={() => { this.scoreClick(item) }}>评分</span>
                          </>
                        }
                      </>
                    )
                  }
                }
              ]} />
            </div>
          </div>
        }

        <div className="echart-box">

          <AntvLine />
        </div>

        <div className="echart-box">
          <h5 className="table-title">区域用户订单分布</h5>
          <WordEchart />

        </div>

        <div className="echart-other" style={{ display: 'flex' }}>
          <div className="echart-gauget">
            <h5 className="table-title">商品品数量</h5>
            {/* <GaugeEchart paipinNum={0} yikoujiaNum={0} /> */}
          </div>
          <div className="echart-table">
            <h5 className="table-title">排行榜</h5>
            <RankingList />
          </div>
        </div>

        <div className="echart-box" style={{ display: 'none' }}>
          <div>
            <h5 className="table-title">主理人数据统计</h5>
            <GoodsListTable urls={{ list: '', }} rowKey={record => record.goodsId} columns={[
              {
                title: "成交额",
                key: 'goodsName',
              },
              {
                title: "成交率",
                key: 'user',
                dataIndex: 'user',
              },
              {
                title: "专场数量",
                key: 'status',
                dataIndex: 'status',
              },
              {
                title: "拍品数量",
                key: 'price',
                dataIndex: 'price',
              },
              {
                title: "成交数量",
                key: 'size',
                dataIndex: 'size',
              },
              {
                title: "退货率",
                key: 'size1',
                dataIndex: 'size1',
              },
              {
                title: "结款率",
                key: 'size2',
                dataIndex: 'size2',
              },
              {
                title: "平均客单价",
                key: 'createTimeStr',
                dataIndex: 'createTimeStr',
              },
              {
                title: "佣金点数",
                key: 'createTimeStr1',
                dataIndex: 'createTimeStr1',
              },
            ]} />
          </div>
        </div>

        <div className="echart-box" style={{ display: 'none' }}>
          <h5 className="table-title">专场数据统计</h5>
          <GoodsListTable urls={{ list: '', }} rowKey={record => record.goodsId} columns={[
            {
              title: "成交额",
              key: 'goodsName',
            },
            {
              title: "成交率",
              key: 'user',
              dataIndex: 'user',
            },
            {
              title: "关注/收藏人数",
              key: 'status',
              dataIndex: 'status',
            },
            {
              title: "缴纳保证金人数",
              key: 'price',
              dataIndex: 'price',
            },
            {
              title: "新用户参与竞拍占比",
              key: 'size',
              dataIndex: 'size',
            },
            {
              title: "新用户成交占比",
              key: 'size1',
              dataIndex: 'size1',
            },
            {
              title: "新用户成交额",
              key: 'size2',
              dataIndex: 'size2',
            },
            {
              title: "竞价次数（真实出价）",
              key: 'createTimeStr',
              dataIndex: 'createTimeStr',
            },
            {
              title: "结款率",
              key: 'createTimeStr1',
              dataIndex: 'createTimeStr1',
            },
            {
              title: "退货率",
              key: 'createTimeStr2',
              dataIndex: 'createTimeStr2',
            },
            {
              title: "平均客单价",
              key: 'createTimeStr13',
              dataIndex: 'createTimeStr13',
            },
            {
              title: "备注",
              key: 'createTimeStr14',
              dataIndex: 'createTimeStr14',
            },
          ]} />
        </div>


        <div className="echart-box" style={{ display: 'none' }}>
          <h5 className="table-title">商户数据统计</h5>
          <GoodsListTable urls={{ list: '', }} rowKey={record => record.goodsId} columns={[
            {
              title: "用户编号",
              key: 'goodsName',
            },
            {
              title: "地区",
              key: 'user',
              dataIndex: 'user',
            },
            {
              title: "姓名",
              key: 'status',
              dataIndex: 'status',
            },
            {
              title: "电话",
              key: 'price',
              dataIndex: 'price',
            },
            {
              title: "地址",
              key: 'size',
              dataIndex: 'size',
            },
            {
              title: "用户等级",
              key: 'size1',
              dataIndex: 'size1',
            },
            {
              title: "历史出价总数",
              key: 'size2',
              dataIndex: 'size2',
            },
            {
              title: "竞拍记录",
              key: 'createTimeStr',
              dataIndex: 'createTimeStr',
            },
            {
              title: "拍品订单数量",
              key: 'createTimeStr1',
              dataIndex: 'createTimeStr1',
            },
            {
              title: "拍品订单总额",
              key: 'createTimeStr12',
              dataIndex: 'createTimeStr12',
            },
            {
              title: "一口价购买记录",
              key: 'createTimeStr13',
              dataIndex: 'createTimeStr13',
            },

            {
              title: "一口价订单数量",
              key: 'createTimeStr14',
              dataIndex: 'createTimeStr14',
            },
            {
              title: "一口价订单总额",
              key: 'createTimeStr15',
              dataIndex: 'createTimeStr15',
            },
            {
              title: "平均出价轮次",
              key: 'createTimeStr16',
              dataIndex: 'createTimeStr16',
            },
            {
              title: "平均退出价",
              key: 'createTimeStr17',
              dataIndex: 'createTimeStr17',
            },
            {
              title: "平均客单价",
              key: 'createTimeStr18',
              dataIndex: 'createTimeStr18',
            },
            {
              title: "成单率",
              key: 'createTimeStr181',
              dataIndex: 'createTimeStr181',
            },
            {
              title: "悔单率",
              key: 'createTimeStr182',
              dataIndex: 'createTimeStr182',
            },
            {
              title: "微信添加",
              key: 'createTimeStr183',
              dataIndex: 'createTimeStr183',
            },
            {
              title: "备注",
              key: 'createTimeStr184',
              dataIndex: 'createTimeStr184',
            },
          ]} />
        </div>

        {/* {
          isAddGood && <AddGoods successBack={this.successBack} backCallback={this.goback} id={editProductId} />
        } */}
      </div>

    )
  }
}

export default withRouter(ConsolePage)

