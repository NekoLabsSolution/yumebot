'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect } from 'react'

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  })

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl select-none">
          🌙
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">YumeBot</p>
          <p className="text-xs text-white/70">ゆめ · Assistente Virtual</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-white/80">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {error && (
          <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
            Erro: {error.message}
          </div>
        )}

        {messages.length === 0 && !error && (
          <div className="text-center text-gray-400 text-sm mt-10 space-y-2">
            <p className="text-4xl">🌙</p>
            <p className="font-medium text-gray-500">Olá! Sou o YumeBot.</p>
            <p>Como posso te ajudar hoje?</p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
              <span className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-3 bg-white border-t border-gray-100"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-violet-400 transition-colors"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
          aria-label="Enviar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  )
}
