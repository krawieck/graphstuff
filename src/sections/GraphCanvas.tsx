import { KonvaEventObject } from "konva/lib/Node"
import { useState } from "react"
import { Arrow, Circle, Layer, Stage } from "react-konva"
import {
  CIRCLE_COLOR,
  CIRCLE_RADIUS,
  LINE_COLOR,
  LINE_WIDTH,
  SELECTED_CIRCLE_COLOR,
} from "../contants"
import { useKeyPress } from "../hooks/useKeyHold"
import { arrowStickingPoint, isWithinCrircle, pointStickingOutBetweenPoints } from "../math/utils"
import { Point } from "../models/point"
import { Vertex } from "../models/vertex"
import { useGraphStore } from "../state/graph"

interface MouseDrag {
  from: Point
  to: Point
}

export const GraphCanvas: React.FC = ({}) => {
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

  const [visualVerts, setVisualVerts] = useState<Vertex[]>([])
  const [line, setLine] = useState<MouseDrag | null>(null)
  const [lineFrom, setLineFrom] = useState<number | null>(null)
  const shiftIsPressed = useKeyPress("Shift")

  function handleClick(event: KonvaEventObject<MouseEvent>) {
    if (distanceToClosestVertex(event.evt) < CIRCLE_RADIUS * 2) return
    if (shiftIsPressed) return

    const { x, y } = event.evt
    addVert(x, y)
    setVisualVerts([...vertices])
  }

  // DRAG LINE FROM TO VERT
  const handleDragginLine = {
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

      setLine(null)
      setLineFrom(null)
    },
    mouseDrag(event: KonvaEventObject<MouseEvent>) {
      if (!shiftIsPressed || line == null) return

      const { x, y } = event.evt
      setLine({ from: line!.from, to: { x, y } })
    },
  }

  // VERT DRAGGABLE
  function handleVertDragEnd(i: number, event: KonvaEventObject<DragEvent>) {
    const { x, y } = event.evt
    moveVertex(i, x, y)
    setSelectedVert(null)
  }
  function handleVertDrag(i: number, event: KonvaEventObject<DragEvent>) {
    const { x, y } = event.evt
    setVisualVerts(visualVerts.map((e, j) => (i === j ? new Vertex(x, y) : e))) // https://react.dev/learn/updating-arrays-in-state
  }
  function handleVertClick(i: number) {
    if (i === selectedVert) {
      // unselect if clicked again
      setSelectedVert(null)
    } else if (selectedVert == null) {
      // select if none selected already
      setSelectedVert(i)
    } else {
      // make edge if 2 selected
      addEdge(selectedVert, i)
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
      onPointerUp={handleDragginLine.mouseUp}
      onPointerMove={handleDragginLine.mouseDrag}
    >
      <Layer>
        {edges.map((edge, i) => {
          const edgeId = edge.toString()

          const pointA = visualVerts[edge.a]
          const pointB = visualVerts[edge.b]

          if (edgesCount[edgeId]) {
            edgesCount[edgeId]++
          } else {
            edgesCount[edgeId] = 1
          }

          const [actualPointA, actualPointB] = arrowStickingPoint(pointA, pointB)

          const howFarOut = (edgesCount[edgeId] - 1) * 20
          const middle = pointStickingOutBetweenPoints(actualPointA, actualPointB, howFarOut)

          if (edge.a === edge.b) {
            return (
              <Arrow
                key={edgeId + edgesCount[edgeId]}
                stroke={LINE_COLOR}
                tension={0.7}
                width={LINE_WIDTH}
                points={[
                  pointA.x + CIRCLE_RADIUS,
                  pointA.y,

                  pointA.x + CIRCLE_RADIUS + 35,
                  pointA.y + CIRCLE_RADIUS - 10,

                  pointA.x + CIRCLE_RADIUS + 25,
                  pointA.y + CIRCLE_RADIUS + 25,

                  pointB.x,
                  pointB.y + CIRCLE_RADIUS,
                ]}
              />
            )
          }

          return (
            <Arrow
              key={edgeId + edgesCount[edgeId]}
              stroke={LINE_COLOR}
              tension={0.5}
              width={LINE_WIDTH}
              points={[
                actualPointA.x,
                actualPointA.y,
                middle.x,
                middle.y,
                actualPointB.x,
                actualPointB.y,
              ]}
            />
          )
        })}
        {vertices.map((vert, i) => {
          const { x, y } = vert
          return (
            <>
              <Circle
                key={`${x}_${y}`}
                radius={CIRCLE_RADIUS}
                x={x}
                y={y}
                draggable={!shiftIsPressed}
                onDragMove={e => handleVertDrag(i, e)}
                onDragEnd={e => handleVertDragEnd(i, e)}
                onMouseDown={e => handleDragginLine.mouseDown(i, e)}
                onClick={e => handleVertClick(i)}
                fill={i === selectedVert ? SELECTED_CIRCLE_COLOR : CIRCLE_COLOR}
              />
            </>
          )
        })}
        {line != null && (
          <Arrow
            points={[line.from.x, line.from.y, line.to.x, line.to.y]}
            stroke={LINE_COLOR}
            width={LINE_WIDTH}
          />
        )}
      </Layer>
    </Stage>
  )
}
