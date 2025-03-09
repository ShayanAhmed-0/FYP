"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchPage() {
  const [searchType, setSearchType] = useState("username")

  // Mock data for search results
  const developers = [
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

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8 mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Search Filters */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Filter className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Type</label>
                    <Tabs defaultValue={searchType} onValueChange={setSearchType} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="username">Username</TabsTrigger>
                        <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
                        <TabsTrigger value="location">Location</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Experience</SelectItem>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Availability</label>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Availability</SelectItem>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {searchType === "techstack" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Technologies</label>
                      <Select defaultValue="react">
                        <SelectTrigger>
                          <SelectValue placeholder="Select technology" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="angular">Angular</SelectItem>
                          <SelectItem value="vue">Vue</SelectItem>
                          <SelectItem value="node">Node.js</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {searchType === "location" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Distance</label>
                      <Select defaultValue="50">
                        <SelectTrigger>
                          <SelectValue placeholder="Select distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">Within 10 miles</SelectItem>
                          <SelectItem value="25">Within 25 miles</SelectItem>
                          <SelectItem value="50">Within 50 miles</SelectItem>
                          <SelectItem value="100">Within 100 miles</SelectItem>
                          <SelectItem value="remote">Remote only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder={`Search by ${searchType}...`} className="pl-8" />
                  </div>
                  <Button>Search</Button>
                </div>
              </CardContent>
            </Card>

            <div className="mb-4">
              <h2 className="text-xl font-bold">Search Results</h2>
              <p className="text-sm text-muted-foreground">Found {developers.length} developers</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {developers.map((dev) => (
                <Link href={`/profile/${dev.username}`} key={dev.id}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
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
                          <div className="flex items-center mt-1 gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{dev.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {dev.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs font-medium rounded-full border bg-background"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

