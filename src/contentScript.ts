'use strict';
import {parseContent} from "./core/parseContent";

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
