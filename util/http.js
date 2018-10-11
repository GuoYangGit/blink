/**
 * 处理网络请求封装类
 */
import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: '',
  3000: '',
}

class HTTP {
  /**
   * 外部调用网络请求方式
   * 通过外面包裹花括号{}同样可以传入对象
   * @param {*} param0 
   */
  request({ url, data = {}, method = 'GET' }) {
    //这里使用Promise来进行封装网络请求
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  /**
   * 真正的网络请求处理
   */
  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  /**
   * 显示错误信息
   * 进行toast
   * @param {*} error_code 
   */
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}

//将请求进行导出
export {
  HTTP
}