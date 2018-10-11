/**
 * 关于期刊的数据类
 */
import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  /**
   * 获取最新期刊
   */
  getLatest() {
    return this.request({
      url: 'classic/latest',
    }).then(res => {
      this._setLatestIndex(res.index)
      let key = this._getKey(res.index)
      wx.setStorageSync(key, res)
      return res
    })
  }

  /**
   * 获取最近期刊
   * @param {期刊位置} index 
   * @param {上期/下期} nextOrPrevious 
   */
  getClassic(index, nextOrPrevious) {
    let key = nextOrPrevious == 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      return this.request({
        url: `classic/${index}/${nextOrPrevious}`,
      }).then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
        return res
      })
    } else {
      return Promise.resolve(classic)
    }
  }

  /**
   * 获取我喜欢的期刊
   */
  getMyFavor() {
    return this.request({
      url: 'classic/favor',
    })
  }

  /**
   * 判断是否是第一期
   * @param {*} index 
   */
  isFirst(index) {
    return index == 1 ? true : false
  }

  /**
   * 判断是否是最新一期
   * @param {*} index 
   */
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  /**
   * 设置最新一期
   * @param {*} index 
   */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  /**
   * 获取最新一期
   */
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  /**
   * 生成缓存需要的key
   * @param {*} index 
   */
  _getKey(index) {
    let key = `classic-${index}`
    return key
  }
}

export { ClassicModel }