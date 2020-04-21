import React from "react"
import { Menu, Icon, Breadcrumb, Select, message } from "antd"
import { Link } from "react-router-dom"
import request from './request'

const Option = Select.Option
const { SubMenu } = Menu
const MenuItem = Menu.Item

//获取侧边栏Item
export const getMenuItem = list => {
    return list.map((item, index) => {
        if(!item.isHide) {
            if (item.children && item.children.length > 0) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                {item.icon && <Icon type={item.icon} />}
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {getMenuItem(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <MenuItem key={item.path}>
                        <Link to={item.path}>
                            {item.icon && <Icon type={item.icon} />}
                            <span>{item.name}</span>
                        </Link>
                    </MenuItem>
                )
            }
        } else {
            return null
        }
    })
}

//获取面包屑Item
export const getBreadItem = (list) => {
    const arr = [];
    function getItem(allList){
        allList.forEach((item,index) => {
            if(item.children && item.children.length>0){
                arr.push(
                    <Breadcrumb.Item key={index}>
                        <Link  to={item.redirect}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                )
                getItem(item.children)
                
            }else{
                arr.push(
                    <Breadcrumb.Item key={index}>
                        <Link  to={item.path}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                )
            }
            
        })
    }
    getItem(list)
    return arr
}

//左侧栏默认展开项
export const filterRoutes = pathname => {
    let pathSnippets = pathname.split('/').filter(path => path)
    let paths = pathSnippets.map((path, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`)
    paths.splice(0,1)
    return paths
}

//获取options
export const getOptionsList = data => {
    if(!(data instanceof Array)){
        return []
    };
    return data.map((item,index)=>{
        return <Option key={item.id} value={item.value} disabled={item.disabled}>{item.label}</Option>
    })
}

//获取分页关键内容
export const pagination = (data,callback) =>{
    return {
        current:data.page,
        pageSize:data.pageSize,
        total:data.total,
        showQuickJumper:false,
        onChange:(current)=>{
            callback(current)
        },
        showTotal:()=>{
            return `共${data.total}条`
        }
    }
}

//初始列表
export const getList = (_this,options) => {
    request(options)
    .then(res =>{
        if(res && res.data && res.data.data){
            let dataSource = res.data.data.map((item, index) => {
                item.key = index;
                return item;
            });
            _this.setState({
                dataSource,
                pagination: pagination(res.data, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        }
    })
}

//设置勾选后的内容
/**
 * @param {*选中行的索引} selectedRowKeys Array
 * @param {*选中行对象} selectedItem Array
 */
export const updateSelectedItem = (selectedRowKeys,selectedRows,that) => {
    const rowSelection = {
        selectedRowKeys,selectedRows
    }
    that.setState({
        rowSelection
    })
}

//获取localstorage
export const getLocal = item => {
    return localStorage.getItem(item)
}

//设置localstorage
export const setLocal = (key,value) => {
    localStorage.setItem(key,value)
}

//移除
export const removeLocal = (key) => {
    localStorage.removeItem(key)
}

//时间戳转换
export const formateDate = time => {
    if(!time)return '';
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}

// 图片转换相关方法
export const getBase64 = (file, callback) => {
    // const reader = new FileReader();
    // reader.addEventListener('load', () => callback(reader.result));
    // reader.readAsDataURL(img);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// 
export const beforeUpload = (file) => {
    console.log(file.type)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'; 
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 15;
    if (!isLt2M) {
        message.error('图片大小不能超过 15MB!');
    }
    return isJpgOrPng && isLt2M;
}


//参数拼接成 ？key=value&key2=value2
export const searchJoint = (obj) => {
    let str = '?'
    for (const key in obj) {
        str += key + '=' + obj[key] + '&'
    }
    str = str.substr(0,str.length-1)
    return str
}

export const dismantleSearch = (that) => {
    let str = that.props.location.search
    let newstr = str = str.substr(1)

    let arr  = newstr.split('&')
    let obj = {}
    for(let i=0; i < arr.length; i++) {
        let itemArr = arr[i].split('=')
        obj[itemArr[0]] = itemArr[1]
    }

    return obj
}