type ConversationType = "bot" | "user"
type ContentType = "root" | "p" | "ol" | "ul" | "li" | "text"

interface ContentPayload {
  contentType: ContentType
  value: string | null
  children: ContentPayload[]
}
interface Conversation {
  conversationType: ConversationType
  content: ContentPayload
}
