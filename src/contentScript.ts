'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("get request", request, sender)
    const data = document.querySelectorAll(".group.w-full")
    const items: Array<Conversation> = []
    for (const item of data) {
      if (item.classList.contains("bg-gray-50")) {
        const innerData = item.querySelectorAll("p, ol, ul")
        const values = Array.from(innerData).map<ContentPayload>((value) => {
          return {contentType:"p", value: item.textContent!}
          return {contentType:"ol", value: item.textContent!}
          return {contentType:"ul", value: item.textContent!}

        })

        items.push({conversationType: "bot", content: values})

      }else{
        items.push({conversationType: "user", content: [{contentType:"p", value: item.textContent!}]})
      }
    }
    console.log("this is request", request, sendResponse)
    sendResponse({payload: items});
  }
);
