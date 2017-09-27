'use strict'

const fs = require('fs')
const App = require('./lib/app')
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const app = new App(config)
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } 
  if (key.name === 'space') {
    app.tick()
  }
})
console.log('press space to start...')
