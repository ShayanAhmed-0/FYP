"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ThemeOption = {
  name: string
  primaryColor: string
  bgColor: string
}

const themes: ThemeOption[] = [
  {
    name: "Purple Dark",
    primaryColor: "hsl(271, 91%, 65%)",
    bgColor: "hsl(240, 10%, 4%)",
  },
  {
    name: "Blue Dark",
    primaryColor: "hsl(217, 91%, 60%)",
    bgColor: "hsl(240, 10%, 4%)",
  },
  {
    name: "Green Dark",
    primaryColor: "hsl(142, 71%, 45%)",
    bgColor: "hsl(240, 10%, 4%)",
  },
  {
    name: "Red Dark",
    primaryColor: "hsl(0, 91%, 65%)",
    bgColor: "hsl(240, 10%, 4%)",
  },
  {
    name: "Purple Light",
    primaryColor: "hsl(271, 91%, 65%)",
    bgColor: "hsl(0, 0%, 100%)",
  },
  {
    name: "Blue Light",
    primaryColor: "hsl(217, 91%, 60%)",
    bgColor: "hsl(0, 0%, 100%)",
  },
]

export function ThemeCustomizer({ onClose }: { onClose: () => void }) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(themes[0])

  const handleThemeChange = (theme: ThemeOption) => {
    setSelectedTheme(theme)
    // In a real app, this would update CSS variables or a theme context
    document.documentElement.style.setProperty("--primary", theme.primaryColor)
    document.documentElement.style.setProperty("--background", theme.bgColor)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Customize Theme</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="fonts">Fonts</TabsTrigger>
        </TabsList>
        <TabsContent value="colors" className="space-y-4 pt-4">
          <div>
            <label className="text-sm font-medium">Theme Preset</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between mt-1">
                  {selectedTheme.name}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                {themes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.name}
                    className="flex items-center justify-between"
                    onClick={() => handleThemeChange(theme)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
                      {theme.name}
                    </div>
                    {selectedTheme.name === theme.name && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Primary Color</label>
              <div
                className="h-10 w-full rounded-md mt-1 cursor-pointer border"
                style={{ backgroundColor: selectedTheme.primaryColor }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Background Color</label>
              <div
                className="h-10 w-full rounded-md mt-1 cursor-pointer border"
                style={{ backgroundColor: selectedTheme.bgColor }}
              />
            </div>
          </div>

          <Button className="w-full">Apply Theme</Button>
        </TabsContent>
        <TabsContent value="fonts" className="space-y-4 pt-4">
          <div>
            <label className="text-sm font-medium">Heading Font</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between mt-1">
                  Inter
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem>Inter</DropdownMenuItem>
                <DropdownMenuItem>Roboto</DropdownMenuItem>
                <DropdownMenuItem>Montserrat</DropdownMenuItem>
                <DropdownMenuItem>Poppins</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <label className="text-sm font-medium">Body Font</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between mt-1">
                  Inter
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem>Inter</DropdownMenuItem>
                <DropdownMenuItem>Roboto</DropdownMenuItem>
                <DropdownMenuItem>Open Sans</DropdownMenuItem>
                <DropdownMenuItem>Lato</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button className="w-full">Apply Fonts</Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

