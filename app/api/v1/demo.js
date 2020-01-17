const { Router } = require('../../../core')
const demo = new Router({
  prefix: '/v1/demo'
})

demo.get('/list/:id', (ctx) => {
  ctx.log.info('3434')
  ctx.body = {
    name: 'hrd'
  }
})

module.exports = demo
