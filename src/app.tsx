import React, {useEffect, useState} from "react"
import {CopyBtn} from "./components/CopyBtn";
import {MessageBus} from "./components/MessageBus";
import { PingMessage} from "./core/actions";
const EXT_PENDING = "pending"
const EXT_INVALID = "invalid"
const EXT_VALID = "valid"

export const App = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [show, setShow] = useState<string>(EXT_PENDING)
  const addLog = (item:string) => {
    const newMessages = [...messages]
    newMessages.push(item)
    setMessages(newMessages)
  }
  useEffect(()=> {
    const checker = async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      if (tab == null || tab.id == null) return
      // @ts-ignore
      (chrome.tabs.sendMessage(tab.id, {message: PingMessage}) as Promise<any>).then((r) => setShow(EXT_VALID)).catch((r) => {
        console.log("error", r)
        setShow(EXT_INVALID)})
    }
    checker().then(r => console.log("fire"))
  }, [])
  return (<div className={'app-container'}>
    <div className={'container-fluid'}>
      <h3>ChatGTP to Obsidian content exporter v0.01</h3>

      <div className={'copy-btn-container'}>
        {show == EXT_VALID && <CopyBtn setMessages={addLog}/>}
        {show == EXT_INVALID && <div>Extension works only in https://chat.openai.com/</div>}
      </div>
      <MessageBus data={messages}/>
    </div>
  </div>)
}
