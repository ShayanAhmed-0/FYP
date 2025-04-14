"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function SetupDatabasePage() {
  const [connectionString, setConnectionString] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSetupDatabase = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/setup-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ connectionString }),
      })

      const data = await response.json()
      setResult({
        success: response.ok,
        message: data.message || (response.ok ? "Database setup successful!" : "Database setup failed"),
      })
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while setting up the database",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Database Setup</CardTitle>
          <CardDescription>Configure your NeonDB PostgreSQL database connection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="connectionString">Connection String</Label>
            <Input
              id="connectionString"
              placeholder="postgres://username:password@hostname:port/database"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              type="password"
            />
            <p className="text-xs text-muted-foreground">You can find your connection string in the NeonDB dashboard</p>
          </div>

          {result && (
            <div
              className={`p-3 rounded-md flex items-center gap-2 ${
                result.success
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {result.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{result.message}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSetupDatabase} disabled={isLoading || !connectionString}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Setting Up Database...
              </>
            ) : (
              "Setup Database"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
