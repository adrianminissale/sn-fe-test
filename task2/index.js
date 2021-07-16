const operators = ['+', '−', '∗', '/', 'sin', 'cos', 'tan']
const jsOperators = ['+', '−', '∗', '/', 'Math.sin', 'Math.cos', 'Math.tan']

const transform = (ex) => {
  const result = operators.map( (op, i) => {
    return ex = ex.replaceAll(op, jsOperators[i])
  })
  try {
    return eval( result[operators.length - 1] )
  } catch {
    return 'Invalid Expression'
  }
}

const evaluate = () => {
  const expression = document.getElementById( 'input' ).value
  if (expression) {
    const result = transform( expression )
    console.log( result )
    document.getElementById( 'result' ).innerHTML = result
  }
}

const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', evaluate )
