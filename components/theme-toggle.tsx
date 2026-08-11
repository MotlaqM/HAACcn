"use client"

import { SunMoonIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label="Toggle color theme"
            size="icon"
            variant="plain"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <SunMoonIcon />
          </Button>
        }
      />
      <TooltipContent>Toggle theme · D</TooltipContent>
    </Tooltip>
  )
}
