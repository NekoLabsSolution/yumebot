'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect } from 'react'

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  })

  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(160deg, #050d1e 0%, #071c3a 40%, #061818 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Aurora orb top-left */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-60px',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(0,210,255,0.2) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Aurora orb bottom-right */}
      <div style={{
        position: 'absolute', bottom: '-60px', right: '-40px',
        width: '240px', height: '240px',
        background: 'radial-gradient(circle, rgba(0,255,180,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Aurora orb mid */}
      <div style={{
        position: 'absolute', top: '40%', right: '-30px',
        width: '160px', height: '160px',
        background: 'radial-gradient(circle, rgba(80,140,255,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Glass panel */}
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        margin: '10px', borderRadius: '22px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(0,210,255,0.18)',
        boxShadow: '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 80px rgba(0,160,255,0.05)',
        zIndex: 1,
      }}>

        {/* Header */}
        <div style={{
          position: 'relative', padding: '13px 15px', flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(0,190,230,0.38) 0%, rgba(0,110,210,0.32) 55%, rgba(10,50,160,0.38) 100%)',
          borderBottom: '1px solid rgba(0,210,255,0.2)',
          display: 'flex', alignItems: 'center', gap: '11px', overflow: 'hidden',
        }}>
          {/* Gloss shine */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '52%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Glow line bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,220,255,0.5), transparent)',
            pointerEvents: 'none',
          }} />

          {/* Avatar */}
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(0,220,255,0.25), rgba(0,100,200,0.2))',
            border: '1px solid rgba(0,220,255,0.45)',
            boxShadow: '0 0 14px rgba(0,200,255,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '19px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '48%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              borderRadius: '50% 50% 0 0', pointerEvents: 'none',
            }} />
            ✨
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.95)',
              textShadow: '0 0 12px rgba(0,210,255,0.6)', letterSpacing: '0.4px',
            }}>YumeBot</div>
            <div style={{ fontSize: '11px', color: 'rgba(130,210,255,0.7)', marginTop: '1px' }}>
              ゆめ · Assistente Virtual
            </div>
          </div>

          {/* Online badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0,
            background: 'rgba(0,255,140,0.08)', border: '1px solid rgba(0,255,140,0.2)',
            borderRadius: '20px', padding: '3px 9px',
          }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#00ff99', boxShadow: '0 0 8px rgba(0,255,140,0.9)',
              animation: 'yume-pulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '10px', color: 'rgba(120,255,190,0.85)', fontWeight: 500 }}>online</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="yume-scroll" style={{
          flex: 1, overflowY: 'auto', padding: '14px 12px',
          display: 'flex', flexDirection: 'column', gap: '9px',
        }}>
          {error && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(255,60,60,0.12)', border: '1px solid rgba(255,80,80,0.25)',
              borderRadius: '14px', color: 'rgba(255,160,160,0.9)', fontSize: '12px',
            }}>
              Erro: {error.message}
            </div>
          )}

          {messages.length === 0 && !error && (
            <div style={{
              textAlign: 'center', marginTop: '36px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,200,255,0.18), rgba(0,120,200,0.12))',
                border: '1px solid rgba(0,220,255,0.3)',
                boxShadow: '0 0 24px rgba(0,180,255,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '30px', position: 'relative', overflow: 'hidden',
                animation: 'yume-float 3s ease-in-out infinite',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '48%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
                  borderRadius: '50%', pointerEvents: 'none',
                }} />
                ✨
              </div>
              <div style={{ color: 'rgba(180,230,255,0.85)', fontWeight: 600, fontSize: '14px' }}>
                Olá! Sou o YumeBot.
              </div>
              <div style={{ color: 'rgba(100,170,210,0.6)', fontSize: '12px' }}>
                Como posso te ajudar hoje?
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '82%', padding: '9px 13px',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: '13px', lineHeight: '1.55',
                position: 'relative', overflow: 'hidden', wordBreak: 'break-word',
                ...(m.role === 'user' ? {
                  background: 'linear-gradient(135deg, rgba(0,185,230,0.55), rgba(0,90,200,0.5))',
                  border: '1px solid rgba(0,220,255,0.3)',
                  boxShadow: '0 4px 20px rgba(0,140,255,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.96)',
                } : {
                  background: 'rgba(255,255,255,0.065)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
                  color: 'rgba(200,235,255,0.9)',
                  backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                }),
              }}>
                {m.role === 'user' && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />
                )}
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '11px 15px',
                background: 'rgba(255,255,255,0.065)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '18px 18px 18px 4px', boxShadow: '0 4px 18px rgba(0,0,0,0.2)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 160, 320].map((delay) => (
                  <div key={delay} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: 'rgba(0,200,255,0.75)', boxShadow: '0 0 6px rgba(0,200,255,0.6)',
                    animation: `yume-bounce 1.3s ${delay}ms ease-in-out infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Input area */}
        <div style={{
          padding: '11px 12px', flexShrink: 0,
          background: 'rgba(0,0,0,0.18)', borderTop: '1px solid rgba(0,180,255,0.1)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
              autoComplete="off"
              className="yume-input"
              style={{
                flex: 1, padding: '9px 15px', borderRadius: '20px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(0,200,255,0.2)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.25)',
                color: 'rgba(215,242,255,0.92)', fontSize: '13px',
                outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(0,220,255,0.5)'
                e.target.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.2), 0 0 14px rgba(0,200,255,0.14)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(0,200,255,0.2)'
                e.target.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.25)'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(145deg, rgba(0,210,245,0.6), rgba(0,90,210,0.6))',
                border: '1px solid rgba(0,220,255,0.45)',
                boxShadow: '0 4px 16px rgba(0,140,255,0.25), inset 0 1px 0 rgba(255,255,255,0.22)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (isLoading || !input.trim()) ? 0.35 : 1,
                transition: 'opacity 0.2s, transform 0.15s, box-shadow 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!(isLoading || !input.trim()))
                  e.currentTarget.style.boxShadow = '0 4px 22px rgba(0,180,255,0.45), inset 0 1px 0 rgba(255,255,255,0.22)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,140,255,0.25), inset 0 1px 0 rgba(255,255,255,0.22)'
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.9)' }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
                borderRadius: '50% 50% 0 0', pointerEvents: 'none',
              }} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px', position: 'relative' }}>
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes yume-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.75); }
        }
        @keyframes yume-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-7px); opacity: 1; }
        }
        @keyframes yume-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .yume-scroll::-webkit-scrollbar { width: 3px; }
        .yume-scroll::-webkit-scrollbar-track { background: transparent; }
        .yume-scroll::-webkit-scrollbar-thumb { background: rgba(0,180,255,0.22); border-radius: 4px; }
        .yume-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,200,255,0.38); }
        .yume-input::placeholder { color: rgba(100,170,210,0.5) !important; }
      `}</style>
    </div>
  )
}
