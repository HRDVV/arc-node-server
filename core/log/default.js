const path = require('path')

function layout() {
  return {
    type: 'pattern',
    pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}][%p] %f{2}:%l:%o - %]%m'
  }
}

module.exports = {
  appenders: {
    app: {
      type: 'dateFile',
      filename: path.join(process.cwd(), 'logs', 'app'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      layout: layout()
    },
    out: {
      type: 'console',
      encoding: 'utf-8',
      layout: layout()
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
      enableCallStack: true
    },
    appLog: {
      appenders: process.env.NODE_ENV === 'development' ? ['out'] : ['out', 'app'],
      level: 'info',
      enableCallStack: true
    }
  }
}
