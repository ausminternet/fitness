'use strict'

const Exercise = require('./exercise')
const utils = require('./utils')

class Workout {
  constructor(config, effort = 100) {
    this.config = config
    this.started = false
    this.effort = effort
    this.lastExercise = undefined
    this.createExercises()
  }

  createExercises() {
    this.exercises = this.config.exercises.map( e => {
      return new Exercise(e, this.effort)
    })
    this.totalExercises = this.exercises.length
  }

  start() {
    this.started = true
    this.next()
  }
  
  next() {
    this.exercisesLeft = this.exercises.filter(e => !e.done())
    this.currentExercise = this.nextExercise()
    this.currentExercise.currentRepeats = this.currentExercise.nextRepeats()
  }

  nextExercise() {
    if (this.exercisesLeft.length === 1) return this.exercisesLeft[0]
    let exs = this.sortByPercentageDone(this.exercisesLeft)
    let iMax = (this.exercisesLeft.length === 2) ? 1 : 2
    let i = utils.randomNumber(1, this.exercisesLeft.length / iMax) - 1
    return (this.isDifferentExercise(exs[i])) ? exs[i] : this.nextExercise()
  }

  sortByPercentageDone(exercises) {
    return exercises.sort((a, b) => {
      return a.percentageLeft() == b.percentageLeft() ?
        0 : +(a.percentageLeft() > b.percentageLeft()) || -1;
    });
  }

  isDifferentExercise(exercise) {
    return this.currentExercise !== exercise
  } 

  done() {
    return this.exercises.every(e => e.done())
  }
}

module.exports = Workout