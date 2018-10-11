// pages/my/my.js
import {
  BookModel
} from "../../models/book.js"

import {
  ClassicModel
} from "../../models/classic"

import {
  LikeModel
} from "../../models/like"

const bookModel = new BookModel()
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: [],
    behavior: 'like',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  /**
   * 获取我喜欢的书籍数
   */
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  /**
   * 对期刊进行点赞/取消点赞
   * @param {*} event 
   */
  onLike(event) {
    const detail = event.detail
    this.data.behavior = this.data.behavior == 'like' ? 'like/cancel' : 'like'
    likeModel.like(this.data.behavior, detail.cid, detail.type)
  },

  /**
   * 获取我喜欢的期刊
   */
  getMyFavor() {
    classicModel.getMyFavor()
      .then(res => {
        this.setData({
          classics: res
        })
      })
  },

  /**
   * 获取用户是否授权，并获取用户信息
   */
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  /**
   * 获取用户信息
   * @param {*} event 
   */
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (!userInfo) return
    this.setData({
      userInfo,
      authorized: true,
    })
  },

  /**
   * 去往关于我的页面
   * @param {*} event 
   */
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  /**
   * 去往学习页面
   * @param {*} event 
   */
  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },
})