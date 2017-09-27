'use strict'

const utils = require('./utils')

class Exercise {
  constructor(type, config) {
    this.config = config
    this.type = type
    this.repeatsDone = 0
  }

  maxRepeats() {
    let difficulty = this.config.exerciseDifficulty[this.type]
    return this.config.difficulties[difficulty].maxRepeats
  }

  maxRepeatsPerSet() {
    let difficulty = this.config.exerciseDifficulty[this.type]
    return this.config.difficulties[difficulty].maxRepeatsPerSet
  }
  
  minRepeatsPerSet() {
    let difficulty = this.config.exerciseDifficulty[this.type]
    return this.config.difficulties[difficulty].minRepeatsPerSet
  }

  nextRepeats() {
    let min = (this.minRepeatsPerSet() <= this.repeatsLeft()) ?
      this.minRepeatsPerSet() : this.repeatsLeft()  
    let max = (this.maxRepeatsPerSet() <= this.repeatsLeft()) ?
      this.maxRepeatsPerSet() : this.repeatsLeft()

    return utils.randomNumber(min, max)
  }

  done() {
    return this.repeatsDone === this.maxRepeats()
  }

  repeatsLeft() {
    return this.maxRepeats() - this.repeatsDone
  }

  percentageLeft() {
    return Math.floor((this.repeatsDone / this.maxRepeats()) * 100)
  }

  do(number = this.currentRepeats) {
    this.repeatsDone += number
  }

  doAll() {
    this.repeatsDone = this.maxRepeats()
  }
}

module.exports = Exercise