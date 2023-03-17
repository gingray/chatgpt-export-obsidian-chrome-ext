const OL_TAG = "ol"
const UL_TAG = "ul"
const LI_TAG = "li"
const P_TAG = "p"

export const parseContent = (data : NodeListOf<Element>): Array<Conversation> => {
  const items: Array<Conversation> = []
  for (const item of data) {
    if (item.classList.contains("bg-gray-50")) {
      const innerData = item.querySelectorAll(".markdown.prose > p, .markdown.prose > ol, .markdown.prose > ul")
      // debugger
      const values = Array.from(innerData).map<ContentPayload>((value:Element) => {
        return processNode(value)
      })
      items.push({conversationType: "bot", content: {contentType: "root", value: null, children: values}})
    }else{
      items.push({conversationType: "user", content: {contentType: "root", value: null, children:[{contentType:"text", value: item.textContent!, children:[]}]}})
    }
  }
  return items
}

const compareStr = (str1:string, str2:string) => str1.toLowerCase() === str2.toLowerCase()

const processNode = (node: Element):ContentPayload => {
  if (compareStr(node.tagName, OL_TAG)){
    return {contentType:"ol", value: null, children: processList(node)}
  }
  if (compareStr(node.tagName, UL_TAG)){
    return {contentType:"ul", value:null, children: processList(node)}
  }
  return {contentType:"text", value: node.textContent!, children: []}

}

const processList = (node: Node) : ContentPayload[] => {
  const result: ContentPayload[] = []
  for (const item of node.childNodes) {
    if (compareStr(item.nodeName, LI_TAG)) {
      result.push(processLiTag(item))
    }
  }
  return result
}

const processLiTag = (node:ChildNode):ContentPayload => {
  const result = {contentType: "li" as const, value: null, children: [] as ContentPayload[]}
  for( const item of node.childNodes) {
    if (item.nodeType === Node.TEXT_NODE) {
      result.children.push({contentType:"text", value: item.textContent!, children: []})
      continue
    }
    if (compareStr(item.nodeName, OL_TAG) || compareStr(item.nodeName, UL_TAG)) {
        for (const el of processList(item)) {
          result.children.push(el)
        }
    }
  }
  return result
}


