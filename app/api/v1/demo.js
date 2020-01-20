const { Router } = require('../../../core')
const DemoValidator = require('../../validators/demo')
const ResultWraper = require('../../libs/result')
const demo = new Router({
  prefix: '/v1/demo'
})

demo.all('/list', async (ctx) => {
  let v = await new DemoValidator().validate(ctx, {
    flag: 'type'
  })
  ctx.body = ResultWraper.success(v.get(['query', 'type']))
})

module.exports = demo
