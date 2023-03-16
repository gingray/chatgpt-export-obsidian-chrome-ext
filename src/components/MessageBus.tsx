import React from "react"

export const MessageBus = ({data}:{data: string[]}) => {
  const items = data.map((item, idx) => <div key={idx}>{item}</div>)
  return (
    <div className={'message-bus-container'}>
      {items}
    </div>
  )
}
