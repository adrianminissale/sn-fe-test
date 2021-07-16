const operators = ['+', '−', '∗', '/', 'sin', 'cos', 'tan']
const jsOperators = ['+', '−', '∗', '/', 'Math.sin', 'Math.cos', 'Math.tan']

const transform = ex => {
  ex = operators.map( (op, i) => {
    return ex = ex.replaceAll( ' ', '' ).replaceAll( op, jsOperators[i] )
  })
  return ex = ex.pop()
}

const findMath = ex => {
  if (ex.toString().includes('Math.')) {
    const open = ex.indexOf('(') + 1
    const close = ex.indexOf(')')
    const number = ex.substring(open, close)

    if (ex.includes('sin'))
      return Math.sin(number)
    if (ex.includes('cos'))
      return Math.cos(number)
    if (ex.includes('tan'))
      return Math.tan(number)
  }
  return parseFloat(ex)
}

const resolve = ex => {
  if (ex.includes('+') && ex.split('').pop() !== '+') {
    return ex.split('+').reduce((res, val) => {
      return findMath(res) + findMath(val)
    })
  } else if (ex.includes('-') && ex.split('').pop() !== '-') {
    return ex.split('-').reduce((res, val) => {
      return findMath(res) - findMath(val)
    })
  } else if (ex.includes('*') && ex.split('').pop() !== '*') {
    return ex.split('*').reduce((res, val) => {
      return findMath(res) * findMath(val)
    })
  } else if (ex.includes('/') && ex.split('').pop() !== '/') {
    return ex.split('/').reduce((res, val) => {
      return findMath(res) / findMath(val)
    })
  }
}

const evaluate = () => {
  const expression = document.getElementById( 'input' ).value

  if (expression) {
    const transformed = transform( expression )
    const result = resolve( transformed )
    document.getElementById( 'result' ).innerHTML = result
  }
}

const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', evaluate )
