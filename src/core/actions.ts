import {buildMd} from "./markdownTransform";

export const sendChromeMessage = async ({addLog}:{addLog:any}) => {
  console.log("execute send message")
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  console.log("check tab", tab)

  if (tab == null || tab.id == null) return


  // debugger
  const response = await chrome.tabs.sendMessage(tab.id, {action: "copy-chat"});
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
    addLog("Content copy to Clipboard")
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}


