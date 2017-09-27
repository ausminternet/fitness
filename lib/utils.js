function randomNumber(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function logTodo(w) {
  console.log('--------------------')
  console.log('type:', w.currentExercise.type)
  console.log('do:', w.currentExercise.currentRepeats)
}

function logAllDone(w) {
  console.log('--------------------')
  console.log('DONE!')
}

function logDone(w) {
  console.log('done:', w.currentExercise.repeatsDone)
  console.log('left:', w.currentExercise.repeatsLeft())
}

module.exports = {
  randomNumber,
  logTodo,
  logDone,
  logAllDone
}