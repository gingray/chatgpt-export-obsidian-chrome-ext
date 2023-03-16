type ConversationType = "bot" | "user"
type ContentType = "p" | "ol" | "ul" | "li"
interface ContentPayload {
  contentType: ContentType
  value: string
}
interface Conversation {
  conversationType: ConversationType
  content: ContentPayload[]
}
