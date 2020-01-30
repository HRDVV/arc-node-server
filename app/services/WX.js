const { Service } = require('@core/interface')
const { UnAnthorizedException } = require('@core/exception')

class WX extends Service {
  /**
   * 登录凭证校验
   * @param {*} code 
   */
  async code2Session(code) {
    let wxApi = this.ctx.config.getItem('wxApi')
    let appid = this.ctx.config.getItem('wx.appId')
    let appSecret = this.ctx.config.getItem('wx.appSecret')
    let result = await this.ctx.http.get(`${ wxApi }/sns/jscode2session?appid=${ appid }&secret=${ appSecret }&js_code=${ code }&grant_type=authorization_code`)
    if (result.status != 200) {
      throw new UnAnthorizedException('获取openid失败')
    }
    this.ctx.log.info(`>>>> ${ JSON.stringify(result.data) }`)
    let errcode = result.data.errcode
    let errmsg = result.data.errmsg
    if (errcode) {
      throw new UnAnthorizedException(`获取openid失败: ${ errmsg }`)
    }
    return result.data
  }
}

module.exports = WX
