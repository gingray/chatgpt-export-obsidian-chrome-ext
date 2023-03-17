type DialogType = "bot" | "user"

type TransformContext = {
  dialogType: DialogType
  parentElement: ContentType
  level: number
}

const OBS_CALLOUT_TOKEN = "> "
const MD_LIST_TOKEN = "* "
const MD_NEW_LINE = "  \n"

export const buildMd = (node: ContentPayload, ctx: TransformContext) => {
  return `${processNode(node, ctx)}`
}

const processNode = (node: ContentPayload, ctx: TransformContext): string => {
  if (node.value instanceof Array) {
    return processArray(node.value, ctx)
  }

  if (typeof node.value === "string") {
    let line = `${node.value}${MD_NEW_LINE}`
    if (node.contentType === "li") line = `${MD_LIST_TOKEN}${line}`
    if (ctx.dialogType === "bot") line = `${OBS_CALLOUT_TOKEN}${line}`
    return line
  }

  return processNode(node.value as ContentPayload, ctx)
}

const processArray = (nodes: ContentPayload[], ctx: TransformContext):string => {
  const buff = []
  for (const node  of nodes) {
    buff.push(processNode(node, ctx))
  }
  let emptyLine = MD_NEW_LINE
  if (ctx.dialogType === "bot") emptyLine = `${OBS_CALLOUT_TOKEN}${MD_NEW_LINE}`
  buff.push(emptyLine)
  return buff.join("")
}
