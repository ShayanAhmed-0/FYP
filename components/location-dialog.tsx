"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Loader2, MapPin, Search, Crosshair } from "lucide-react"

interface LocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialLocation?: string
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void
}

export function LocationDialog({
  open,
  onOpenChange,
  initialLocation = "",
  onLocationSelect,
}: LocationDialogProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(initialLocation)
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string
    lat: number
    lng: number
  } | null>(null)
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  // @ts-ignore
  const markerRef = useRef<google.maps.Marker | null>(null)
  // @ts-ignore
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
  // @ts-ignore
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)

  useEffect(() => {
    if (!open) return

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (window.google && window.google.maps) {
      initMap()
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      initMap()
    }

    script.onerror = () => {
      setIsLoading(false)
      setError("Failed to load Google Maps")
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [open])

  const initMap = () => {
    if (!window.google || !mapRef.current) return

    setIsLoading(true)

    try {
      geocoderRef.current = new window.google.maps.Geocoder()

      const defaultLocation = { lat: 37.7749, lng: -122.4194 }

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6c7983" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "on" }, { color: "#13151a" }, { weight: 2 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ color: "#13151a" }],
          },
          {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{ color: "#13151a" }],
          },
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [{ color: "#6c7983" }],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#2a2d34" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#17263c" }],
          },
        ],
      })

      mapInstanceRef.current = map

      const marker = new window.google.maps.Marker({
        map,
        position: defaultLocation,
        animation: window.google.maps.Animation.DROP,
        draggable: true,
      })

      markerRef.current = marker

      marker.addListener("dragend", () => {
        const position = marker.getPosition()
        if (position) {
          reverseGeocode(position.lat(), position.lng())
        }
      })

      const input = document.getElementById("location-search") as HTMLInputElement
      const searchBox = new window.google.maps.places.SearchBox(input)
      searchBoxRef.current = searchBox

      map.addListener("bounds_changed", () => {
        // @ts-ignore
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
      })

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces()

        if (!places || places.length === 0) {
          return
        }

        const place = places[0]

        if (!place.geometry || !place.geometry.location) {
          return
        }

        marker.setPosition(place.geometry.location)

        map.setCenter(place.geometry.location)
        map.setZoom(15)

        setSelectedLocation({
          address: place.formatted_address || searchQuery,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
      })

      if (initialLocation) {
        geocodeAddress(initialLocation)
      }

      setIsLoading(false)
    } catch (err) {
      console.error("Error initializing map:", err)
      setIsLoading(false)
      setError("Error initializing map")
    }
  }

  const geocodeAddress = (address: string) => {
    if (!geocoderRef.current || !mapInstanceRef.current || !markerRef.current) return

    geocoderRef.current.geocode({ address }, (results:any, status:any) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location

        mapInstanceRef.current.setCenter(location)
        mapInstanceRef.current.setZoom(15)
        markerRef.current.setPosition(location)

        setSelectedLocation({
          address: results[0].formatted_address || address,
          lat: location.lat(),
          lng: location.lng(),
        })
      } else {
        setError("Location not found")
      }
    })
  }

  const reverseGeocode = (lat: number, lng: number) => {
    if (!geocoderRef.current) return

    const latlng = { lat, lng }

    geocoderRef.current.geocode({ location: latlng }, (results:any, status:any) => {
      if (status === "OK" && results && results[0]) {
        const address = results[0].formatted_address
        setSearchQuery(address || "")
        setSelectedLocation({
          address: address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          lat,
          lng,
        })
      } else {
        setSelectedLocation({
          address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          lat,
          lng,
        })
      }
    })
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setIsGettingCurrentLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        if (mapInstanceRef.current && markerRef.current) {
          const location = new window.google.maps.LatLng(latitude, longitude)
          mapInstanceRef.current.setCenter(location)
          mapInstanceRef.current.setZoom(15)
          markerRef.current.setPosition(location)
        }

        reverseGeocode(latitude, longitude)

        setIsGettingCurrentLocation(false)
      },
      (error) => {
        console.error("Error getting current location:", error)
        setError("Unable to retrieve your location")
        setIsGettingCurrentLocation(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      geocodeAddress(searchQuery)
    }
  }

  const handleSave = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Set Your Location</DialogTitle>
          <DialogDescription>
            Search for a location or use your current location. You can also drag the marker to adjust.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 my-4 flex-1 min-h-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location-search"
                placeholder="Search for a location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="button" variant="outline" onClick={getCurrentLocation} disabled={isGettingCurrentLocation}>
              {isGettingCurrentLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Crosshair className="h-4 w-4" />
              )}
              <span className="sr-only md:not-sr-only md:ml-2">Current Location</span>
            </Button>
          </form>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="relative flex-1 min-h-[300px] rounded-md overflow-hidden border">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <div ref={mapRef} className="h-full w-full" />
          </div>

          {selectedLocation && (
            <div className="flex items-start gap-2 p-3 bg-muted rounded-md">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Selected Location</p>
                <p className="text-muted-foreground">{selectedLocation.address}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedLocation}>
            Save Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
