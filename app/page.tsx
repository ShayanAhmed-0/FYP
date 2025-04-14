"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

// Dummy developers data
const dummyDevelopers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahjohnson",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Next.js"],
    image: "/placeholder.svg?height=80&width=80&text=SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "mikechen",
    title: "Full Stack Developer",
    location: "New York, NY",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    image: "/placeholder.svg?height=80&width=80&text=MC",
  },
  {
    id: 3,
    name: "Jessica Williams",
    username: "jwilliams",
    title: "UX/UI Designer & Developer",
    location: "Austin, TX",
    skills: ["React", "Figma", "CSS"],
    image: "/placeholder.svg?height=80&width=80&text=JW",
  },
  {
    id: 4,
    name: "David Kim",
    username: "dkim",
    title: "Backend Developer",
    location: "Seattle, WA",
    skills: ["Python", "Django", "PostgreSQL"],
    image: "/placeholder.svg?height=80&width=80&text=DK",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    username: "erodriguez",
    title: "Mobile Developer",
    location: "Miami, FL",
    skills: ["React Native", "Swift", "Kotlin"],
    image: "/placeholder.svg?height=80&width=80&text=ER",
  },
  {
    id: 6,
    name: "James Wilson",
    username: "jwilson",
    title: "DevOps Engineer",
    location: "Chicago, IL",
    skills: ["Docker", "Kubernetes", "AWS"],
    image: "/placeholder.svg?height=80&width=80&text=JW",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("username")
  const [searchResults, setSearchResults] = useState<typeof dummyDevelopers>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "Type:", searchType)

    if (!searchQuery.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    let results
    const query = searchQuery.toLowerCase()

    switch (searchType) {
      case "username":
        results = dummyDevelopers.filter(
          (dev) => dev.username.toLowerCase().includes(query) || dev.name.toLowerCase().includes(query),
        )
        break
      case "techstack":
        results = dummyDevelopers.filter((dev) => dev.skills.some((skill) => skill.toLowerCase().includes(query)))
        break
      case "location":
        results = dummyDevelopers.filter((dev) => dev.location.toLowerCase().includes(query))
        break
      default:
        results = dummyDevelopers
    }

    console.log("Search results:", results)
    setSearchResults(results)
    setHasSearched(true)
  }

  return (
    <div className="w-full flex justify-center">
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="font-bold">Portfolio AI</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Showcase Your Skills, Connect with Professionals
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create your developer portfolio and get discovered by employers and collaborators.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by username, tech stack, or location..."
                    className="pl-8 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                      }
                    }}
                  />
                </div>
                <Tabs defaultValue={searchType} onValueChange={setSearchType} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="username">Username</TabsTrigger>
                    <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Button className="mt-4" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Search Results Section */}
        {hasSearched && (
          <section className="w-full py-12">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold mb-6">Search Results</h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {searchResults.map((dev) => (
                    <Link href={`/profile/${dev.username}`} key={dev.id}>
                      <Card className="h-full transition-shadow hover:shadow-md p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={dev.image || "/placeholder.svg"}
                            alt={dev.name}
                            className="object-cover w-16 h-16 rounded-full"
                          />
                          <div>
                            <h3 className="font-bold">{dev.name}</h3>
                            <p className="text-sm text-muted-foreground">@{dev.username}</p>
                            <p className="mt-1 text-sm">{dev.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{dev.location}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {dev.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 text-xs font-medium rounded-full border bg-background"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No results found. Try a different search term.</p>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Three simple steps to showcase your skills and get discovered.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-8">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Create Your Profile</h3>
                  <p className="text-muted-foreground text-center">
                    Sign up and build your portfolio with projects, skills, and experience.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Showcase Your Work</h3>
                  <p className="text-muted-foreground text-center">
                    Add your projects, tech stack, and highlight your achievements.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Get Discovered</h3>
                  <p className="text-muted-foreground text-center">
                    Be found by employers and collaborators based on your skills and location.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/explore">Explore Developers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Developers</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover talented developers from around the world.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
                {dummyDevelopers.slice(0, 4).map((dev) => (
                  <Link href={`/profile/${dev.username}`} key={dev.id} className="group">
                    <div className="overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent">
                      <div className="h-40 w-full bg-gradient-to-br from-primary/20 to-primary-foreground/20" />
                      <div className="relative p-6">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full border-4 border-background bg-background p-1">
                          <img
                            src={dev.image || "/placeholder.svg"}
                            alt={dev.name}
                            className="h-20 w-20 rounded-full object-cover"
                          />
                        </div>
                        <div className="mt-10 text-center">
                          <h3 className="text-xl font-bold">{dev.name}</h3>
                          <p className="text-sm text-muted-foreground">{dev.title}</p>
                          <div className="mt-2 flex flex-wrap justify-center gap-1">
                            {dev.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{dev.location}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Button variant="outline" className="mt-8" asChild>
                <Link href="/explore">View More Developers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="text-lg font-semibold">Portfolio AI</div>
            <p className="text-sm text-muted-foreground">
              Showcase your skills, connect with professionals, and find opportunities.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="text-sm font-medium">Company</div>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/about#team" className="hover:underline">
                Careers
              </Link>
              <Link href="/about#contact" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="text-sm font-medium">Help</div>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/about#faq" className="hover:underline">
                Documentation
              </Link>
              <Link href="/about#contact" className="hover:underline">
                Support
              </Link>
              <Link href="/about#terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/about#privacy" className="hover:underline">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Portfolio AI. All rights reserved.
        </div>
      </footer>
    </div>
    </div>
  )
}
