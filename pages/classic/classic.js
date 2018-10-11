import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest()
      .then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
  },

  /**
   * 点赞/取消点赞
   * @param {*} event 
   */
  onLike(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  /**
   * 下一期刊
   * @param {*} event 
   */
  onNext(event) {
    this._updateClassic('next')
  },

  /**
   * 上一期刊
   * @param {*} event 
   */
  onPrevious(event) {
    this._updateClassic('previous')
  },

  /**
   * 切换期刊
   * @param {*} nextOrPrevious 
   */
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious)
      .then(res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
  },

  /**
   * 获取点赞状态
   * @param {*} artID 
   * @param {*} category 
   */
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category)
      .then(res => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
        })
      })
  }
})