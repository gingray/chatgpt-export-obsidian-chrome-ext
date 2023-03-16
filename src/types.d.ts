type ConversationType = "bot" | "user"
type ContentType = "root" | "p" | "ol" | "ul" | "li"

interface ContentPayload {
  contentType: ContentType
  value: string | ContentPayload | ContentPayload[]
}
interface Conversation {
  conversationType: ConversationType
  content: ContentPayload
}
