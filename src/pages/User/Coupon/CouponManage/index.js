import React from 'react'
import { Tabs, Modal, message, Button } from 'antd'
import {withRouter} from 'react-router-dom'
import GtableEdit from '../../../../common/GtableEdit'
import request from '../../../../utils/request'
// import './index.less'
const { TabPane } = Tabs;
class CouponManage extends React.Component {
    state = {
        isDetail: false,
        orderType: 0,
        orderStatus: '0',
        urls: {
            list: '/order/list',
            listMethod: 'post',
        },
        titleList: [
            { label: '所有优惠券', id: 0, type: 0, value: 0 },
            { label: '未生效', id: 1, type: 1, value: 1 },
            { label: '生效中', id: 2, type: 2, value: 2 },
            { label: '已过期', id: 3, type: 3, value: 3 },
        ]
    }

    goGoodsRecycleBin = () => {
        this.props.history.push('/user/goods/recycleBin')
    }

    // url请求地址  content 提示文案  thenText 成功之后提示文案  data 参数
    modalToastRequest = ({ url, content, thenText, data, method }) => {
        const that = this
        Modal.confirm({
            content: content,
            onOk: () => {
                request({
                    url: url,
                    method: method || 'get',
                    params: { md5Str: localStorage.getItem('authed') },
                    data: data,
                }).then(res => {
                    if (res.code === 100) {
                        message.success(thenText);
                        that.tableSortingParameters();
                    }
                }).catch((err) => {
                    message.error(err.message)
                })
            }
        })
    }

    checkDetail = (item) => {
        this.props.history.push('/user/deals/orderDetail?id=' + item.orderId)
    }
    orderTabChange = (e) => {
        console.log(e)
        this.setState({
            orderStatus: e,
        }, () => {
            this.tableChild.sortingParameters();
        })
    }

    orderRadioChange = (e) => {
        console.log(e)
        let type = e.target.value
        this.setState({
            orderStatus: 0,
            orderType: type
        }, () => {
            this.tableChild.sortingParameters();
        })
    }


    render() {
        const _columns = (that) => {
            return [
                {
                    title: '编号',
                    key: 'orderNo',
                    dataIndex: 'orderNo',
                },
                {
                    title: '优惠券类型',
                    key: 'createTime',
                    dataIndex: 'createTime',
                },
                {
                    title: '优惠力度',
                    key: 'consignee',
                    render() {
                        return <div> </div>
                    }
                },
                {
                    title: '发放数量',
                    key: 'userId',
                    return(item) {
                        console.log(item.orderDetails)
                        let arr = item.orderDetails || []

                        return <div>
                            {
                                arr.map(item => {
                                    return <div key={item.orderId}>{item.goodsName}</div>
                                })
                            }
                        </div>
                    }
                },
                {
                    title: '可用时间',
                    key: 'teacherName',
                    dataIndex: 'teacherName',
                },
                {
                    title: '适用商品范围',
                    key: 'buyNum',
                    dataIndex: 'buyNum',
                },
                {
                    title: '状态',
                    key: 'orderStatus',
                    dataIndex: 'orderStatus',
                    render(orderStatus) {
                        const config = {
                            0: '待付款',
                            1: '已付款',
                            2: '已发货',
                            4: '已完成',
                            5: '已关闭',
                            6: '已申请退款，等待商家确认',
                            7: '商家已同意退款，办理中',
                            8: '商家已拒绝退款',
                            9: '用户已填写物流编号',
                            10: '退款已完成'
                        }
                        return config[orderStatus]
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (item) => {
                        return (
                            <>
                                <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => { this.checkDetail(item) }}>下架</span>
                            </>
                        )
                    }
                }
            ]
        }

        const { urls, titleList, orderStatus, orderType } = this.state
        const searchData = [
            {
                type: 'select', field: 'youhuiquanleixing', width: '170px', label: '优惠券类型', placeholder: '请选择类型', list: [
                    { id: 0, value: 0, label: '全品类' },
                    { id: 1, value: 1, label: '企业' }
                ]
            },
          ]
        const operations = <Button icon="delete" onClick={this.goGoodsRecycleBin}>商品回收站</Button>
        return (
            <div className="om-box">

                <div>
                    <Tabs defaultActiveKey={orderStatus} onChange={this.orderTabChange} tabBarExtraContent={operations}>
                        {
                            titleList.map(item => {
                                const tabLabel = (
                                    <div>{item.label}{item.num > 0 && <span style={item.style} >（{item.num}）</span>}</div>
                                )
                                return <TabPane tab={tabLabel} key={item.id} style={item.style}> </TabPane>
                            })
                        }
                    </Tabs>
                </div>
                <GtableEdit
                    urls={urls}
                    rowKey={record => record.orderId}
                    searchData={searchData}
                    columns={_columns}
                    bordered={false}
                    isRowSelection={false}
                    query={{ queryStatus: Number(orderStatus), orderType: Number(orderType) }}
                    triggerRef={ref => { this.tableChild = ref }}
                />

            </div>
        )
    }
}


export default withRouter(CouponManage)