"use server"

import { cache } from "react"

type TranslateResponse = {
  data?: {
    translations?: { translatedText: string }[]
  }
}

const translateSingle = cache(async (text: string, target: string) => {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY
  if (!apiKey) {
    return text
  }

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        target,
        format: "text",
      }),
      cache: "no-store",
    }
  )

  const data = (await response.json()) as TranslateResponse
  const translated = data?.data?.translations?.[0]?.translatedText
  return translated || text
})

export async function translateMany(texts: string[], target: string) {
  const translated = await Promise.all(
    texts.map((text) => translateSingle(text, target))
  )

  return translated
}
