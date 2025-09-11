import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface ChartContainerProps {
  children: ReactNode
  config?: Record<string, { label: string; color: string }>
  className?: string
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  return <div className={`relative ${className}`}>{children}</div>
}

interface ChartTooltipContentProps {
  payload: any[]
  label: string
  config?: Record<string, { label: string; color: string }>
}

export function ChartTooltipContent({ payload, label, config }: ChartTooltipContentProps) {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <Card className="bg-popover text-popover-foreground shadow-md">
      <CardContent className="p-2">
        <div className="text-sm font-medium">{label}</div>
        <ul className="mt-2 space-y-1">
          {payload.map((item, index) => (
            <li key={index} className="flex items-center justify-between text-xs">
              <span className="mr-2">{config?.[item.dataKey]?.label || item.dataKey}:</span>
              <span className="font-semibold">{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
