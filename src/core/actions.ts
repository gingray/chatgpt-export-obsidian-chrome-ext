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
      buffer.push("```\n" + item.content.join("") + "\n```")
    }
    if (item.conversationType === "user") {
      buffer.push("\n" + item.content.join("") + "  \n")
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

