import app from './app.js'
import config from './config.js'

const server = app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`)
})

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})