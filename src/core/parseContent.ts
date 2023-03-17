const OL_TAG = "ol"
const UL_TAG = "ul"
const LI_TAG = "li"
const P_TAG = "p"

export const parseContent = (data : NodeListOf<Element>): Array<Conversation> => {
  const items: Array<Conversation> = []
  for (const item of data) {
    if (item.classList.contains("bg-gray-50")) {
      const innerData = item.querySelectorAll(".markdown.prose > p, .markdown.prose > ol, .markdown.prose > ul")
      console.log("innerData", innerData)
      const values = Array.from(innerData).map<ContentPayload>((value) => {
        console.log("value tag name", value.tagName)
        if (compareStr(value.tagName, OL_TAG)){
          return {contentType:"ol", value: processList(value)}
        }
        if (compareStr(value.tagName, UL_TAG)){
          return {contentType:"ul", value: processList(value)}
        }
        return {contentType:"p", value: value.textContent!}

      })
      items.push({conversationType: "bot", content: {contentType: "root", value: values}})
    }else{
      items.push({conversationType: "user", content: {contentType: "root", value: {contentType:"p", value: item.textContent!}}})
    }
  }
  return items
}

const compareStr = (str1:string, str2:string) => str1.toLowerCase() === str2.toLowerCase()

const processList = (node: Node, contentPayload: ContentPayload|null = null) : ContentPayload[] => {
  const result: ContentPayload[] = []
  for (const item of node.childNodes) {
    if (compareStr(item.nodeName, LI_TAG)) {
      if (contentPayload == null) contentPayload = {contentType: "li", value: []}
      result.push(processLiTag(item, contentPayload))
    }
  }
  return result
}

const processLiTag = (node:ChildNode, contentPayload: ContentPayload):ContentPayload => {
  for( const item of node.childNodes) {
    if (item.nodeType === Node.TEXT_NODE) {
      if (contentPayload.value instanceof  Array) {
        contentPayload.value.push({contentType:"li", value: item.textContent!})
      }
      continue
    }
    if (compareStr(item.nodeName, OL_TAG) || compareStr(item.nodeName, UL_TAG)) {
      if (contentPayload.value instanceof Array) {
        const newValue = {
          contentType: 'ul',
          value: [] as ContentPayload[]
        } as ContentPayload
        contentPayload.value.push(newValue)
        for (const el of processList(item, newValue)) {
          contentPayload.value.push(el)
        }
      }
    }
  }
  return contentPayload
}


