// pages/book-detail/book-detail.js
import {
  BookModel
} from "../../models/book.js"
import {
  LikeModel
} from "../../models/like.js"

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const id = options.bid
    //请求书籍详情
    const detail = bookModel.getDetail(id)
    //请求评论
    const comments = bookModel.getComments(id)
    //请求点赞状态
    const likeStatus = bookModel.getLikeStatus(id)
    //合并请求
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })
  },

  /**
   * 点赞/取消点赞
   * @param {*} event 
   */
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  /**
   * 打开评论
   * @param {*} event 
   */
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  /**
   * 关闭评论
   * @param {*} event 
   */
  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  /**
   * 发送评论
   * @param {*} event 
   */
  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: ' + 1',
          icon: 'none'
        })
        //增加评论数至第一位
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  },
})