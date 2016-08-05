'use strict' // eslint-disable-line strict
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')({ dev: true })
const compression = require('compression')

// const path = require('path')
// const requestProxy = require('express-request-proxy')
// const objectAssign = require('object-assign')

const app = express()
const server = require('http').createServer(app)
// const io = require('socket.io')(server)

const compiler = webpack(config)
const port = 3000

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(compression({
  threshold: 512,
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', express.static('.'))

// app.all('*', function(req, res, next) {
//   let url = require('url').parse(req.url)
//   let conf = objectAssign({}, req, {
//     url: 'http://127.0.0.1:8888' + url.pathname,
//     timeout: 120000
//   })
//   requestProxy(conf)(req, res, next)
// })

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log(`Listening at http://localhost:${port}`) // eslint-disable-line no-console
})

// io.on('connection', socket => {
//   io.set('origins', '*:*')
//   console.log('connected') // eslint-disable-line no-console
//   socket.emit('update', 'connected')
//   socket.on('single', () => {
//     socket.emit('update', 'single')
//   })
//   socket.on('publish', data => {
//     io.sockets.emit('update', data)
//   })
// })
