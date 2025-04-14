"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dummy projects data
const dummyProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product listings, cart, checkout, and admin dashboard.",
    lastUpdated: "2 days ago",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    lastUpdated: "1 week ago",
    technologies: ["React", "Firebase", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    lastUpdated: "3 weeks ago",
    technologies: ["React", "TypeScript", "Weather API"],
  },
  {
    id: 4,
    title: "Social Media App",
    description: "A social networking application with real-time messaging, posts, and user profiles.",
    lastUpdated: "1 month ago",
    technologies: ["Next.js", "Socket.io", "PostgreSQL"],
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <Button asChild>
          <Link href="/create-profile">
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Your Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-background">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Last updated {project.lastUpdated}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/projects/${project.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/projects/${project.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
