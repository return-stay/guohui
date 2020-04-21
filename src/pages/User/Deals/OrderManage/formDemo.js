import React, { Component } from 'react'
import { Icon } from 'antd'

// hoc: 包装用户表单，增加数据管理能力及校验功能
const FormCreate = Comp => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.options = {} // 保存字段选项设置
      this.state = {} // 保存各字段的值
    }

    // 处理表单项输入事件
    handleChange = e => {
      const { name, value } = e.target
      this.setState(
        {
          [name]: value
        },
        () => {
          // 处理状态变化后的校验
          // 由于setState是异步的，所以这里需要在回调函数中处理后续操作
          // 保证状态已经完成改变
          this.validateField(name)
        }
      )
    };

    // 表单项校验，可以引用async-validator库来做校验，这里为了简便直接做非空校验
    validateField = field => {
      // this.options ↓↓↓
      // {
      //   "username": {
      //     "rules": [{
      //       "required": true,
      //       "message": "请填写用户名"
      //     }]
      //   },
      //   "password": {
      //     "rules": [{
      //       "required": true,
      //       "message": "请填写密码"
      //     }]
      //   }
      // }
      const { rules } = this.options[field]
      const ret = rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            this.setState({
              [field + 'Message']: rule.message
            })
            // this.state ↓↓↓
            // {"username":"","usernameMessage":"","password":"","passwordMessage":""}
            return true // 校验失败，返回true
          }
        }
        return false
      })
      if (!ret) {
        // 校验成功，将错误信息清空
        this.setState({
          [field + 'Message']: ''
        })
      }
      return !ret
    };

    // 校验所有字段
    validate = cb => {
      const rets = Object.keys(this.options).map(field =>
        this.validateField(field)
      )
      // 如果校验结果数组中全部为true，则校验成功
      const ret = rets.every(v => v === true)
      cb(ret)
    };

    getFieldDecorator = (field, option) => InputComp => {
      this.options[field] = option
      return (
        <div>
          {/* 把已经存在的jsx克隆一份，并修改它的属性，直接修改属性是不允许的。
          这里在更高级别定义onChange事件，控制元素的值，
          这样当组件发生变化时，就不用进行组件之间的来回通信 */}
          {React.cloneElement(InputComp, {
            name: field, // 控件name
            value: this.state[field] || '', // 控件值
            onChange: this.handleChange, // change事件处理
            onFocus: this.handleFocus
          })}
        </div>
      )
    };

    // 控件获取焦点事件
    handleFocus = e => {
      const field = e.target.name
      this.setState({
        [field + 'Focus']: true
      })
    }

    // 判断控件是否被点击过
    isFieldTouched = field => !!this.state[field + 'Focus']

    // 获取控件错误提示信息
    getFieldError = field => this.state[field + 'Message']

    render() {
      return (
        <Comp
          {...this.props}
          getFieldDecorator={this.getFieldDecorator}
          validate={this.validate}
          isFieldTouched = {this.isFieldTouched}
          getFieldError = {this.getFieldError}
        />
      )
    }
  }
}

class FormItem extends Component {
  render() {
    return (
      <div className='formItem'>
        { this.props.children }
        { this.props.validateStatus === 'error' && (
          <p style={ { color: 'red' } }>{ this.props.help}</p>
        )}
      </div>
    )
  }
}

class Input extends Component {
  render() {
    return (
      <div>
        {/* 前缀图标 */}
        {this.props.prefix}
        <input {...this.props} />
      </div>
    )
  }
}

@FormCreate
class MForm extends Component {
  onSubmit = () => {
    this.props.validate(isValid => {
      if (isValid) {
        alert('校验成功，可以登录了')
        console.log(this.props.value)
      } else {
        alert('校验失败')
      }
    })
  };
  render() {
    const { getFieldDecorator, isFieldTouched, getFieldError } = this.props
    const usernameError = isFieldTouched('username') && getFieldError('username')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div>
        <FormItem
          validateStatus={ usernameError ? 'error' : '' }
          help={usernameError || ''}
        >
        用户名：{getFieldDecorator('username', {
            rules: [{ required: true, message: '请填写用户名' }]
          })(<Input type='text' prefix={<Icon type='user' />} />)}
        </FormItem>
        <FormItem
          validateStatus={ passwordError ? 'error' : '' }
          help={passwordError || ''}
        >
        密码：{getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写密码' }]
          })(<Input type='password' prefix={<Icon type='lock' />} />)}
        </FormItem>
        <button onClick={this.onSubmit}>Log in</button>
      </div>
    )
  }
}

export default MForm