const express = require('express')

const app = express()

app.use(express.json());

app.use('/', require('./routes/api/routesSlote'))

app.use((_req, res, _next) => {
  res.status(404).json({message: 'Note found'})
})

app.use((err, _req, res, _next) => {
  res.status(500).json({message: err.message})
})

module.exports = app
