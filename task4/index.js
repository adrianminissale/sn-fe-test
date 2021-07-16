const input = []

const result = (expression) => {
  try {
    input.length = 0
    const result = eval( expression )
    display.innerHTML = result
    input.push( result )
  } catch {
    return 'Invalid Expression'
  }
}

const getRand = () => {
  return fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
    .then( data => { return data.json() })
    .then( res => { return res })
}

const evaluate = async (event) => {
  const btn = event.target.innerHTML

  switch (btn) {
    case '=':
      result( input.join().replaceAll(',', '') )
      break;
    case 'AC':
      display.innerHTML = 0
      input.length = 0
      break;
    default:
      btn === 'RAND' ? num = await getRand() : num = btn
      display.innerHTML === '0' ? display.innerHTML = num : display.innerHTML += num
      input.push( num )
      break;
  }
}

const display = document.querySelector( '.display' )

document.querySelectorAll( '.btn' ).forEach( e => {
  e.addEventListener( 'click', evaluate )
})
