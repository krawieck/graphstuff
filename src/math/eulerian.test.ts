import { describe, expect, it } from "vitest"
import { graphFromString } from "../models/edge"
import { Eulerian, isEulerian } from "./eulerian"

type EulerianTestCase = [string, Eulerian]

describe("function for determining if graph is eulerian", () => {
  it("handles all cases properly", () => {
    const testCases: EulerianTestCase[] = [
      ["01 12 20", Eulerian.fully],
      ["01 12", Eulerian.semi],
      ["12 23 45 52", Eulerian.not],
      ["00", Eulerian.fully],
      ["00 00", Eulerian.fully],
      ["00 01 11", Eulerian.semi],
      ["12 24 43 31 14 23", Eulerian.not],
      ["05 03 12 14 20 31 40 51", Eulerian.fully],
    ]

    for (const [graph, expected] of testCases) {
      expect(isEulerian(...graphFromString(graph))).toEqual(expected)
    }
  })
})
