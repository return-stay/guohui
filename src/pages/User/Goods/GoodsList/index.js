import React from 'react'
import { Button, Divider, Modal, message, Form, Input, Select, Cascader, Tabs } from 'antd'
import GtableEdit from '../../../../common/GtableEdit'
import GoodsSetting from '../GoodsSetting'
import { dismantleSearch, getOptionsList } from '../../../../utils'
import Gimage from '../../../../common/Gimage'
import {
    CategoryFindAllCate,
    ProductCheckState,
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
            urls: {},
            isGoodsSetting: true,
            sortedInfo: null,
            stateQuery: {},
            titleList: [
                { value: '所有商品', id: 0, type: 0 },
                { value: '售卖中', id: 1, type: 1 },
                { value: '已下架', id: 2, type: 2 },
                { value: '未发布', id: 3, type: 3 },
            ],
            shopList: [], //店铺列表
        }
    }

    componentDidMount() {
        let searchObj = dismantleSearch(this)
        let urls = {
            list: '/product/v1/search',
            listMethod: 'POST',
            add: '',
            edit: '',
            delete: '/product/delete',
            deleteMethod: 'POST'
        }
        if (searchObj.shopId) {
            urls = {
                list: '/shop/v1/product-list',
                listMethod: 'POST',
                add: '',
                edit: '',
                delete: '/product/delete',
                deleteMethod: 'POST'
            }
        }
        this.setState({
            ...searchObj,
            urls,
        }, () => {
            this.tableChild.sortingParameters();
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
        let state = 0
        if (type === 'off') {
            url = ProductCheckState
            content = '确认要下架该商品吗？'
            thenText = '下架成功'
            state = 2
        } else {
            url = ProductCheckState
            content = '确认上架该商品吗？'
            thenText = '上架成功'
            state = 1
        }
        let data = {
            state: state,
            productId: item.productId,
            operator: 'admin'
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

    handleDelete = (item) => {
        this.modalToastRequest({
            url: ProductCheckState,
            content: '确认要删除该商品吗？',
            thenText: '删除成功',
            data: {
                state: 3,
                productId: item.productId,
                operator: 'admin'
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
        console.log(e)
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
                params.state = 1
                break;
            case '2':
                params.state = 2
                break;
            case '3':
                params.state = 0
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
        let { urls, isGoodsSetting, isAddBtnShow, shopId, stateQuery, isAddGood, editProductId, titleList } = this.state;
        const _columns = (that) => {
            return [
                {
                    title: '商品信息',
                    key: 'productName',
                    width: 300,
                    render(item) {
                        return (
                            <div className="gl-table-th">
                                <Gimage style={{ height: 30, marginRight: 4, display: 'inline-block' }} src={item.coverImage} alt="图片" />
                                <span className="gl-table-text">{item.productName}</span>
                            </div>
                        )
                    }
                },
                {
                    title: "商品主标签",
                    key: 'majorLabels',
                    dataIndex: 'majorLabels',
                    width: 100,
                    render(majorLabels) {
                        let str = majorLabels.join("/")
                        return <span>{str}</span>
                    }
                },
                {
                    title: '类目',
                    key: 'categoryOneName',
                    width: 160,
                    render(item) {
                        return <span>{item.categoryOneName}/{item.categoryTwoName}</span>
                    }
                },
                {
                    title: '所属商铺',
                    key: 'shopName',
                    width: 160,
                    render(item) {
                        let shopName = item.shopDTO && item.shopDTO.shopName
                        return <span>{shopName}</span>
                    }
                },
                {
                    title: '现价',
                    key: 'salePrice',
                    dataIndex: 'salePrice',
                    width: 100,
                },
                {
                    title: '原价',
                    key: 'originalPrice',
                    dataIndex: 'originalPrice',
                    width: 100,
                },
                // {
                //     title: '企业会员价',
                //     key: 'comMemberPrice',
                //     dataIndex: 'comMemberPrice',
                //     width: 100,
                // },
                {
                    title: '库存',
                    key: 'productStock',
                    dataIndex: 'productStock',
                    width: 100,
                },
                {
                    title: '销量',
                    key: 'saleVolume',
                    dataIndex: 'saleVolume',
                    width: 100,
                },
                {
                    title: '商品单位',
                    key: 'unit',
                    dataIndex: 'unit',
                    width: 100,
                },
                {
                    title: '状态',
                    key: 'status',
                    dataIndex: 'status',
                    width: 100,
                    render(status) {
                        let str = ''
                        switch (status) {
                            case 0:
                                str = '待上架'
                                break;
                            case 1:
                                str = '已上架'
                                break;
                            case 2:
                                str = '已下架'
                                break;
                            default:
                                str = '删除'
                        }
                        return <span>{str}</span>
                    }
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
                                {
                                    item.status !== 3 && <>
                                        <Divider type="vertical" />
                                        <span style={spanStyle} onClick={() => this.editGoods(item)}>编辑商品</span>
                                    </>
                                }
                                {item.status === 0 && <>
                                    <Divider type="vertical" />
                                    <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>发布</span>
                                </>}
                                {item.status === 2 && <>
                                    <Divider type="vertical" />
                                    <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'on')}>上架</span>
                                </>}

                                {item.status === 1 && <>
                                    <Divider type="vertical" />
                                    <span style={spanStyle} onClick={(e) => this.onoroffShelves(item, 'off')}>下架</span>
                                </>}


                                {item.status !== 3 && <>
                                    <Divider type="vertical" />
                                    <span style={spanStyle} onClick={(e) => this.handleDelete(item)}>删除</span>
                                </>}
                            </>
                        )
                    }
                }
            ]
        }
        const operations = <Button icon="delete" onClick={this.goGoodsRecycleBin}>商品回收站</Button>;
        return (
            <div className="user-box">
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
                    <div style={{ paddingBottom: 10 }}>
                        <SearchGoodsForm handleSearch={this.search} />
                    </div>

                    <div>
                        {isAddBtnShow && <Button type="primary" icon="plus" style={{ margin: '10px' }} onClick={this.addGoods}>添加</Button>}
                        {/* <Button style={{ margin: '10px' }} onClick={this.batchDelete}>批量删除</Button>
                        <Button style={{ margin: '10px' }} onClick={this.batchSoldOut}>批量上架</Button>
                        <Button style={{ margin: '10px' }} onClick={this.batchPutaway}>批量下架</Button> */}
                    </div>
                    {
                        isGoodsSetting ? <GtableEdit
                            didMountShow={false}
                            rowKey={record => record.productId}
                            triggerRef={ref => { this.tableChild = ref }}
                            urls={urls}
                            columns={_columns}
                            selectChange={this.selectChange}
                            onChange={this.handleChange}
                            pagination={true}
                            query={{ sortBy: 1, sortField: 'all', shopId: shopId, ...stateQuery }}
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



class SearchGoods extends React.Component {
    constructor() {
        super()
        this.state = {
            categoryList: [],
            shopList: []
        }
    }
    componentDidMount() {
        this.getShopSearch()
        this.getCategoryFindAllCate()
    }

    getShopSearch = () => {
        request({
            url: ShopSearch,
            method: 'post',
            data: {
                pageSize: 10000,
                pageNumber: 1,
            }
        }).then(res => {
            if (res.code === 100 && res.data) {
                let list = res.data.dataList
                for (let i = 0; i < list.length; i++) {
                    list[i].id = list[i].shopId
                    list[i].label = list[i].name
                    list[i].value = list[i].shopId
                }
                this.setState({
                    shopList: list
                })
            }
        })
    }



    getCategoryFindAllCate = (parentId, callback) => {
        let obj = {}
        obj.parentId = parentId || 0
        request({
            url: CategoryFindAllCate,
            params: obj
        }).then(res => {
            let list = res.data
            for (let i = 0, len = list.length; i < len; i++) {
                list[i].value = list[i].id
                list[i].label = list[i].name
                if (parentId) {
                    list[i].isLeaf = true
                } else {
                    list[i].isLeaf = false
                }
            }
            if (parentId) {
                callback && callback(list)
            } else {
                this.setState({
                    categoryList: list
                })
            }
        })
    }

    loadData = (selectedOptions) => {
        console.log(selectedOptions)
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const that = this
        this.getCategoryFindAllCate(selectedOptions[0].id, (list) => {
            targetOption.loading = false;
            targetOption.children = list
            that.setState({
                categoryList: [...this.state.categoryList],
            });
        })
    }

    onCascaderChange = (value) => {
        console.log(value)
        this.setState({
            categoryOneId: value[0],
            categoryTwoId: value[1]
        })
    }

    handleFilterSubmit = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            this.props.handleSearch(fieldsValue);
        })
    }
    reset = () => {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryList, shopList } = this.state
        return <div>
            <Form layout='inline'>

                <Form.Item label="商品名称" >
                    {getFieldDecorator('keyword', { valuePropName: 'value' })(<Input style={{ width: 170 }} placeholder='请输入名称' />)}
                </Form.Item>

                <Form.Item label="商品类目">
                    {getFieldDecorator('productCategoryId', { valuePropName: 'value' })(
                        <Cascader style={{ width: 170 }} options={categoryList} changeOnSelect loadData={this.loadData} onChange={this.onCascaderChange} placeholder="请选择类目" />
                    )}
                </Form.Item>

                <Form.Item label="所属店铺" >
                    {getFieldDecorator('shopId', { valuePropName: 'value' })(
                        <Select style={{ width: 170 }} placeholder='请选择所属店铺'>
                            {getOptionsList(shopList)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>搜索</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Form.Item>
            </Form>

        </div>
    }
}

const SearchGoodsForm = Form.create()(SearchGoods)