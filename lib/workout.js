'use strict'

const Exercise = require('./exercise')
const utils = require('./utils')

class Workout {
  constructor(config) {
    this.config = config
    this.starte = false
    this.lastExercise = undefined
    this.createExercises()
  }

  createExercises() {
    this.exercises = this.config.excercises.map( e => {
      return new Exercise(e, this.config)
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
    let e = this.sortByPercentageDone(this.exercisesLeft)
    if (this.exercisesLeft.length === 1) return e[0]
    let i = utils.randomNumber(1, this.exercisesLeft.length / 2) - 1
    return (this.isDifferentExercise(e[i])) ? e[i] : this.nextExercise()
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