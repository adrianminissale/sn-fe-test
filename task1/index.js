const operators = ['+', '−', '∗', '/', 'sin', 'cos', 'tan']
const jsOperators = ['+', '−', '∗', '/', 'Math.sin', 'Math.cos', 'Math.tan']
const expressions = ['3+2+4', '+2', '−2', 'sin(sin(30) + cos(20))', 'sin(30) + cos(20)', 'sin(30', '3++', '3+']

const transform = (ex) => {
  const result = operators.map( (op, i) => {
    return ex.replaceAll(op, jsOperators[i])
  })
  try {
    return eval( result[operators.length - 1] ) && 'T'
  } catch {
    return 'F'
  }
}

expressions.map( ex => {
  const result = `${ex} : ${transform( ex )}`
  console.log( result )
  document.getElementById( 'root' ).innerHTML += result + '</br>'
})
