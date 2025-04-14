"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, MapPin, Search, Code, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for developers
const developers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahjohnson",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Next.js"],
    image: "/placeholder.svg?height=80&width=80&text=SJ",
    featured: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "mikechen",
    title: "Full Stack Developer",
    location: "New York, NY",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    image: "/placeholder.svg?height=80&width=80&text=MC",
    featured: true,
  },
  {
    id: 3,
    name: "Jessica Williams",
    username: "jwilliams",
    title: "UX/UI Designer & Developer",
    location: "Austin, TX",
    skills: ["React", "Figma", "CSS"],
    image: "/placeholder.svg?height=80&width=80&text=JW",
    featured: false,
  },
  {
    id: 4,
    name: "David Kim",
    username: "dkim",
    title: "Backend Developer",
    location: "Seattle, WA",
    skills: ["Python", "Django", "PostgreSQL"],
    image: "/placeholder.svg?height=80&width=80&text=DK",
    featured: false,
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    username: "erodriguez",
    title: "Mobile Developer",
    location: "Miami, FL",
    skills: ["React Native", "Swift", "Kotlin"],
    image: "/placeholder.svg?height=80&width=80&text=ER",
    featured: false,
  },
  {
    id: 6,
    name: "James Wilson",
    username: "jwilson",
    title: "DevOps Engineer",
    location: "Chicago, IL",
    skills: ["Docker", "Kubernetes", "AWS"],
    image: "/placeholder.svg?height=80&width=80&text=JW",
    featured: false,
  },
  {
    id: 7,
    name: "Sophia Garcia",
    username: "sgarcia",
    title: "Data Scientist",
    location: "Boston, MA",
    skills: ["Python", "TensorFlow", "SQL"],
    image: "/placeholder.svg?height=80&width=80&text=SG",
    featured: false,
  },
  {
    id: 8,
    name: "Ethan Taylor",
    username: "etaylor",
    title: "Game Developer",
    location: "Los Angeles, CA",
    skills: ["Unity", "C#", "3D Modeling"],
    image: "/placeholder.svg?height=80&width=80&text=ET",
    featured: false,
  },
]

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product listings, cart, checkout, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/placeholder.svg?height=200&width=300&text=E-commerce",
    creator: "Sarah Johnson",
    creatorImage: "/placeholder.svg?height=40&width=40&text=SJ",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    image: "/placeholder.svg?height=200&width=300&text=Task+App",
    creator: "Michael Chen",
    creatorImage: "/placeholder.svg?height=40&width=40&text=MC",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    technologies: ["React", "TypeScript", "Weather API"],
    image: "/placeholder.svg?height=200&width=300&text=Weather+App",
    creator: "Jessica Williams",
    creatorImage: "/placeholder.svg?height=40&width=40&text=JW",
    featured: false,
  },
  {
    id: 4,
    title: "Social Media App",
    description: "A social networking application with real-time messaging, posts, and user profiles.",
    technologies: ["Next.js", "Socket.io", "PostgreSQL"],
    image: "/placeholder.svg?height=200&width=300&text=Social+App",
    creator: "David Kim",
    creatorImage: "/placeholder.svg?height=40&width=40&text=DK",
    featured: false,
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "An app to track workouts, nutrition, and fitness progress with data visualization.",
    technologies: ["React Native", "GraphQL", "MongoDB"],
    image: "/placeholder.svg?height=200&width=300&text=Fitness+App",
    creator: "Emily Rodriguez",
    creatorImage: "/placeholder.svg?height=40&width=40&text=ER",
    featured: false,
  },
  {
    id: 6,
    title: "DevOps Dashboard",
    description: "A dashboard for monitoring infrastructure, deployments, and system health.",
    technologies: ["Vue.js", "Docker", "Prometheus"],
    image: "/placeholder.svg?height=200&width=300&text=DevOps+Dashboard",
    creator: "James Wilson",
    creatorImage: "/placeholder.svg?height=40&width=40&text=JW",
    featured: false,
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("developers")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({
    skill: "all",
    location: "all",
    experience: "all",
  })

  // Filter developers based on search query and filters
  const filteredDevelopers = developers.filter((dev) => {
    // Search query filter
    const matchesQuery =
      searchQuery === "" ||
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Skill filter
    const matchesSkill =
      filters.skill === "all" || dev.skills.some((skill) => skill.toLowerCase() === filters.skill.toLowerCase())

    // Location filter
    const matchesLocation =
      filters.location === "all" || dev.location.toLowerCase().includes(filters.location.toLowerCase())

    return matchesQuery && matchesSkill && matchesLocation
  })

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter((project) => {
    // Search query filter
    const matchesQuery =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    // Skill/technology filter
    const matchesTech =
      filters.skill === "all" || project.technologies.some((tech) => tech.toLowerCase() === filters.skill.toLowerCase())

    return matchesQuery && matchesTech
  })

  // Get unique skills for filter dropdown
  const allSkills = Array.from(
    new Set([...developers.flatMap((dev) => dev.skills), ...projects.flatMap((project) => project.technologies)]),
  ).sort()

  // Get unique locations for filter dropdown
  const allLocations = Array.from(new Set(developers.map((dev) => dev.location))).sort()

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore</h1>
          <p className="text-muted-foreground">
            Discover talented developers and impressive projects from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, skills, or keywords..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filters.skill} onValueChange={(value) => setFilters({ ...filters, skill: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill.toLowerCase()}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {allLocations.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="developers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Developers
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Projects
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>
        </Tabs>

        {/* Featured Section */}
        {searchQuery === "" && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              Featured {activeTab === "developers" ? "Developers" : "Projects"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === "developers"
                ? developers
                    .filter((dev) => dev.featured)
                    .map((dev) => (
                      <Link href={`/profile/${dev.username}`} key={dev.id}>
                        <Card className="h-full transition-shadow hover:shadow-md overflow-hidden">
                          <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/10"></div>
                          <CardContent className="pt-0 relative p-6">
                            <div className="absolute -top-12 left-6">
                              <Avatar className="h-20 w-20 border-4 border-background">
                                <AvatarImage src={dev.image || "/placeholder.svg"} alt={dev.name} />
                                <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="mt-10">
                              <h3 className="text-xl font-bold">{dev.name}</h3>
                              <p className="text-sm text-muted-foreground">@{dev.username}</p>
                              <p className="mt-2">{dev.title}</p>
                              <div className="flex items-center mt-2 gap-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{dev.location}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-4">
                                {dev.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                : projects
                    .filter((project) => project.featured)
                    .map((project) => (
                      <Card key={project.id} className="h-full transition-shadow hover:shadow-md overflow-hidden">
                        <div className="relative h-40">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="text-white text-lg font-bold">{project.title}</h3>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={project.creatorImage || "/placeholder.svg"} alt={project.creator} />
                              <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{project.creator}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {activeTab === "developers" ? "All Developers" : "All Projects"}
            <span className="text-muted-foreground text-lg font-normal ml-2">
              ({activeTab === "developers" ? filteredDevelopers.length : filteredProjects.length} results)
            </span>
          </h2>

          {/* Developers Tab Content */}
          {activeTab === "developers" && (
            <>
              {filteredDevelopers.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDevelopers.map((dev) => (
                      <Link href={`/profile/${dev.username}`} key={dev.id}>
                        <Card className="h-full transition-shadow hover:shadow-md">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <Avatar className="h-20 w-20 mb-4">
                                <AvatarImage src={dev.image || "/placeholder.svg"} alt={dev.name} />
                                <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <h3 className="font-bold">{dev.name}</h3>
                              <p className="text-sm text-muted-foreground">@{dev.username}</p>
                              <p className="mt-1 text-sm">{dev.title}</p>
                              <div className="flex items-center mt-1 gap-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{dev.location}</span>
                              </div>
                              <div className="flex flex-wrap justify-center gap-1 mt-3">
                                {dev.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDevelopers.map((dev) => (
                      <Link href={`/profile/${dev.username}`} key={dev.id}>
                        <Card className="transition-shadow hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={dev.image || "/placeholder.svg"} alt={dev.name} />
                                <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <h3 className="font-bold">{dev.name}</h3>
                                    <p className="text-sm text-muted-foreground">@{dev.username}</p>
                                  </div>
                                  <div className="flex items-center mt-1 sm:mt-0 gap-1">
                                    <MapPin className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{dev.location}</span>
                                  </div>
                                </div>
                                <p className="mt-1">{dev.title}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {dev.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No developers found matching your search criteria.</p>
                </div>
              )}
            </>
          )}

          {/* Projects Tab Content */}
          {activeTab === "projects" && (
            <>
              {filteredProjects.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <Card key={project.id} className="h-full transition-shadow hover:shadow-md overflow-hidden">
                        <div className="relative h-40">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="text-white text-lg font-bold">{project.title}</h3>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={project.creatorImage || "/placeholder.svg"} alt={project.creator} />
                              <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{project.creator}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProjects.map((project) => (
                      <Card key={project.id} className="transition-shadow hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-48 h-32">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{project.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={project.creatorImage || "/placeholder.svg"} alt={project.creator} />
                                  <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{project.creator}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                              <div className="flex flex-wrap gap-1 mt-3">
                                {project.technologies.map((tech, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found matching your search criteria.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}
