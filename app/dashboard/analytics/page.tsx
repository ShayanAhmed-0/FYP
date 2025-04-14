"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
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
      </div>

      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile Views</TabsTrigger>
          <TabsTrigger value="projects">Project Views</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Profile Views</CardTitle>
                <LineChart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <div className="h-[200px] mt-4 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Project Views</CardTitle>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
                <div className="h-[200px] mt-4 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
                <PieChart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Direct</p>
                    <p className="text-sm font-medium">45%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Search</p>
                    <p className="text-sm font-medium">30%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Social</p>
                    <p className="text-sm font-medium">15%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Referral</p>
                    <p className="text-sm font-medium">10%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4 bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Views Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Profile Views Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Views Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Project Views Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Engagement Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
