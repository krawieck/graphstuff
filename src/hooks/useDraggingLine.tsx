import { KonvaEventObject } from "konva/lib/Node"
import { useState } from "react"
import { CIRCLE_RADIUS } from "../contants"
import { isWithinCrircle } from "../math/utils"
import { Point } from "../models/point"
import { useGraphStore } from "../state/graph"
import { useKeyPress } from "./useKeyHold"

interface MouseDrag {
  from: Point
  to: Point
}

interface DraggingLineThings {
  line?: MouseDrag
  mouseDown(i: number, event: KonvaEventObject<MouseEvent>): void
  mouseUp(event: KonvaEventObject<MouseEvent>): void
  mouseDrag(event: KonvaEventObject<MouseEvent>): void
}

export function useDraggingLine(): DraggingLineThings {
  const shiftIsPressed = useKeyPress("Shift")
  const [line, setLine] = useState<MouseDrag | undefined>(undefined)
  const [lineFrom, setLineFrom] = useState<number | null>(null)
  const { vertices, addEdge } = useGraphStore()
  // DRAG LINE FROM TO VERT
  return {
    mouseDown(i: number, event: KonvaEventObject<MouseEvent>) {
      if (!shiftIsPressed) return
      const { x, y } = event.evt
      setLine({ from: vertices[i], to: { x, y } })
      setLineFrom(i)
    },
    mouseUp(event: KonvaEventObject<MouseEvent>) {
      if (line == null || lineFrom == null) return

      const { x, y } = event.evt

      for (let i = 0; i < vertices.length; i++) {
        if (isWithinCrircle({ x, y }, vertices[i], CIRCLE_RADIUS)) {
          addEdge(lineFrom, i)
          break
        }
      }

      setLine(undefined)
      setLineFrom(null)
    },
    mouseDrag(event: KonvaEventObject<MouseEvent>) {
      if (!shiftIsPressed || line == null) return

      const { x, y } = event.evt
      setLine({ from: line!.from, to: { x, y } })
    },
    line,
  }
}
