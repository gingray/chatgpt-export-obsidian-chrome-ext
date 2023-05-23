type DialogType = "bot" | "user"

type TransformContext = {
  dialogType: DialogType
  parentElement: ContentType[]
  level: number
}

const OBS_CALLOUT_TOKEN = "> "
const MD_LIST_TOKEN = "* "
const MD_NEW_LINE = "  \n"

export const buildMd = (node: ContentPayload, ctx: TransformContext) => {
  const buffer = [""]
  if (ctx.dialogType == "bot") buffer.push("> [!example]- Answer \n")
  buffer.push(processNode(node, ctx).trim(),"  \n\n")
  return buffer.join("")
}

const processNode = (node: ContentPayload, ctx: TransformContext): string => {
  if (node.contentType === "text") {
    let line = `${node.value}`
    line = line.replace(/[\r\n ]+/g, " ");
    if (ctx.parentElement[0] === "li") {
      let nestedSpace = ""
      if (ctx.level > 1) nestedSpace = " ".repeat(ctx.level)
      line = `${nestedSpace}${MD_LIST_TOKEN}${line}`
    }
    if (ctx.dialogType === "bot") line = `${OBS_CALLOUT_TOKEN}${line}`
    return line.trim() + MD_NEW_LINE
  }
  const buffer = []
  if (node.contentType == "li") ctx.level +=1
  for (const child of node.children) {
    ctx.parentElement.unshift(node.contentType)
    buffer.push(processNode(child, ctx))
    ctx.parentElement.shift()
  }
  if (node.contentType == "li") ctx.level -=1
  if ((node.contentType == "ul" || node.contentType == "ol") && ctx.level == 0) buffer.push(`${OBS_CALLOUT_TOKEN}${MD_NEW_LINE}`)
  if (node.contentType == "code") {
    let langType = ""
    if (node.metadata != null) {
      const classList = node.metadata["classes"]
      console.log("classList",classList)
      langType = classList.filter((item:string) => item.indexOf("language-")!= -1)[0] || ""
      langType = langType.replace("language-", "")
    }
    buffer.push(OBS_CALLOUT_TOKEN + "```" + langType + MD_NEW_LINE)
    const value = node.value?.split("\n").map((item)=> OBS_CALLOUT_TOKEN + item + MD_NEW_LINE).join("")
    buffer.push(value)
    buffer.push(OBS_CALLOUT_TOKEN + "```" + MD_NEW_LINE)
  }

  // let emptyLine = MD_NEW_LINE
  // if (ctx.dialogType === "bot") emptyLine = `${OBS_CALLOUT_TOKEN}${MD_NEW_LINE}`
  // buffer.push(emptyLine)
  return buffer.join("")
}
