/**
 * 关于上拉加载更多的行为类
 * behavior 1.组建的公共属性与方法的继承 2.是一种多继承的特质 3.子类的属性会覆盖behavior的属性
 * 使用:
 * 1.improt导入此类
 * 2.在page/component中设置 behaviors: [paginationBev],
 * 3.直接通过this.使用
 */
const paginationBev = Behavior({
    data: {
        dataArray: [], //需要加载的数据
        total: null, //分页的页数
        noneResult: false, //没有更多数据
        loading: false //上拉加载状态
    },

    methods: {
        /**
         * 设置加载更多的数据
         * @param {加载的数据} dataArray
         */
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray,
            })
        },

        /**
         * 获取数据的长度
         */
        getCurrentStart() {
            return this.data.dataArray.length
        },

        /**
         * 设置总页数
         * @param {总页数} total
         */
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },

        /**
         * 是否还有更多数据
         */
        hasMore() {
            return this.data.dataArray.length < this.data.total
        },

        /**
         * 清空整个状态
         */
        initialize() {
            this.setData({
                dataArray: [],
                noneResult: false,
                loading: false,
                total: null
            })
        },

        /**
         * 判断是否可以上拉加载更多
         */
        isLocked() {
            return this.data.loading
        },

        /**
         * 防止多次上拉加载进行加锁
         */
        locked() {
            this.setData({
                loading: true
            })
        },

        /**
         * 防止多次上拉加载进行解锁
         */
        unlocked() {
            this.setData({
                loading: false
            })
        },
    }
})

export { paginationBev }