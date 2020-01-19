const { Router } = require('../../../core')
const { BadRequestException } = require('../../../core/exception')
const demo = new Router({
  prefix: '/v1/demo'
})

demo.all('/list/:id', (ctx) => {
  ctx.log.warn('>>>> 啊哈哈哈')
  throw new BadRequestException()
})

module.exports = demo
