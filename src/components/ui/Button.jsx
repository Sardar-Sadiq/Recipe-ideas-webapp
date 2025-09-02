import * as React from "react"
import { cn } from "./../../lib/utils"

export function Button({ className, variant = "default", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" &&
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
        variant === "outline" &&
          "border border-gray-300 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  )
}
