"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
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

  if (!isClient || !user) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
              <p className="mt-2">Full Stack Developer</p>
              <Button className="mt-4" asChild>
                <Link href="/create-profile">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Passionate developer with expertise in React, Next.js, and TypeScript. Looking for opportunities to
                collaborate on innovative projects.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Node.js", "Git"].map((skill) => (
                  <span key={skill} className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-background">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
