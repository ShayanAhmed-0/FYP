"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Expand, MapPin, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewLocationButtonProps {
  location: string
}

export function ViewLocationButton({ location }: ViewLocationButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button variant="secondary" size="sm" className="shadow-md" onClick={() => setIsDialogOpen(true)}>
        <Expand className="h-4 w-4 mr-2" />
        View Map
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Location: {location}</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] bg-muted rounded-md flex flex-col items-center justify-center p-4">
            <MapPin className="h-16 w-16 text-primary mb-4" />
            <h3 className="text-xl font-medium mb-2">{location}</h3>
            <p className="text-muted-foreground text-center">Map visualization is simplified in this version.</p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
