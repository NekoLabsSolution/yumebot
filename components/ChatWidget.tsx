'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect, useState } from 'react'

const dark = {
  bg: 'linear-gradient(160deg, #050d1e 0%, #071c3a 40%, #061818 100%)',
  orb1: 'radial-gradient(circle, rgba(0,210,255,0.2) 0%, transparent 70%)',
  orb2: 'radial-gradient(circle, rgba(0,255,180,0.15) 0%, transparent 70%)',
  orb3: 'radial-gradient(circle, rgba(80,140,255,0.12) 0%, transparent 70%)',
  glassBg: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(0,210,255,0.18)',
  glassShadow: '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 80px rgba(0,160,255,0.05)',
  headerBg: 'linear-gradient(135deg, rgba(0,190,230,0.38) 0%, rgba(0,110,210,0.32) 55%, rgba(10,50,160,0.38) 100%)',
  headerBorderColor: 'rgba(0,210,255,0.2)',
  headerGloss: 'linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 100%)',
  headerGlowLine: 'linear-gradient(90deg, transparent, rgba(0,220,255,0.5), transparent)',
  avatarBg: 'linear-gradient(135deg, rgba(0,220,255,0.25), rgba(0,100,200,0.2))',
  avatarBorder: 'rgba(0,220,255,0.45)',
  avatarShadow: '0 0 14px rgba(0,200,255,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
  titleColor: 'rgba(255,255,255,0.95)',
  titleGlow: '0 0 12px rgba(0,210,255,0.6)',
  subtitleColor: 'rgba(130,210,255,0.7)',
  emptyAvatarBg: 'linear-gradient(135deg, rgba(0,200,255,0.18), rgba(0,120,200,0.12))',
  emptyAvatarBorder: 'rgba(0,220,255,0.3)',
  emptyAvatarShadow: '0 0 24px rgba(0,180,255,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
  emptyTitleColor: 'rgba(180,230,255,0.85)',
  emptySubColor: 'rgba(100,170,210,0.6)',
  userMsgBg: 'linear-gradient(135deg, rgba(0,185,230,0.55), rgba(0,90,200,0.5))',
  userMsgBorder: 'rgba(0,220,255,0.3)',
  userMsgShadow: '0 4px 20px rgba(0,140,255,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
  userMsgColor: 'rgba(255,255,255,0.96)',
  botMsgBg: 'rgba(255,255,255,0.065)',
  botMsgBorder: 'rgba(255,255,255,0.1)',
  botMsgShadow: '0 4px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
  botMsgColor: 'rgba(200,235,255,0.9)',
  loadingBg: 'rgba(255,255,255,0.065)',
  loadingBorder: 'rgba(255,255,255,0.1)',
  loadingDotBg: 'rgba(0,200,255,0.75)',
  loadingDotShadow: '0 0 6px rgba(0,200,255,0.6)',
  inputAreaBg: 'rgba(0,0,0,0.18)',
  inputAreaBorderColor: 'rgba(0,180,255,0.1)',
  inputBg: 'rgba(255,255,255,0.07)',
  inputBorderColor: 'rgba(0,200,255,0.2)',
  inputBorderFocus: 'rgba(0,220,255,0.5)',
  inputShadow: 'inset 0 2px 8px rgba(0,0,0,0.25)',
  inputShadowFocus: 'inset 0 2px 8px rgba(0,0,0,0.2), 0 0 14px rgba(0,200,255,0.14)',
  inputColor: 'rgba(215,242,255,0.92)',
  inputPlaceholder: 'rgba(100,170,210,0.5)',
  sendBtnBg: 'linear-gradient(145deg, rgba(0,210,245,0.6), rgba(0,90,210,0.6))',
  sendBtnBorderColor: 'rgba(0,220,255,0.45)',
  sendBtnShadow: '0 4px 16px rgba(0,140,255,0.25), inset 0 1px 0 rgba(255,255,255,0.22)',
  sendBtnShadowHover: '0 4px 22px rgba(0,180,255,0.45), inset 0 1px 0 rgba(255,255,255,0.22)',
  errorBg: 'rgba(255,60,60,0.12)',
  errorBorderColor: 'rgba(255,80,80,0.25)',
  errorColor: 'rgba(255,160,160,0.9)',
  codeInlineBg: 'rgba(0,200,255,0.12)',
  scrollThumb: 'rgba(0,180,255,0.22)',
  scrollThumbHover: 'rgba(0,200,255,0.38)',
}

const light = {
  bg: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fe 40%, #f0faf8 100%)',
  orb1: 'radial-gradient(circle, rgba(0,150,220,0.1) 0%, transparent 70%)',
  orb2: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)',
  orb3: 'radial-gradient(circle, rgba(60,110,220,0.06) 0%, transparent 70%)',
  glassBg: 'rgba(255,255,255,0.75)',
  glassBorder: 'rgba(0,150,200,0.2)',
  glassShadow: '0 8px 48px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
  headerBg: 'linear-gradient(135deg, rgba(0,140,200,0.25) 0%, rgba(0,80,180,0.18) 55%, rgba(10,30,130,0.22) 100%)',
  headerBorderColor: 'rgba(0,150,200,0.2)',
  headerGloss: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)',
  headerGlowLine: 'linear-gradient(90deg, transparent, rgba(0,160,220,0.35), transparent)',
  avatarBg: 'linear-gradient(135deg, rgba(0,180,230,0.2), rgba(0,80,180,0.15))',
  avatarBorder: 'rgba(0,180,220,0.5)',
  avatarShadow: '0 0 14px rgba(0,160,220,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
  titleColor: 'rgba(10,30,80,0.95)',
  titleGlow: '0 0 12px rgba(0,150,220,0.2)',
  subtitleColor: 'rgba(0,80,160,0.65)',
  emptyAvatarBg: 'linear-gradient(135deg, rgba(0,160,220,0.15), rgba(0,90,180,0.1))',
  emptyAvatarBorder: 'rgba(0,180,220,0.3)',
  emptyAvatarShadow: '0 0 24px rgba(0,140,200,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
  emptyTitleColor: 'rgba(10,50,110,0.85)',
  emptySubColor: 'rgba(40,90,140,0.6)',
  userMsgBg: 'linear-gradient(135deg, rgba(0,130,210,0.75), rgba(0,60,190,0.7))',
  userMsgBorder: 'rgba(0,150,220,0.35)',
  userMsgShadow: '0 4px 20px rgba(0,100,200,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
  userMsgColor: 'rgba(255,255,255,0.97)',
  botMsgBg: 'rgba(255,255,255,0.85)',
  botMsgBorder: 'rgba(0,150,200,0.15)',
  botMsgShadow: '0 2px 12px rgba(0,0,0,0.07)',
  botMsgColor: 'rgba(20,50,90,0.9)',
  loadingBg: 'rgba(255,255,255,0.85)',
  loadingBorder: 'rgba(0,150,200,0.15)',
  loadingDotBg: 'rgba(0,140,220,0.7)',
  loadingDotShadow: '0 0 6px rgba(0,140,220,0.4)',
  inputAreaBg: 'rgba(235,243,255,0.9)',
  inputAreaBorderColor: 'rgba(0,150,200,0.15)',
  inputBg: 'rgba(255,255,255,0.9)',
  inputBorderColor: 'rgba(0,150,200,0.3)',
  inputBorderFocus: 'rgba(0,180,240,0.6)',
  inputShadow: 'inset 0 1px 4px rgba(0,0,0,0.06)',
  inputShadowFocus: 'inset 0 1px 4px rgba(0,0,0,0.04), 0 0 12px rgba(0,150,220,0.12)',
  inputColor: 'rgba(20,50,90,0.92)',
  inputPlaceholder: 'rgba(80,120,170,0.5)',
  sendBtnBg: 'linear-gradient(145deg, rgba(0,160,225,0.9), rgba(0,70,210,0.9))',
  sendBtnBorderColor: 'rgba(0,160,220,0.5)',
  sendBtnShadow: '0 4px 16px rgba(0,120,210,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
  sendBtnShadowHover: '0 4px 22px rgba(0,150,220,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
  errorBg: 'rgba(255,60,60,0.08)',
  errorBorderColor: 'rgba(255,80,80,0.2)',
  errorColor: 'rgba(180,30,30,0.9)',
  codeInlineBg: 'rgba(0,140,200,0.1)',
  scrollThumb: 'rgba(0,140,200,0.22)',
  scrollThumbHover: 'rgba(0,160,220,0.38)',
}

function renderMarkdown(text: string, codeInlineBg: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={j}>{part.slice(2, -2)}</strong>
      if (part.startsWith('*') && part.endsWith('*'))
        return <em key={j}>{part.slice(1, -1)}</em>
      if (part.startsWith('`') && part.endsWith('`'))
        return <code key={j} style={{ background: codeInlineBg, borderRadius: '4px', padding: '1px 5px', fontSize: '12px', fontFamily: 'monospace' }}>{part.slice(1, -1)}</code>
      return part
    })
    return <span key={i}>{rendered}{i < lines.length - 1 && <br />}</span>
  })
}

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  })

  const [isDark, setIsDark] = useState(true)
  const p = isDark ? dark : light

  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'yume-theme') {
        setIsDark(e.data.theme !== 'light')
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: p.bg,
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
        background: p.orb1,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Aurora orb bottom-right */}
      <div style={{
        position: 'absolute', bottom: '-60px', right: '-40px',
        width: '240px', height: '240px',
        background: p.orb2,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Aurora orb mid */}
      <div style={{
        position: 'absolute', top: '40%', right: '-30px',
        width: '160px', height: '160px',
        background: p.orb3,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Glass panel */}
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        margin: '10px', borderRadius: '22px', overflow: 'hidden',
        background: p.glassBg,
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${p.glassBorder}`,
        boxShadow: p.glassShadow,
        zIndex: 1,
      }}>

        {/* Header */}
        <div style={{
          position: 'relative', padding: '13px 15px', flexShrink: 0,
          background: p.headerBg,
          borderBottom: `1px solid ${p.headerBorderColor}`,
          display: 'flex', alignItems: 'center', gap: '11px', overflow: 'hidden',
        }}>
          {/* Gloss shine */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '52%',
            background: p.headerGloss,
            pointerEvents: 'none',
          }} />
          {/* Glow line bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
            background: p.headerGlowLine,
            pointerEvents: 'none',
          }} />

          {/* Avatar */}
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
            background: p.avatarBg,
            border: `1px solid ${p.avatarBorder}`,
            boxShadow: p.avatarShadow,
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
              fontWeight: 700, fontSize: '14px', color: p.titleColor,
              textShadow: p.titleGlow, letterSpacing: '0.4px',
            }}>YumeBot</div>
            <div style={{ fontSize: '11px', color: p.subtitleColor, marginTop: '1px' }}>
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
              background: p.errorBg, border: `1px solid ${p.errorBorderColor}`,
              borderRadius: '14px', color: p.errorColor, fontSize: '12px',
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
                background: p.emptyAvatarBg,
                border: `1px solid ${p.emptyAvatarBorder}`,
                boxShadow: p.emptyAvatarShadow,
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
              <div style={{ color: p.emptyTitleColor, fontWeight: 600, fontSize: '14px' }}>
                Olá! Sou o YumeBot.
              </div>
              <div style={{ color: p.emptySubColor, fontSize: '12px' }}>
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
                  background: p.userMsgBg,
                  border: `1px solid ${p.userMsgBorder}`,
                  boxShadow: p.userMsgShadow,
                  color: p.userMsgColor,
                } : {
                  background: p.botMsgBg,
                  border: `1px solid ${p.botMsgBorder}`,
                  boxShadow: p.botMsgShadow,
                  color: p.botMsgColor,
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
                {m.role === 'assistant' ? renderMarkdown(m.content, p.codeInlineBg) : m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '11px 15px',
                background: p.loadingBg, border: `1px solid ${p.loadingBorder}`,
                borderRadius: '18px 18px 18px 4px', boxShadow: '0 4px 18px rgba(0,0,0,0.2)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 160, 320].map((delay) => (
                  <div key={delay} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: p.loadingDotBg, boxShadow: p.loadingDotShadow,
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
          background: p.inputAreaBg, borderTop: `1px solid ${p.inputAreaBorderColor}`,
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
                background: p.inputBg, border: `1px solid ${p.inputBorderColor}`,
                boxShadow: p.inputShadow,
                color: p.inputColor, fontSize: '13px',
                outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = p.inputBorderFocus
                e.target.style.boxShadow = p.inputShadowFocus
              }}
              onBlur={e => {
                e.target.style.borderColor = p.inputBorderColor
                e.target.style.boxShadow = p.inputShadow
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: p.sendBtnBg,
                border: `1px solid ${p.sendBtnBorderColor}`,
                boxShadow: p.sendBtnShadow,
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (isLoading || !input.trim()) ? 0.35 : 1,
                transition: 'opacity 0.2s, transform 0.15s, box-shadow 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!(isLoading || !input.trim()))
                  e.currentTarget.style.boxShadow = p.sendBtnShadowHover
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = p.sendBtnShadow
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
        .yume-scroll::-webkit-scrollbar-thumb { background: ${p.scrollThumb}; border-radius: 4px; }
        .yume-scroll::-webkit-scrollbar-thumb:hover { background: ${p.scrollThumbHover}; }
        .yume-input::placeholder { color: ${p.inputPlaceholder} !important; }
      `}</style>
    </div>
  )
}
