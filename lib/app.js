'use strict'

const readline = require('readline')
const Workout = require('./workout')

process.stdin.setRawMode(true);
readline.emitKeypressEvents(process.stdin);

class App {
  constructor(config) {
    this.config = config
    this.started = false
    this.workout = new Workout(config)
  }

  tick() {
    if (!this.started) {
      this.start()
    } else {
      this.next()
    }
  }

  start() {
    console.log('-------------------')
    console.log('|      START      |')
    this.started = true
    this.workout.start()
    this.showTodo()
  }

  showTodo() {
    console.log('-------------------')
    console.log('type:', this.workout.currentExercise.type)
    console.log('do:', this.workout.currentExercise.currentRepeats)
  }

  next() {
    this.workout.currentExercise.do()
    this.showDone()
    if (!this.workout.done()) {
      this.workout.next()
      this.showTodo()
    } else {
      this.showAllDone()
      process.exit()
    }
  }

  showDone() {
    console.log(
      'done:', this.workout.currentExercise.repeatsDone,
      '(' + this.workout.currentExercise.percentageLeft() + '%)'
    )
    console.log('left:', this.workout.currentExercise.repeatsLeft())
  }

  showAllDone() {
    console.log('-------------------')
    console.log('|      DONE!      |')
    console.log('-------------------')
  }
}

module.exports = App