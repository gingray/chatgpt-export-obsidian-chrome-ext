'use strict';
const processList = ({node}:{node: Element}) : ContentPayload[] => {
  const result: ContentPayload[] = []
  for (const item of node.querySelectorAll("li")) {
    result.push({contentType:"li", value: item.textContent!})
  }
  return result
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("get request", request, sender)
    const data = document.querySelectorAll(".group.w-full")
    const items: Array<Conversation> = []
    for (const item of data) {
      if (item.classList.contains("bg-gray-50")) {
        const innerData = item.querySelectorAll(".markdown.prose > p, .markdown.prose > ol, .markdown.prose > ul")
        console.log("innerData", innerData)
        const values = Array.from(innerData).map<ContentPayload>((value) => {
          console.log("value tag name", value.tagName)
          if (value.tagName === "OL"){
            return {contentType:"ol", value: processList({node: value})}
          }
          if (value.tagName === "UL"){
            return {contentType:"ul", value: processList({node: value})}
          }
          return {contentType:"p", value: value.textContent!}

        })
        items.push({conversationType: "bot", content: {contentType: "root", value: values}})
      }else{
        items.push({conversationType: "user", content: {contentType: "root", value: {contentType:"p", value: item.textContent!}}})
      }
    }
    console.log("this is items", items)
    console.log("this is request", request, sendResponse)
    sendResponse({payload: items});
  }
);
