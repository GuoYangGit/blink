/**
 * 关于书籍的数据获取类
 */
import {
    HTTP
} from '../util/http.js'

class BookModel extends HTTP {
    /**
     * 获取热门书籍集合
     */
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    /**
     * 查询书籍
     * @param {起始位置} start 
     * @param {搜索的关键字} q 
     */
    search(start, q) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                q,
                start
            }
        })
    }

    /**
     * 获取我喜欢的书籍数
     */
    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    /**
     * 获取书籍详情
     * @param {*} bid 
     */
    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    /**
     * 获取喜欢的状态
     * @param {书籍的id号} bid 
     */
    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }

    /**
     * 获取书籍的评论数
     * @param {书籍的id号} bid 
     */
    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }

    /**
     * 提交评论
     * @param {书籍的id号} bid 
     * @param {评论内容} comment 
     */
    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
}

export { BookModel }