'use strict'

const utils = require('./utils')

class Exercise {
  constructor(config, effort) {
    this.type = config.type
    this.maxRepeatsDefault = config.repeats.max
    this.maxRepeatsPerSet = config.repeats.setMax
    this.minRepeatsPerSet = config.repeats.setMin
    this.effort = effort
    this.repeatsDone = 0
  }

  maxRepeats() {
    return Math.ceil(this.maxRepeatsDefault / 100 * this.effort)
  }

  nextRepeats() {
    let min = (this.minRepeatsPerSet <= this.repeatsLeft()) ?
      this.minRepeatsPerSet : this.repeatsLeft()  
    let max = (this.maxRepeatsPerSet <= this.repeatsLeft()) ?
      this.maxRepeatsPerSet : this.repeatsLeft()

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
}

module.exports = Exercise