import { useState } from "react"
import { Dropdown } from "../components/Dropdown"
import { Eulerian } from "../math/eulerian"
import { Vertex } from "../models/vertex"
import { useGraphStore } from "../state/graph"

function transformBool(contains?: boolean) {
  if (contains == undefined) return "checking..."
  if (contains) {
    return "😎👌"
  } else {
    return "😭👎"
  }
}

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

export const ControlPanel: React.FC = () => {
  const {
    edges,
    vertices,
    removeEdge,
    removeVert,
    addEdge,
    selectedVert,
    setSelectedVert,
    containsHamiltonianPath,
    containsHamiltonianCycle,
    eulerian,
  } = useGraphStore()

  const [altLocation, setAltLocation] = useState(false)
  const [dropdownVertex, setDropdownVertex] = useState<Vertex | null>(null)

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
      } right-0 fixed duration-250 transition-all bg-white float-right  w-1/5  shadow-md z-10 p-2 m-1 border-2 rounded-md  border-black border-solid`}
    >
      vertices:
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
      edges:
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
      <Dropdown<Vertex>
        options={vertices.map((e, i) => ({ value: e, label: i.toString() }))}
        unselectedText="select first vertex"
        selected={dropdownVertex}
        onChange={setDropdownVertex}
      />
      <br />
      contains:
      <br />
      The graph is {describeEulerian(eulerian)}
      <br />
      hamiltonian cycle: {transformBool(containsHamiltonianCycle)}
      <br />
      hamiltonian path: {transformBool(containsHamiltonianPath)}
      <br />
      {/* move window button */}
      <button className="float-right" onClick={() => setAltLocation(!altLocation)}>
        {altLocation ? "⤴️" : "⤵️"}
      </button>
    </div>
  )
}
