const { Router } = require('../../../core')
const { BadRequestException } = require('../../../core/exception')
const demo = new Router({
  prefix: '/v1/demo'
})

demo.all('/list/:id', () => {
  throw new BadRequestException()
})

module.exports = demo
