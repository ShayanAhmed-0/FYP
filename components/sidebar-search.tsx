"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

// Mock data for search results - in a real app, this would come from an API
const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahjohnson",
    title: "Senior Frontend Developer",
    image: "/placeholder.svg?height=32&width=32&text=SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "mikechen",
    title: "Full Stack Developer",
    image: "/placeholder.svg?height=32&width=32&text=MC",
  },
  {
    id: 3,
    name: "Jessica Williams",
    username: "jwilliams",
    title: "UX/UI Designer & Developer",
    image: "/placeholder.svg?height=32&width=32&text=JW",
  },
  {
    id: 4,
    name: "David Kim",
    username: "dkim",
    title: "Backend Developer",
    image: "/placeholder.svg?height=32&width=32&text=DK",
  },
]

export function SidebarSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<typeof mockUsers>([])
  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle search
  const handleSearch = () => {
    if (!query.trim()) {
      setResults([])
      setIsResultsOpen(false)
      return
    }

    setIsSearching(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const filteredResults = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.title.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
      setIsSearching(false)
      setIsResultsOpen(true)
    }, 500)
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsResultsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
            onFocus={() => {
              if (results.length > 0) {
                setIsResultsOpen(true)
              }
            }}
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-0"
              onClick={() => {
                setQuery("")
                setResults([])
                setIsResultsOpen(false)
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
        <Button size="sm" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {isResultsOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
          {results.length > 0 ? (
            <div className="py-1">
              {results.map((user) => (
                <Link
                  key={user.id}
                  href={`/profile/${user.username}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                  onClick={() => setIsResultsOpen(false)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground">No users found</div>
          )}
        </div>
      )}
    </div>
  )
}
