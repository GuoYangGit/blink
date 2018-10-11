import {
    HTTP
} from '../util/http.js'

class KeywordModel extends HTTP {
    key = 'q'
    maxLength = 10
    /**
     * 获取历史搜索
     */
    getHistory() {
        const words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }

    /**
     * 获取最热的搜索
     */
    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }

    /**
     * 添加至搜索历史
     * @param {搜索内容} keyword 
     */
    addToHistory(keyword) {
        let words = this.getHistory()
        const has = words.includes(keyword)
        if (!has) {
            const length = words.length
            if (length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }
}

export { KeywordModel }