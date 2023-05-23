type ConversationType = "bot" | "user"
type ContentType = "root" | "p" | "ol" | "ul" | "li" | "text" | "code"

interface ContentPayload {
  contentType: ContentType
  value: string | null
  metadata?: Record<string, any>
  children: ContentPayload[]
}
interface Conversation {
  conversationType: ConversationType
  content: ContentPayload
}
