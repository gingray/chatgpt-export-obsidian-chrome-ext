import React, {Dispatch} from "react";
import {Button} from "react-bootstrap";
import {sendChromeMessage} from "../core/chromeMessage";

const onClick = ({addLog}:{addLog:(t:string) => void}) => {
  sendChromeMessage({addLog}).then(() => console.log("success executed"))
}

export const CopyBtn = ({setMessages}:{setMessages: any}) => {

  return (<Button onClick={() => onClick({addLog: setMessages})} size={"lg"}>Copy to clipboard</Button>)
}
