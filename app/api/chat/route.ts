import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { systemPrompt } from '@/lib/context'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages ?? []

    const result = streamText({
      model: google('gemini-flash-latest'),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (err) {
    console.error('[chat route error]', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
