;(function () {
  const WIDGET_URL = 'https://yumebot-flax.vercel.app/widget'
  const WIDGET_WIDTH = 380
  const WIDGET_HEIGHT = 580

  // Botão flutuante
  const button = document.createElement('button')
  button.setAttribute('aria-label', 'Abrir YumeBot')
  button.innerHTML = '✨'
  button.style.cssText = [
    'position:fixed',
    'bottom:84px',
    'right:24px',
    'width:56px',
    'height:56px',
    'border-radius:50%',
    'background:linear-gradient(135deg,#7c3aed,#4338ca)',
    'color:white',
    'font-size:22px',
    'border:none',
    'cursor:pointer',
    'box-shadow:0 4px 16px rgba(0,0,0,0.25)',
    'z-index:99999',
    'transition:transform 0.2s,box-shadow 0.2s',
    'display:flex',
    'align-items:center',
    'justify-content:center',
  ].join(';')

  // Iframe do widget
  const iframe = document.createElement('iframe')
  iframe.src = WIDGET_URL
  iframe.title = 'YumeBot'
  iframe.style.cssText = [
    'position:fixed',
    'bottom:156px',
    'right:24px',
    `width:${WIDGET_WIDTH}px`,
    `height:${WIDGET_HEIGHT}px`,
    'border:none',
    'border-radius:22px',
    'box-shadow:0 12px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,210,255,0.15)',
    'z-index:99998',
    'display:none',
    'opacity:0',
    'transition:opacity 0.25s, transform 0.25s',
    'transform:translateY(8px)',
  ].join(';')

  let open = false

  button.addEventListener('click', function () {
    open = !open
    if (open) {
      iframe.style.display = 'block'
      setTimeout(function () {
        iframe.style.opacity = '1'
        iframe.style.transform = 'translateY(0px)'
      }, 10)
      button.innerHTML = '✕'
      button.style.transform = 'rotate(90deg)'
    } else {
      iframe.style.opacity = '0'
      iframe.style.transform = 'translateY(8px)'
      setTimeout(function () { iframe.style.display = 'none' }, 250)
      button.innerHTML = '✨'
      button.style.transform = 'rotate(0deg)'
    }
  })

  document.body.appendChild(iframe)
  document.body.appendChild(button)
})()
