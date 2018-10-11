/**
 * 搜索组件
 */
import {
  KeywordModel
} from "../../models/keyword.js"
import {
  BookModel
} from "../../models/book.js"
import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({

  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false,
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 加载更多
     */
    loadMore() {
      if (!this.data.q) return
      if (this.isLocked()) return
      if (!this.hasMore()) return
      this.locked()
      bookModel.search(this.getCurrentStart(), this.data.q)
        .then(res => {
          this.setMoreData(res.books)
          this.unlocked()
        }).catch(() => {
          this.unlocked()
        })
    },

    /**
     * 关闭搜索
     * @param {*} event 
     */
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },

    /**
     * 取消搜索
     * @param {*} event 
     */
    onDelete(event) {
      this._closeResult()
      this.initialize()
      this.setData({
        q: ''
      })
    },

    /**
     * 点击搜索
     * @param {*} event 
     */
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q
          })
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    /**
     * 显示中间的loading框
     */
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    /**
     * 隐藏中间的loading框
     */
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    /**
     * 显示搜索结果
     */
    _showResult() {
      this.setData({
        searching: true
      })
    },

    /**
     * 隐藏搜索结果
     */
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
