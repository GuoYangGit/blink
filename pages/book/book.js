// pages/book/book.js
import {
  BookModel
} from "../../models/book.js"

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },

  /**
   * 点击搜索框
   * @param {*} event 
   */
  onSearching(event) {
    this.setData({
      searching: true,
    })
  },

  /**
   * 取消搜索
   * @param {*} event 
   */
  onCancel(event) {
    this.setData({
      searching: false,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      more: !this.data.more
    })
  },
})