"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, AlertCircle, Database } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DatabaseConfig() {
  const [connectionString, setConnectionString] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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

      if (response.ok) {
        // Close the dialog after a successful setup
        setTimeout(() => {
          setIsOpen(false)
        }, 2000)
      }
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Database className="w-4 h-4" />
          Configure Database
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Database Configuration</DialogTitle>
          <DialogDescription>Connect your NeonDB PostgreSQL database to the application</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="connectionString">NeonDB Connection String</Label>
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
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSetupDatabase} disabled={isLoading || !connectionString}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Database"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
