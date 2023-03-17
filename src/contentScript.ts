'use strict'
import {parseContent} from "./core/parseContent";
import {ChromeMessage} from "./core/chromeMessage";
import {PingMessage, ExportMessage, AliveMessage} from "./core/actions";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const msg = request as ChromeMessage
    console.log("content script requirest", request)
    if (msg.message == ExportMessage) {
      const data = document.querySelectorAll(".group.w-full")
      const items: Array<Conversation> = parseContent(data)
      sendResponse({payload: items});
    }

    if (msg.message == PingMessage) {
      const msg = {message: AliveMessage}
      sendResponse(msg);
    }
  }
);

