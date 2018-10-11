/**
 * 微信授权组件
 */
Component({

  options: {
    /**占位view需要设置的属性 */
    multipleSlots: true
  },

  /**
    * 组件的属性列表
    */
  properties: {
    openType: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
