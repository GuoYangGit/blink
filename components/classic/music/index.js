/**
 * 音乐组件
 */
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({

  behaviors: [classicBeh],
  /**
     * 组件的属性列表
     */
  properties: {
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 设置音乐播放/暂停
     * @param {*} event 
     */
    onPlay: function (event) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },

    /**
     * 初始化播放状态
     */
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        })
        return
      }

      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true,
        })
      }
    },

    /**
     * 设置监听音乐控件的状态
     */
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })

      mMgr.onPause(() => {
        this._recoverStatus()
      })

      mMgr.onStop(() => {
        this._recoverStatus()
      })

      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  },
})
