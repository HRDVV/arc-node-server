const { Arc } = require('./core')
const error = require('./middlewares/exception')

const app = new Arc()

app.use(error)

app.injectExtends()

app.run()
