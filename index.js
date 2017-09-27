'use strict'

const fs = require('fs')
const App = require('./lib/app')
const readline = require('readline')
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const app = new App(config)
app.start()

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } 
  if (key.name === 'space') {
    app.next()
  }
})
