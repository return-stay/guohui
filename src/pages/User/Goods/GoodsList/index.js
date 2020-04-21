import React from 'react'
import { Button, Divider, Tabs, Modal, message } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import BaseForm from '../../../../common/BaseForm'
import GoodsSetting from '../GoodsSetting'
import { dismantleSearch } from '../../../../utils'
import Gimage from '../../../../common/Gimage'
import {
    CategoryFindAllCate,
    ProductOnSpec,
    ProductOffSpec,
    ProductBatchDeleteSpec,
    ProductBatchOffSpec,
    ProductBatchOnSpec,
    ShopSearch,
} from '../../../../config/api'
import request from '../../../../utils/request'
import AddGoods from './AddGoods'
import './index.less'
const { TabPane } = Tabs;
export default class GoodsList extends React.Component {
    constructor() {
        super()
        this.state = {
            isAddGood: false,
            editProductId: '', //编辑商品的ID
            query: {},
            isAddBtnShow: true,
            selectedRows: [],
            urls: {
                list: '/product/search',
                listMethod: 'POST',
                add: '',
                edit: '',
                delete: '/product/delete',
                deleteMethod: 'POPST'
            },
            isGoodsSetting: true,
            sortedInfo: null,
            stateQuery: {},
            titleList: [
                { value: '所有商品', id: 0, type: 0 },
                { value: '售卖中', id: 1, type: 1 },
                { value: '已下架', id: 2, type: 2 },
                { value: '未发布', id: 3, type: 3 },
            ],
            categoryList: [], //商品类目列表
            shopList: [], //店铺列表
        }
    }

    componentDidMount() {
        this.getCategoryFindAllCate()
        let searchObj = dismantleSearch(this)
        this.setState({
            ...searchObj
        }, () => {
            this.tableChild.sortingParameters();
        })
        this.getShopSearch()
    }


    getShopSearch = () => {
        request({
            url: ShopSearch,
            method: 'post',
            data: {
                pageSize: 10000,
                pageNumber: 1,
            }
        }).then(res=> {
            if(res.code === 100 && res.data) {
                let list = res.data.datas
                for(let i =0;i<list.length;i++) {
                    list[i].label = list[i].shopName
                    list[i].value = list[i].shopId
                }
                this.setState({
                    shopList: list
                })
            }
        })
    }

    getCategoryFindAllCate = () => {
        let parentId = 0
        let obj = {}
        if (parentId) {
            obj.parentId = parentId
        }
        request(
            {
                url: CategoryFindAllCate,
                params: obj
            }
        ).then(res => {
            let list = res.data[0].childList
            for (let i = 0, len = list.length; i < len; i++) {
                list[i].value = list[i].id
                list[i].label = list[i].name
                if (list[i].childList && list[i].childList.length > 0) {
                    let childList = list[i].childList
                    for (let j = 0; j < childList.length; j++) {
                        childList[j].value = childList[j].id
                        childList[j].label = childList[j].name
                    }
                    list[i].children = childList
                }
            }
            this.setState({
                categoryList: list
            })
        })
    }


    addGoods = () => {
        // this.props.history.push({
        //     pathname: '/user/goods/add'
        // })
        this.setState({
            isAddGood: true,
            editProductId: '',
        })
    }

    goback = () => {
        this.setState({
            isAddGood: false,
            editProductId: ''
        })
    }

    successBack = () => {
        this.setState({
            isAddGood: false,
            editProductId: ''
        })
        this.tableChild.sortingParameters()
    }

    editGoods = (item) => {
        // this.props.history.push('/user/goods/add?id=' + item.productId)
        this.setState({
            isAddGood: true,
            editProductId: item.productId
        })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    };

    selectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows,
        })
    }

    checkDetiai = (item) => {
        this.props.history.push('/user/goods/info?id=' + item.productId)
    }

    joinIds = (str) => {
        let selectedRows = this.state.selectedRows
        let arr = []
        for (let i = 0; i < selectedRows.length; i++) {
            let itemids = selectedRows[i].productSpecId + '_' + selectedRows[i].productId
            arr.push(itemids)
        }
        return arr.join(str)
    }

    // 批量删除
    batchDelete = () => {
        const that = this
        let ids = that.joinIds(',')
        if (ids) {
            this.modalToastRequest({
                url: ProductBatchDeleteSpec,
                content: '确定删除选中的项吗？',
                thenText: '删除成功',
                data: {
                    dataIds: ids,
                    userId: 0
                }
            })
        } else {
            message.warning('请先选中商品')
        }

    }
    // 批量上架
    batchSoldOut = () => {
        const that = this
        let ids = that.joinIds(',')
        if (ids) {
            this.modalToastRequest({
                url: ProductBatchOnSpec,
                content: '确定选中的项全部上架？',
                thenText: '上架成功',
                data: {
                    dataIds: that.joinIds(','),
                    userId: 0
                }
            })
        } else {
            message.warning('至少选中一件商品')
        }

    }
    // 批量下架
    batchPutaway = () => {
        const that = this
        let ids = that.joinIds(',')
        if (ids) {
            this.modalToastRequest({
                url: ProductBatchOffSpec,
                content: '确定选中的项全部下架吗？',
                thenText: '下架成功',
                data: {
                    dataIds: that.joinIds(','),
                    userId: 0
                }
            })
        } else {
            message.warning('至少选中一件商品')
        }
    }

    // 商品上架或下架
    onoroffShelves = (item, type) => {
        let url = ''
        let content = ''
        let thenText = ''
        if (type === 'off') {
            url = ProductOffSpec
            content = '确认要下架该商品吗？'
            thenText = '下架成功'
        } else {
            url = ProductOnSpec
            content = '确认上架该商品吗？'
            thenText = '上架成功'
        }
        let data = {
            productSpecId: item.productSpecId,
            productId: item.productId,
            userId: 0
        }
        this.modalToastRequest({
            url,
            content,
            thenText,
            data,
        })
    }

    modalToastRequest = ({ url, content, thenText, data }) => {
        const that = this
        Modal.confirm({
            content: content,
            onOk: () => {
                request({
                    url: url,
                    method: 'post',
                    params: { md5Str: localStorage.getItem('authed') },
                    data: data,
                }).then(res => {
                    if (res.code === 100) {
                        message.success(thenText);
                        that.tableSortingParameters();
                    } else {
                        message.error(res.message)
                    }
                })
            }
        })
    }

    // 对比query 的参数是否改变
    isQueryChange = (nexQuery) => {
        let propsQuery = this.state.query || {}
        for (const key in nexQuery) {
            if (nexQuery[key] !== propsQuery[key]) {
                return true
            }
        }
        return false
    }

    goGoodsRecycleBin = () => {
        this.props.history.push({
            pathname: '/user/goods/recycleBin'
        })
    }

    search = (e) => {
        const that = this
        if (e.productCategoryIds && e.productCategoryIds.length > 0) {
            e.cateId = e.productCategoryIds[0]
            e.childCateId = e.productCategoryIds[1]
        }
        if (this.isQueryChange(e)) {
            this.setState({
                query: e,
                shopId: e.shopId
            }, () => {
                let obj = JSON.parse(JSON.stringify(e))
                delete obj.productCategoryIds
                that.tableSortingParameters(obj);
            })
        }
    }

    tableSortingParameters = (obj) => {
        let params = {
            ...obj
        }
        this.tableChild.sortingParameters(params);
    }

    tabCallback = (key) => {
        let params = {}
        switch (key) {
            case '0':
                params = {}
                break;
            case '1':
                params.status = 1
                break;
            case '2':
                params.status = 2
                break;
            case '3':
                params.status = 0
                break;
            default:
                params = {}
        }
        this.setState({
            stateQuery: params
        }, () => {
            this.tableChild.sortingParameters();
        })
    }

    render() {
        let { urls, titleList, isGoodsSetting, isAddBtnShow, categoryList, shopId, stateQuery, isAddGood, editProductId,shopList } = this.state;
        const _columns = (that) => {
            return [
                {
                    title: '商品信息',
                    key: 'productName',
                    width: 400,
                    render(item) {
                        return (
                            <div>
                                <Gimage style={{ height: 30, marginRight: 4 }} src={item.productPicUrl} alt="商品图片" />
                                <div style={{ display: 'inline-block' }}>{item.productName}</div>
                            </div>
                        )
                    }
                },
                {
                    title: '类目',
                    key: 'productCategoryId',
                    width: 200,
                    render(item) {
                        let str = item.cateName + '/' + item.childCateName
                        return <span>{str}</span>
                    }
                },
                {
                    title: '店铺信息',
                    key: 'shopName',
                    dataIndex: 'shopName',
                    width: 200,
                },
                {
                    title: '价格',
                    key: 'currentPrice',
                    dataIndex: 'currentPrice',
                    width: 80,
                    // sorter: true,
                },
                {
                    title: '会员价',
                    key: 'memberPrice',
                    width: 80,
                    dataIndex: 'memberPrice',
                },
                {
                    title: '库存',
                    key: 'pstock',
                    width: 100,
                    dataIndex: 'pstock',
                },
                {
                    title: '销量',
                    key: 'saleVolume',
                    dataIndex: 'saleVolume',
                    width: 80,
                },
                {
                    title: '状态',
                    key: 'statusStr',
                    dataIndex: 'statusStr',
                    width: 80,
                },
                {
                    title: '创建时间',
                    key: 'createTimeStr',
                    dataIndex: 'createTimeStr',
                    width: 200,
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 300,
                    render: (item) => {
                        const spanStyle = { color: '#1890ff', cursor: 'pointer' }
                        return (
                            <>
                                <span style={spanStyle} onClick={() => { this.checkDetiai(item) }}>查看详情</span>
                                <Divider type="vertical" />
                                <span style={spanStyle} onClick={() => this.editGoods(item)}>编辑商品</span>
                                <Divider type="vertical" />
                                {item.status === 0 && <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>发布</span>}
                                {item.status === 2 && <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>上架</span>}

                                {item.status === 1 && <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'off')}>下架</span>}


                                <Divider type="vertical" />
                                <span style={spanStyle} onClick={(e) => that.handleDelete(e, item)}>删除</span>
                            </>
                        )
                    }
                }
            ]
        }
        const searchData = [
            { type: 'cascader', field: 'productCategoryIds', width: '170px', label: '商品类目', options: categoryList, placeholder: '请选择商品类目' },
            { type: 'input', field: 'productName', label: '商品名称', placeholder: '请输入商品名称' },
            { type: 'input', field: 'childCateId', label: '商品标签', placeholder: '请输入商品标签' },
            { type: 'select', field: 'shopId', width: '170px', label: '所属店铺', list: shopList, placeholder: '请选择所属店铺' },
            { type: 'inputnumbergroup', field: 'price', label: '销售价格', min: 'minPrice', max: 'maxPrice' },
            { type: 'inputnumbergroup', field: 'stock', label: '库存', min: 'minStock', max: 'maxStock' },
            { type: 'inputnumbergroup', field: 'salesVolume', label: '销量', min: 'minSalesVolume', max: 'maxSalesVolume' },
        ]
        const operations = <Button icon="delete" onClick={this.goGoodsRecycleBin}>商品回收站</Button>;

        return (
            <div>
                <div style={{ display: !isAddGood ? 'block' : 'none' }} >
                    {
                        titleList && titleList.length > 0 && (
                            <div >
                                <Tabs defaultActiveKey='0' onChange={this.tabCallback} tabBarExtraContent={operations}>
                                    {
                                        titleList.map((item) => <TabPane tab={item.value} key={item.id}></TabPane>)
                                    }
                                </Tabs>

                            </div>
                        )
                    }
                    <div style={{ padding: '10px' }}>
                        <BaseForm data={searchData} handleSearch={this.search} />
                    </div>

                    <div>
                        {isAddBtnShow && <Button type="primary" icon="plus" style={{ margin: '10px' }} onClick={this.addGoods}>添加</Button>}
                        <Button style={{ margin: '10px' }} onClick={this.batchDelete}>批量删除</Button>
                        <Button style={{ margin: '10px' }} onClick={this.batchSoldOut}>批量上架</Button>
                        <Button style={{ margin: '10px' }} onClick={this.batchPutaway}>批量下架</Button>
                    </div>
                    {
                        isGoodsSetting ? <GtableEdit
                            size="small"
                            didMountShow={false}
                            rowKey={record => record.productSpecId}
                            triggerRef={ref => { this.tableChild = ref }}
                            urls={urls}
                            columns={_columns}
                            selectChange={this.selectChange}
                            onChange={this.handleChange}
                            pagination={true}
                            query={{ sortBy: 1, deleted: 0, shopId: shopId, ...stateQuery }}
                        /> : <GoodsSetting />
                    }
                </div>

                {
                    isAddGood && <AddGoods successBack={this.successBack} backCallback={this.goback} id={editProductId} />
                }

                {/* <div style={{ display: isAddGood ? 'block' : 'none' }} onClick={this.goback} >添加</div> */}
            </div>
        )
    }
}