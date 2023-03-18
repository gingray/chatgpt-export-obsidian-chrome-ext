import React, {Dispatch} from "react";
import {sendChromeMessage} from "../core/chromeMessage";

const onClick = ({addLog}:{addLog:(t:string) => void}) => {
  sendChromeMessage({addLog}).then(() => console.log("success executed"))
}

export const CopyBtn = ({setMessages}:{setMessages: any}) => {

  return (<button onClick={() => onClick({addLog: setMessages})} >Copy to clipboard</button>)
}
