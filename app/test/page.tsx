'use client'

export default function TestPage() {
  return (
    <>
      {/* Página fake simulando o site de vocês */}
      <div style={{
        minHeight: '100vh',
        fontFamily: '"Segoe UI", -apple-system, sans-serif',
        background: '#0f1117',
        color: '#e2e8f0',
      }}>

        {/* Navbar */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 48px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(15,17,23,0.85)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#38bdf8' }}>Neko</span>
            <span style={{ color: '#94a3b8' }}>Labs</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#64748b' }}>
            {['Serviços', 'Portfólio', 'Sobre', 'Contato'].map(item => (
              <span key={item} style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
              >{item}</span>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center',
          padding: '100px 24px 80px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow orbs */}
          <div style={{
            position: 'absolute', top: '10%', left: '20%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '0%', right: '15%',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: '20px',
            background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)',
            color: '#38bdf8', fontSize: '12px', fontWeight: 600, marginBottom: '24px',
            letterSpacing: '0.6px', textTransform: 'uppercase',
          }}>
            Desenvolvimento Web & Mobile
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1.5px',
            maxWidth: '800px',
          }}>
            Transformamos ideias em{' '}
            <span style={{
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              produtos digitais
            </span>
          </h1>

          <p style={{
            fontSize: '17px', color: '#64748b', maxWidth: '520px',
            lineHeight: 1.7, marginBottom: '40px',
          }}>
            Somos uma equipe de desenvolvedores apaixonados por criar experiências
            digitais modernas, rápidas e escaláveis.
          </p>

          <div style={{ display: 'flex', gap: '14px' }}>
            <button style={{
              padding: '13px 28px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
              border: 'none', color: 'white', fontWeight: 600, fontSize: '14px',
              cursor: 'pointer', letterSpacing: '0.2px',
              boxShadow: '0 4px 24px rgba(56,189,248,0.25)',
            }}>
              Ver portfólio
            </button>
            <button style={{
              padding: '13px 28px', borderRadius: '10px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
            }}>
              Falar conosco
            </button>
          </div>
        </section>

        {/* Cards */}
        <section style={{ padding: '60px 48px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { icon: '⚡', title: 'Performance', desc: 'Aplicações ultra-rápidas com Next.js, React e tecnologias modernas.' },
              { icon: '🎨', title: 'Design', desc: 'Interfaces elegantes e responsivas focadas em experiência do usuário.' },
              { icon: '🔒', title: 'Segurança', desc: 'Código limpo e seguro seguindo as melhores práticas do mercado.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                padding: '28px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)'
                  e.currentTarget.style.background = 'rgba(56,189,248,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '40px', color: '#1e293b', fontSize: '12px' }}>
          — página de demonstração do embed do YumeBot —
        </div>
      </div>

      {/* Widget embed simulado */}
      <YumeBotWidget />
    </>
  )
}

function YumeBotWidget() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <div id="yumebot-embed-test"></div>
          <script>
            (function() {
              var WIDGET_URL = '/widget';
              var WIDGET_WIDTH = 380;
              var WIDGET_HEIGHT = 580;

              var button = document.createElement('button');
              button.innerHTML = '🌙';
              button.setAttribute('aria-label', 'Abrir YumeBot');
              button.style.cssText = [
                'position:fixed','bottom:24px','right:24px',
                'width:56px','height:56px','border-radius:50%',
                'background:linear-gradient(135deg,#0ea5e9,#6366f1)',
                'color:white','font-size:22px','border:none','cursor:pointer',
                'box-shadow:0 4px 20px rgba(14,165,233,0.45)',
                'z-index:99999','transition:transform 0.25s,box-shadow 0.2s',
                'display:flex','align-items:center','justify-content:center'
              ].join(';');

              var iframe = document.createElement('iframe');
              iframe.src = WIDGET_URL;
              iframe.title = 'YumeBot';
              iframe.style.cssText = [
                'position:fixed','bottom:96px','right:24px',
                'width:' + WIDGET_WIDTH + 'px',
                'height:' + WIDGET_HEIGHT + 'px',
                'border:none','border-radius:22px',
                'box-shadow:0 12px 50px rgba(0,0,0,0.4),0 0 0 1px rgba(0,210,255,0.15)',
                'z-index:99998','display:none','opacity:0',
                'transition:opacity 0.25s,transform 0.25s',
                'transform:translateY(8px)'
              ].join(';');

              var open = false;
              button.addEventListener('click', function() {
                open = !open;
                if (open) {
                  iframe.style.display = 'block';
                  setTimeout(function() {
                    iframe.style.opacity = '1';
                    iframe.style.transform = 'translateY(0px)';
                  }, 10);
                  button.innerHTML = '✕';
                  button.style.transform = 'rotate(90deg)';
                } else {
                  iframe.style.opacity = '0';
                  iframe.style.transform = 'translateY(8px)';
                  setTimeout(function() { iframe.style.display = 'none'; }, 250);
                  button.innerHTML = '✨';
                  button.style.transform = 'rotate(0deg)';
                }
              });

              document.body.appendChild(iframe);
              document.body.appendChild(button);
            })();
          </script>
        `,
      }}
    />
  )
}
