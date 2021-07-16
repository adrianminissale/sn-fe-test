const expressions = ['3+2+4', '+2', '−2', 'sin(sin(30) + cos(20))', 'sin(30) + cos(20)', 'sin(30', '3++', '3+']

const closeExpression = ex => {
  let open = 0
  let close = 0

  ex.split('').map(e => {
    e === '(' ? ++open : null
    e === ')' ? ++close : null
  })

  return open !== close
}

const validate = ex => {
  // Validate operator at end
  if ( ['+', '−', '∗', '/'].some(el => ex.split('').pop().includes(el)) )
    return 'F'
  // Validate operator open and close
  if ( ( ex.indexOf('sin(') === 0 || ex.indexOf('cos(') === 0 || ex.indexOf('tan(') === 0 ) && ex.split('').pop() !== ')' )
    return 'F'
  //
  if ( closeExpression( ex ) )
    return 'F'

  return 'T'
}

expressions.map( ex => {
  const result = `${ex} : ${validate( ex )}`
  document.getElementById( 'root' ).innerHTML += result + '</br>'
})
