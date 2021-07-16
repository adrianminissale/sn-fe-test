const input = []

const resolve = ex => {
  if (ex.includes('+') && ex.split('').pop() !== '+') {
    return ex.split('+').reduce((res, val) => parseFloat(res) + parseFloat(val))
  } else if (ex.includes('-') && ex.split('').pop() !== '-') {
    return ex.split('-').reduce((res, val) => parseFloat(res) - parseFloat(val))
  } else if (ex.includes('*') && ex.split('').pop() !== '*') {
    return ex.split('*').reduce((res, val) => parseFloat(res) * parseFloat(val))
  } else if (ex.includes('/') && ex.split('').pop() !== '/') {
    return ex.split('/').reduce((res, val) => parseFloat(res) / parseFloat(val))
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
      const result = resolve( input.join().replaceAll(',', '') )
      input.length = 0
      display.innerHTML = result
      input.push( result )
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
