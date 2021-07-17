const operators = ['+', '−', '∗', '/', 'sin', 'cos', 'tan']
const jsOperators = ['+', '−', '∗', '/', 'Math.sin', 'Math.cos', 'Math.tan']
const expressions = []

const closeExpression = ex => {
  let open = 0
  let close = 0

  ex.split('').map(e => {
    e === '(' ? ++open : null
    e === ')' ? ++close : null
  })

  return open !== close
}

const validate = () => {
  const ex = input.value

  error.style.display = 'none'
  btn.disabled = false

  // Validate operator at end
  if ( ['+', '−', '∗', '/'].some(el => ex.split('').pop().includes(el)) ) {
    error.style.display = 'block'
    btn.disabled = true
  }
  // Validate operator open and close
  if ( ( ex.indexOf('sin(') === 0 || ex.indexOf('cos(') === 0 || ex.indexOf('tan(') === 0 ) && ex.split('').pop() !== ')' ) {
    error.style.display = 'block'
    btn.disabled = true
  }
  //
  if ( closeExpression( ex ) ) {
    error.style.display = 'block'
    btn.disabled = true
  }
}

const show = () => {
  const expression = input.value

  if (expression) {
    const transformed = transform( expression )
    const result = calculate( transformed )
    expressions.push( `${expression}: ${result}` )
    const expsToHtml = expressions.slice(-5).reverse().join().replaceAll(',', '</br>')
    document.getElementById( 'expressions' ).innerHTML = expsToHtml
  }
}

const transform = ex => {
  ex = operators.map( (op, i) => {
    return ex = ex.replaceAll( op, jsOperators[i] )
  })
  return ex = ex.pop()
}

const calculate = expression => {

  if ( expression.lastIndexOf('(') > 0 ) {
    lastBr = expression.lastIndexOf('(') + 1
    lastBrClose = expression.slice( lastBr )
    lastBrClose = lastBr + lastBrClose.indexOf(')')

    currentExp = expression.slice( lastBr, lastBrClose )
    math = expression.slice( lastBr - 9, lastBr - 1 )
  } else {
    currentExp = expression
    math = null
  }

  if (currentExp.includes(' + ')) {
    currentExp = currentExp.split(' + ').reduce((res, val) => {
      return parseFloat(res) + parseFloat(val)
    })
  } else if (currentExp.includes(' - ')) {
    currentExp = currentExp.split(' - ').reduce((res, val) => {
      return parseFloat(res) - parseFloat(val)
    })
  } else if (currentExp.includes(' * ')) {
    currentExp = currentExp.split(' * ').reduce((res, val) => {
      return parseFloat(res) * parseFloat(val)
    })
  } else if (currentExp.includes(' / ')) {
    currentExp = currentExp.split(' / ').reduce((res, val) => {
      return parseFloat(res) / parseFloat(val)
    })
  }

  switch (math) {
    case 'Math.cos':
      result = Math.cos( currentExp )
      break;
    case 'Math.sin':
      result = Math.sin( currentExp )
      break;
    case 'Math.tan':
      result = Math.tan( currentExp )
      break;
    default:
      result = currentExp
      break;
  }

  if (expression.lastIndexOf('(') > 0) {
    expression = expression.slice(0, lastBr - 9) + result + expression.slice(lastBrClose + 1)
  } else {
    return expression = result.toString()
  }

  if (expression.includes('(') || expression.includes(' + ') || expression.includes(' - ') || expression.includes(' * ') || expression.includes(' / ')) {
    return calculate( expression )
  }

  return expression
}

const error = document.getElementById( 'error' )

const input = document.getElementById( 'input' )
input.addEventListener( 'keyup', validate )

const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', show )
