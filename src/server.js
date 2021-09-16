const app = require('./app')
const config = require('./config')

console.info(config)
app.listen(config.PORT)

