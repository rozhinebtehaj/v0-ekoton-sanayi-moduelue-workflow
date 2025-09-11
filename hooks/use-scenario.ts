"use client"

import { useState, useEffect } from "react"
import { ScenarioManager, type ScenarioData } from "@/lib/scenarios"

export function useScenario() {
  const [scenario, setScenario] = useState<ScenarioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize scenario on client side
    const currentScenario = ScenarioManager.getCurrentScenario()
    setScenario(currentScenario)
    setIsLoading(false)
  }, [])

  const changeScenario = (index: number) => {
    ScenarioManager.setScenarioIndex(index)
    const newScenario = ScenarioManager.getCurrentScenario()
    setScenario(newScenario)
  }

  const resetScenario = () => {
    ScenarioManager.clearScenario()
    const newScenario = ScenarioManager.getCurrentScenario()
    setScenario(newScenario)
  }

  return {
    scenario,
    isLoading,
    changeScenario,
    resetScenario,
    allScenarios: ScenarioManager.getAllScenarios(),
  }
}
