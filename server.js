var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

// indica diretório de produção
var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

// indica o index.html
app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/index.html'))
})

// inicializa servidor express
var port = process.env.PORT || 5000
app.listen(port)

