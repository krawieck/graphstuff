import { KonvaEventObject } from "konva/lib/Node"
import { useState } from "react"
import { Circle, Layer, Line, Stage } from "react-konva"
import {
  CIRCLE_COLOR,
  CIRCLE_RADIUS,
  LINE_WIDTH,
  SELECTED_CIRCLE_COLOR,
} from "../contants"
import { useKeyPress } from "../hooks/useKeyHold"
import { Vertex, useGraphStore } from "../state/graph"

export const GraphCanvas: React.FC = ({}) => {
  const [isDraggingLine, setIsDraggingLine] = useState(false)
  const {
    edges,
    vertices,
    addEdge,
    addVert,
    distanceToClosestVertex,
    moveVertex,
    setSelectedVert,
    selectedVert,
  } = useGraphStore()
  // const [selectedVert, setSelectedVert] = useState<number | null>(null)
  const [visualVerts, setVisualVerts] = useState<Vertex[]>([])
  const shiftIsPressed = useKeyPress("Shift")

  function handleClick(event: KonvaEventObject<MouseEvent>) {
    const { x, y } = event.evt
    if (distanceToClosestVertex(x, y) < CIRCLE_RADIUS * 2) return
    if (shiftIsPressed) return

    addVert(x, y)
    setVisualVerts([...vertices])
  }
  function handleVertDragEnd(i: number, event: KonvaEventObject<DragEvent>) {
    const { x, y } = event.evt
    moveVertex(i, x, y)
  }
  function handleVertDrag(i: number, event: KonvaEventObject<DragEvent>) {
    const { x, y } = event.evt
    setVisualVerts(visualVerts.map((e, j) => (i === j ? new Vertex(x, y) : e))) // https://react.dev/learn/updating-arrays-in-state
  }
  function handleVertClick(i: number) {
    if (i === selectedVert) {
      // unselect if clicked again
      setSelectedVert(null)
    } else if (!selectedVert) {
      // select if none selected already
      setSelectedVert(i)
    } else {
      // make edge if 2 selected
      addEdge(i, selectedVert)
      setSelectedVert(null)
    }
  }

  let edgesCount: { [key: string]: number } = {}

  return (
    <Stage
      className="float-left shadow-l"
      onClick={handleClick}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {edges.map((edge, i) => {
          const pointA = visualVerts[edge.a]
          const pointB = visualVerts[edge.b]
          if (edgesCount[edge.toString()]) {
            edgesCount[edge.toString()]++
          } else {
            edgesCount[edge.toString()] = 1
          }

          return (
            <Line
              key={edge.toString() + edgesCount[edge.toString()]}
              stroke="black"
              tension={0.5}
              width={LINE_WIDTH}
              points={[
                pointA.visualX,
                pointA.visualY,
                pointB.visualX,
                pointB.visualY,
              ]}
            />
          )
        })}
        {vertices.map((vert, i) => {
          const { visualX, visualY } = vert
          return (
            <>
              <Circle
                key={`${visualX}_${visualY}`}
                radius={CIRCLE_RADIUS}
                x={visualX}
                y={visualY}
                draggable={!shiftIsPressed}
                onDragMove={(e) => handleVertDrag(i, e)}
                onDragEnd={(e) => handleVertDragEnd(i, e)}
                onClick={(e) => handleVertClick(i)}
                fill={i === selectedVert ? SELECTED_CIRCLE_COLOR : CIRCLE_COLOR}
              />
              {/* <Text
                x={visualVerts[i].visualX}
                y={visualVerts[i].visualY}
                text={(i + 1).toString()}
              /> */}
            </>
          )
        })}
      </Layer>
    </Stage>
  )
}
