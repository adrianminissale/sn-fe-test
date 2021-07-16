const operators = ['+', '−', '∗', '/', 'sin', 'cos', 'tan']
const jsOperators = ['+', '−', '∗', '/', 'Math.sin', 'Math.cos', 'Math.tan']
const expressions = []

const show = () => {
  const expression = input.value
  const result = transform( expression )
  expressions.push( result )
  const expsToHtml = expressions.slice(-5).reverse().join().replaceAll(',', '</br>')
  document.getElementById( 'expressions' ).innerHTML = expsToHtml
}

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
  const expression = input.value
  const result = transform( expression )

  if (result !== 'Invalid Expression') {
    error.style.display = 'none'
    btn.disabled = false
  } else {
    error.style.display = 'block'
    btn.disabled = true
  }
}

const error = document.getElementById( 'error' )

const input = document.getElementById( 'input' )
input.addEventListener( 'keyup', evaluate )

const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', show )
