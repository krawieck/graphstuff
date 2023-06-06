import { KonvaEventObject } from "konva/lib/Node"
import { useState } from "react"
import { Arrow, Circle, Layer, Stage } from "react-konva"
import { CIRCLE_COLOR, CIRCLE_RADIUS, LINE_WIDTH, SELECTED_CIRCLE_COLOR } from "../contants"
import { useKeyPress } from "../hooks/useKeyHold"
import { arrowStickingPoint, pointStickingOutBetweenPoints } from "../math/utils"
import { Vertex } from "../models/vertex"
import { useGraphStore } from "../state/graph"

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
  const [isDraggingLine, setIsDraggingLine] = useState(false)

  const shiftIsPressed = useKeyPress("Shift")

  function handleClick(event: KonvaEventObject<MouseEvent>) {
    if (distanceToClosestVertex(event.evt) < CIRCLE_RADIUS * 2) return
    if (shiftIsPressed) return

    const { x, y } = event.evt
    addVert(x, y)
    setVisualVerts([...vertices])
  }

  // VERT DRAGGABLE
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

          return (
            <Arrow
              key={edgeId + edgesCount[edgeId]}
              stroke="black"
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
