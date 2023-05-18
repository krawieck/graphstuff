import { useEffect, useState } from "react"

export function useKeyPress(keyName: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === keyName) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === keyName) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [])
  return keyPressed
}
