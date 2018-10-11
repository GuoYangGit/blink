/**
 * 流行页面期刊切换组件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 切换至左边
     * @param {*} event 
     */
    onLeft: function (event) {
      if (!this.properties.latest) {
        this.triggerEvent('left', {}, {})
      }
    },
    /**
     * 切换至右边
     * @param {*} event 
     */
    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
