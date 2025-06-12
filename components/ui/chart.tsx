"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend as RechartsLegend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from "recharts"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("h-[350px] w-full", className)} {...props} />,
)
ChartContainer.displayName = "ChartContainer"

const ChartTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("font-semibold", className)} {...props} />,
)
ChartTitle.displayName = "ChartTitle"

const ChartDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
ChartDescription.displayName = "ChartDescription"

const ChartLegend = React.forwardRef<
  React.ElementRef<typeof RechartsLegend>,
  React.ComponentPropsWithoutRef<typeof RechartsLegend>
>(({ ...props }) => <RechartsLegend verticalAlign="top" height={60} {...props} />)
ChartLegend.displayName = "ChartLegend"

const ChartTooltip = React.forwardRef<
  React.ElementRef<typeof RechartsTooltip>,
  React.ComponentPropsWithoutRef<typeof RechartsTooltip>
>(({ ...props }) => <RechartsTooltip cursor={false} {...props} />)
ChartTooltip.displayName = "ChartTooltip"

const ChartXAxis = React.forwardRef<
  React.ElementRef<typeof RechartsXAxis>,
  React.ComponentPropsWithoutRef<typeof RechartsXAxis>
>(({ ...props }) => (
  <RechartsXAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} {...props} />
))
ChartXAxis.displayName = "ChartXAxis"

const ChartYAxis = React.forwardRef<
  React.ElementRef<typeof RechartsYAxis>,
  React.ComponentPropsWithoutRef<typeof RechartsYAxis>
>(({ ...props }) => (
  <RechartsYAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} {...props} />
))
ChartYAxis.displayName = "ChartYAxis"

const ChartGrid = React.forwardRef<
  React.ElementRef<typeof CartesianGrid>,
  React.ComponentPropsWithoutRef<typeof CartesianGrid>
>(({ ...props }) => <CartesianGrid strokeDasharray="3 3" {...props} />)
ChartGrid.displayName = "ChartGrid"

export {
  ChartContainer,
  ChartTitle as Title,
  ChartDescription,
  ChartLegend as Legend,
  ChartTooltip,
  ChartXAxis as XAxis,
  ChartYAxis as YAxis,
  ChartGrid as Grid,
  RechartsBarChart as BarChart,
  RechartsLineChart as LineChart,
  RechartsPieChart as PieChart,
  RadialBarChart,
  ComposedChart,
  Cell,
  ResponsiveContainer,
  Bar,
  Line,
  Pie,
  RadialBar,
}