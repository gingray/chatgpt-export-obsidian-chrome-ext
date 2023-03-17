'use strict';
import {parseContent} from "./core/parseContent";

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
    const items: Array<Conversation> = parseContent(data)
    console.log("this is items", items)
    console.log("this is request", request, sendResponse)
    sendResponse({payload: items});
  }
);
