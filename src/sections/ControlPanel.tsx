import { useState } from "react"
import { Button } from "../components/Button"
import { useKeyPress } from "../hooks/useKeyHold"
import { Eulerian } from "../math/eulerian"
import { Hamiltonian } from "../math/hamiltonian"
import { findPath } from "../math/pathfinding"
import { useGraphStore } from "../state/graph"

function describeEulerian(value?: Eulerian) {
  switch (value) {
    case Eulerian.fully:
      return "eulerian 🤩"
    case Eulerian.semi:
      return "semi-eulerian 🙂"
    case Eulerian.not:
      return "not eulerian 😐"
    default:
      return "[checking...]"
  }
}

function describeHamiltonian(value?: Hamiltonian) {
  switch (value) {
    case Hamiltonian.fully:
      return "hamiltonian 🤩"
    case Hamiltonian.semi:
      return "semi-hamiltonian 🙂"
    case Hamiltonian.not:
      return "not hamiltonian 😐"
    default:
      return "[checking...]"
  }
}

export const ControlPanel: React.FC = () => {
  const {
    edges,
    vertices,
    removeEdge,
    removeVert,
    addEdge,
    selectedVert,
    setSelectedVert,
    eulerian,
    hamiltonian,
  } = useGraphStore()

  const [altLocation, setAltLocation] = useState(false)
  const shiftIsPressed = useKeyPress("Shift")
  const [source, setSource] = useState<number>(0)
  const [target, setTarget] = useState<number>(0)

  function handleFindPath() {
    const found = findPath(vertices, edges, source, target)

    alert("the path is: " + found)
  }

  function connectToItself() {
    if (selectedVert == null) return

    addEdge(selectedVert, selectedVert)
    setSelectedVert(null)
  }

  function handleRemoveVert(index: number) {
    if (selectedVert === index) setSelectedVert(null)
    removeVert(index)
  }

  function handleRemoveEdge(index: number) {
    removeEdge(index)
  }
  let edgesCount: { [key: string]: number } = {}

  return (
    <div
      className={`${
        altLocation ? "bottom-0 object-right-bottom" : "top-0 object-right-top"
      } right-0 overflow-scroll fixed max-h-96 duration-250 transition-all bg-white float-right w-64 lg:w-1/5  shadow-md z-10 p-2 m-1 border-2 rounded-md  border-black border-solid`}
    >
      <strong>vertices:</strong>
      {vertices.length === 0 && (
        <>
          <span className="text-indigo-400"> [no vertices yet]</span>
          <br />
          HINT: click to create vertices
        </>
      )}
      <ul>
        {vertices.map(({ x, y }, i) => (
          <li key={`${x}_${y}`}>
            vert {i + 1} ({x}, {y})
            <button className="pl-2" onClick={() => handleRemoveVert(i)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
      <strong>edges:</strong>
      {edges.length === 0 && (
        <>
          <span className="text-indigo-400"> [no edges yet]</span>
          <br />
          HINT: shift+drag to create edges
        </>
      )}
      <ul>
        {edges.map((edge, i) => {
          if (edgesCount[edge.toString()]) edgesCount[edge.toString()]++
          else edgesCount[edge.toString()] = 1

          const { a, b } = edge
          return (
            <li key={`edge_${a}_${b}_${edgesCount[edge.toString()]}`}>
              edge {i + 1} ({a + 1}→{b + 1})
              <button className="pl-2" onClick={() => handleRemoveEdge(i)}>
                ❌
              </button>
            </li>
          )
        })}
      </ul>
      <hr />
      find path from
      <input
        type="number"
        value={source}
        className="w-24 px-2"
        onChange={e => setSource(parseInt(e.currentTarget.value))}
      />
      to
      <input
        type="number"
        className="w-24 px-2"
        value={target}
        onChange={e => setTarget(parseInt(e.currentTarget.value))}
      />
      shortestPath
      <Button onClick={handleFindPath}>find path</Button>
      <br />
      The graph is
      <br />
      {describeEulerian(eulerian)}
      <br />
      and {describeHamiltonian(hamiltonian)}
      <br />
      {shiftIsPressed && <>[drag to connect edges]</>}
      <br />
      {selectedVert != null && <Button onClick={connectToItself}>connect to itself</Button>}
      {/* move window button */}
      <button className="float-right" onClick={() => setAltLocation(!altLocation)}>
        {altLocation ? "⤴️" : "⤵️"}
      </button>
    </div>
  )
}
