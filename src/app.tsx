import React, {useState} from "react"
import {Button, Container} from "react-bootstrap";
import {CopyBtn} from "./components/CopyBtn";
import {MessageBus} from "./components/MessageBus";

export const App = () => {
  const [messages, setMessages] = useState<string[]>([])
  const addLog = (item:string) => {
    const newMessages = [...messages]
    newMessages.push(item)
    setMessages(newMessages)
  }
  return (<div className={'app-container'}>
    <Container fluid={true}>
      <h1>ChatGTP to Obsidian content exporter v0.01</h1>
      <CopyBtn setMessages={addLog}/>
      <MessageBus data={messages}/>
    </Container>
  </div>)
}
