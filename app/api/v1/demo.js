const { Router } = require('../../../core')
const { NotFoundException } = require('../../../core/exception')

const demo = new Router({
  prefix: '/v1/demo'
})

demo.get('/list', (ctx) => {
  ctx.services.demo.demo()
  
  // throw new NotFoundException()
})

module.exports = demo
