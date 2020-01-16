const { Service } = require('../../core/interface')

class DemoService extends Service {
  demo() {
    console.log(this.ctx.config.getItem('rootDir'))
  }
}

module.exports = DemoService
