"use client"

import { MapPin } from "lucide-react"

interface LocationMapProps {
  location: string
  className?: string
}

export function LocationMap({ location, className = "h-64 w-full rounded-lg overflow-hidden" }: LocationMapProps) {
  return (
    <div className={className}>
      <div className="h-full w-full bg-muted flex flex-col items-center justify-center p-4 text-center">
        <MapPin className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-lg font-medium mb-2">Location</h3>
        <p className="text-muted-foreground">{location}</p>
        <p className="text-sm text-muted-foreground mt-4">Map visualization is simplified in this version.</p>
      </div>
    </div>
  )
}
