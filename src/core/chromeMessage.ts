import {buildMd} from "./markdownTransform";
import {ExportMessage} from "./actions";

export interface ChromeMessage {
  message: string
}

export const sendChromeMessage = async ({addLog}:{addLog:any}) => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});

  if (tab == null || tab.id == null) return
  const message :ChromeMessage = {message: ExportMessage}

  const response = await chrome.tabs.sendMessage(tab.id, message);
  console.log("this is response", response)
  //@ts-ignore
  const items = response.payload as Array<Conversation>
  const buffer = []
  for (const item of items) {
    if (item.conversationType === "bot") {
      buffer.push(buildMd(item.content, { dialogType: "bot", parentElement: ["root"], level: 0 }))
    }
    if (item.conversationType === "user") {
      buffer.push(buildMd(item.content, { dialogType: "user", level: 0, parentElement: ["root"] }))
    }
  }
  // do something with response here, not outside the function
  try {
    await navigator.clipboard.writeText(buffer.join(""));
    addLog("The content has been copied to the Clipboard.")
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}


