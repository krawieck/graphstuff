import { describe, expect, it } from "vitest"
import { graphFromString } from "../models/edge"
import { Hamiltonian, isHamiltonian } from "./hamiltonian"

type HamiltonianTestCase = [string, Hamiltonian]

describe("function for determining if graph is eulerian", () => {
  it("handles all cases properly", () => {
    const testCases: HamiltonianTestCase[] = [
      ["01 12 20", Hamiltonian.fully],
      ["01 12", Hamiltonian.semi],
      ["12 20 03 31 10 23", Hamiltonian.fully],
      ["12 23 40 02", Hamiltonian.not],
      ["00", Hamiltonian.fully],
      ["00 00", Hamiltonian.fully],
      ["00 01 11", Hamiltonian.semi],
      ["12 23 30 02", Hamiltonian.semi],
      ["13 21 24 32 30 43 54 50 05 01", Hamiltonian.semi],
      ["05 03 12 14 20 31 40 51", Hamiltonian.not],
    ]

    for (const [graph, expected] of testCases) {
      expect(isHamiltonian(...graphFromString(graph))).toStrictEqual(expected)
    }
  })
})
