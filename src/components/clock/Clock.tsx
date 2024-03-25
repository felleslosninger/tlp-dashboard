"use client"

import { useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)

  return <h2>{time}</h2>
}
