/**
 * book组建
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
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
    /**
     * 跳转至书籍详情页面
     * @param {*} event 
     */
    onTap(event) {
      const bid = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})
