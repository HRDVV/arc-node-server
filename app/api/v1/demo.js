const Router = require('../../../core/router')
const DemoValidator = require('../../validators/demo')
const ResultWraper = require('../../libs/result')
const demo = new Router({
  prefix: '/v1/demo'
})

demo.all('/list', async (ctx) => {
  console.log(ctx.config.getItem('db'))
  let v = await new DemoValidator().validate(ctx, {
    flag: 'type'
  })
  ctx.body = ResultWraper.success(v.get(['query', 'type']))
})

module.exports = demo
