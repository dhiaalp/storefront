export const getBaseURL = () => {
  const raw = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
  if (!raw.startsWith("http://") && !raw.startsWith("https://")) {
    return `https://${raw}`
  }
  return raw
}
