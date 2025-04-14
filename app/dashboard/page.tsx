"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Edit, Eye, FileText, Grid, Home, LogOut, MessageSquare, Plus, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarSearch } from "@/components/sidebar-search"

// Dummy data for projects
const dummyProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product listings, cart, checkout, and admin dashboard.",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
    lastUpdated: "3 weeks ago",
  },
]

// Dummy data for messages
const dummyMessages = [
  {
    id: 1,
    user: "Sarah Johnson",
    message: "Hi there! I'm interested in collaborating on a project. Would you be available for a quick chat?",
    time: "2h ago",
  },
  {
    id: 2,
    user: "Michael Chen",
    message: "I saw your portfolio and was impressed by your work. I have a potential job opportunity for you.",
    time: "1d ago",
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    message: "Thanks for sharing your code repository. I've made some suggestions in the pull request.",
    time: "3d ago",
  },
]

// Dummy data for activities
const dummyActivities = [
  { id: 1, icon: Eye, text: "Someone viewed your profile", time: "10 minutes ago" },
  { id: 2, icon: MessageSquare, text: "You received a new message", time: "1 hour ago" },
  { id: 3, icon: Edit, text: "You updated your project", time: "2 hours ago" },
  { id: 4, icon: User, text: "You updated your profile information", time: "1 day ago" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("projects")
  const [user, setUser] = useState<{ name: string; email: string; username: string } | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userData = localStorage.getItem("user")

    if (!isLoggedIn || !userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!isClient || !user) {
    return null // Don't render anything until we check auth status on client
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 p-4 border-r md:block">
        <div className="flex items-center gap-2 mb-6">
          <Link href={"/"}>
          <span className="text-xl font-bold">Portfolio AI</span>
          </Link>
        </div>

        {/* Add the search component to the sidebar */}
        <div className="mb-6">
          <SidebarSearch />
        </div>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
          >
            <Home className="w-4 h-4 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <User className="w-4 h-4 mr-3" />
            Profile
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Grid className="w-4 h-4 mr-3" />
            Projects
          </Link>
          <Link
            href="/dashboard/messages"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <MessageSquare className="w-4 h-4 mr-3" />
            Messages
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <BarChart3 className="w-4 h-4 mr-3" />
            Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-4">
          <Button
            variant="ghost"
            className="flex items-center w-full gap-2 justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/profile/${user.username}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/create-profile">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <div className="grid gap-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Project Views</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,678</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">3 unread messages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <User className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="w-full h-2 mt-1 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: "85%" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Projects</CardTitle>
                      <Button size="sm" asChild>
                        <Link href="/create-profile">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Link>
                      </Button>
                    </div>
                    <CardDescription>Manage and update your portfolio projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dummyProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                              <FileText className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">Last updated {project.lastUpdated}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/projects/${project.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/projects/${project.id}/edit`}>
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Manage your conversations with other users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dummyMessages.map((message) => (
                        <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{message.user}</h3>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent actions and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dummyActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <activity.icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm">{activity.text}</p>
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
