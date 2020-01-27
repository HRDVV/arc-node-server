require('module-alias/register')
const { Arc } = require('../core')
const createApp = require('../app/app')

const app = new Arc()

createApp(app)
