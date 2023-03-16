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
      buffer.push("```\n" + buildMd(item.content).trim() + "\n```\n")
    }
    if (item.conversationType === "user") {
      buffer.push(buildMd(item.content).trim() + "  \n")
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

const buildMd = (node: ContentPayload,bot?: boolean) => {
  return `${processNode(node)}`
}

const processNode = (node: ContentPayload, bot?: boolean): string => {
  if (node.value instanceof Array) {
    return processArray(node.value)
  }

  if (typeof node.value === "string") {
    let line = `${node.value}  \n`
    if (node.contentType === "li") line = `* ${line}`
    if (node.contentType === "p") line = `${line}  \n`

    return line
  }

  return processNode(node.value as ContentPayload)
}

const processArray = (nodes: ContentPayload[]):string => {
  const buff = []
  for (const node  of nodes) {
    buff.push(processNode(node))
  }
  buff.push("  \n")
  return buff.join("")
}



