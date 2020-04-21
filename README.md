  ### 国惠后台系统

  存在问题
  分页和搜索放到一起不起作用
 
 #### 用到react相关的生态链模块:
  * `react`
  * `react-dom`
  * `react-router-dom`
  * `redux`: 
  * `react-redux`
  * `redux-actions`
  * `redux-thunk`
  * `antd`
 
 #### 项目要点
  * `less配置、antd按需加载`
  * `路由懒加载`
  * `根据权限生成动态路由`
  * `使用connect简化redux使用`
  * `全局数据请求拦截处理及loading`
  * `多个代理配置`
  * `常用表单封装、tabel封装`
  * `抽离第三方库文件dll`
  
  #### 项目启动步骤
1. 安装包
   cnpm install 
2. 开发运行
  npm start
3. 生产打包
  npm run dll (仅需运行一次)
  npm run build



  #### 项目目录
  src 开发所有文件都放到这里
  1. actions  资源文件夹 所有图标都放这里
  2. common  公共组件库
  > * BaseForm 表单组件
  > * Etable Gtable表格组件  GtableEdit 带有编辑的表格组件
  > * Geditor 富文本组件
  > * Gupload 上传组件
  > * Gdownload 下载组件
  3. config 请求接口路径配置
  4. pages 页面
  > * Login 登录页
  > * Home 首页
  > * NotFound
  > * User 登录之后的页面展示
  > > 1. Games 商品相关
  5. store 数据逻辑处理
  6. stylus  公共样式
  7. utils 公共方法库


  #### 参与贡献
1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


  #### 码云特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5.  码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
