const { Router } = require('../../../core')
const { NotFoundException } = require('../../../core/exception')

const demo = new Router({
  prefix: '/v1/demo',
  disabled: true
})

demo.get('/list/2', (ctx) => {
  console.log(ctx)
  throw new NotFoundException()
})

module.exports = demo
