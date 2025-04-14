"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MapPin, Search, Loader2 } from "lucide-react"

interface LocationPickerProps {
  initialLocation?: string
  onLocationChange?: (location: { address: string; lat: number; lng: number }) => void
}

// Declare google as a global variable to satisfy Typescript
declare global {
  interface Window {
    google: any
  }
}

export function LocationPicker({ initialLocation = "", onLocationChange }: LocationPickerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [location, setLocation] = useState(initialLocation)
  const [searchQuery, setSearchQuery] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLoadingMap, setIsLoadingMap] = useState(false)
  const [selectedCoords, setSelectedCoords] = useState({ lat: 37.7749, lng: -122.4194 }) // Default to San Francisco

  const mapRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const googleMapRef = useRef<google.maps.Map | null>(null)
  // @ts-ignore
  const markerRef = useRef<google.maps.Marker | null>(null)

  // Sample locations for demo
  const sampleLocations = [
    { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
    { name: "New York, NY", lat: 40.7128, lng: -74.006 },
    { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
    { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
    { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
    { name: "Boston, MA", lat: 42.3601, lng: -71.0589 },
    { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
  ]

  // Initialize map when dialog opens
  useEffect(() => {
    if (isDialogOpen && !mapLoaded) {
      initializeMap()
    }
  }, [isDialogOpen, mapLoaded])

  // Update map when selected location changes
  useEffect(() => {
    if (googleMapRef.current && markerRef.current) {
      // @ts-ignore
      const position = new google.maps.LatLng(selectedCoords.lat, selectedCoords.lng)
      googleMapRef.current.setCenter(position)
      markerRef.current.setPosition(position)
    }
  }, [selectedCoords])

  const initializeMap = async () => {
    if (!window.google || !mapRef.current) {
      setIsLoadingMap(true)

      try {
        // Load Google Maps API
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

        // Check if Google Maps is already loaded
        if (!window.google) {
          await loadGoogleMapsScript(apiKey!)
        }

        // Create map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: selectedCoords.lat, lng: selectedCoords.lng },
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })

        // Create marker
        const marker = new window.google.maps.Marker({
          position: { lat: selectedCoords.lat, lng: selectedCoords.lng },
          map,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
        })

        // Handle marker drag end
        marker.addListener("dragend", () => {
          const position = marker.getPosition()
          if (position) {
            const lat = position.lat()
            const lng = position.lng()
            setSelectedCoords({ lat, lng })

            // Reverse geocode to get address
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: { lat, lng } }, (results:any, status:any) => {
              if (status === "OK" && results && results[0]) {
                const address = results[0].formatted_address
                setSearchQuery(address)
              }
            })
          }
        })

        googleMapRef.current = map
        markerRef.current = marker
        setMapLoaded(true)
      } catch (error) {
        console.error("Error initializing map:", error)
      } finally {
        setIsLoadingMap(false)
      }
    }
  }

  const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Google Maps API"))

      document.head.appendChild(script)
    })
  }

  const handleLocationSelect = (selectedLocation: string, lat: number, lng: number) => {
    setLocation(selectedLocation)
    setSelectedCoords({ lat, lng })

    if (onLocationChange) {
      onLocationChange({
        address: selectedLocation,
        lat,
        lng,
      })
    }

    setIsDialogOpen(false)
  }

  const filteredLocations = searchQuery
    ? sampleLocations.filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : sampleLocations

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 p-2 border rounded-md bg-muted/50">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm truncate">{location || "No location set"}</span>
        </div>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          {location ? "Change" : "Set Location"}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Choose Location</DialogTitle>
          </DialogHeader>

          <div className="relative my-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a location..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
            {/* Map Preview */}
            <div className="relative h-[300px] border rounded-md overflow-hidden">
              {isLoadingMap && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <div ref={mapRef} className="h-full w-full" />
            </div>

            {/* Location List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-2">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.name}
                  className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleLocationSelect(loc.name, loc.lat, loc.lng)}
                >
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {loc.name}
                </div>
              ))}

              {searchQuery && filteredLocations.length === 0 && (
                <div className="text-center p-4 text-muted-foreground">No locations found. Try a different search.</div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (searchQuery) {
                  // For custom locations, we'll use the current map center
                  handleLocationSelect(searchQuery, selectedCoords.lat, selectedCoords.lng)
                }
              }}
              disabled={!searchQuery}
            >
              Use Custom Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
