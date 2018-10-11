import {
  HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
  /**
   * 进行点赞
   * @param {点赞状态('like'/'like/cancel')} behavior
   * @param {id号} artID 
   * @param {类型} categotry 
   */
  like(behavior, artID, categotry) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: categotry
      }
    })
  }

  /**
   * 获取点赞信息
   * @param {*} artID 
   * @param {*} categotry 
   */
  getClassicLikeStatus(artID, categotry) {
    return this.request({
      url: `classic/${categotry}/${artID}/favor`,
    })
  }
}

export { LikeModel }