"use client"

import { useState } from "react"
import { Check, ExternalLink, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function DomainSettings({ onClose }: { onClose: () => void }) {
  const [domainType, setDomainType] = useState<"subdomain" | "custom">("subdomain")
  const [subdomain, setSubdomain] = useState("johndoe")
  const [customDomain, setCustomDomain] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const handleVerifyDomain = () => {
    setIsVerifying(true)
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 2000)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Domain Settings</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <RadioGroup value={domainType} onValueChange={(value:any) => setDomainType(value as "subdomain" | "custom")}>
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="subdomain" id="subdomain" />
          <div className="grid gap-1.5">
            <Label htmlFor="subdomain" className="font-medium">
              Use a Subdomain (Free)
            </Label>
            <p className="text-sm text-muted-foreground">Get a free subdomain on our platform</p>
          </div>
        </div>
        <div className="flex items-start space-x-2 mt-2">
          <RadioGroupItem value="custom" id="custom" />
          <div className="grid gap-1.5">
            <Label htmlFor="custom" className="font-medium">
              Use a Custom Domain
            </Label>
            <p className="text-sm text-muted-foreground">Connect your own domain name to your portfolio</p>
          </div>
        </div>
      </RadioGroup>

      {domainType === "subdomain" ? (
        <div className="space-y-2">
          <Label htmlFor="subdomain">Subdomain</Label>
          <div className="flex">
            <Input
              id="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              className="rounded-r-none"
            />
            <div className="flex items-center px-3 border border-l-0 rounded-r-md bg-muted">.portfolioai.com</div>
          </div>
          <p className="text-xs text-muted-foreground">
            Your portfolio will be available at <span className="font-medium">{subdomain}.portfolioai.com</span>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customDomain">Custom Domain</Label>
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                <Lock className="w-4 h-4 mr-1" />
                https://
              </div>
              <Input
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourdomain.com"
                className="rounded-l-none"
              />
            </div>
          </div>

          <div className="space-y-2 border rounded-md p-3 bg-muted/50">
            <h4 className="font-medium">DNS Configuration</h4>
            <p className="text-sm">Add the following DNS records to your domain provider:</p>
            <div className="bg-secondary/50 p-2 rounded-md text-xs font-mono">
              <div>Type: CNAME</div>
              <div>Name: @</div>
              <div>Value: cname.portfolioai.com</div>
              <div>TTL: 3600</div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button onClick={handleVerifyDomain} disabled={!customDomain || isVerifying || isVerified}>
                {isVerifying ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Verifying...
                  </>
                ) : isVerified ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Verified
                  </>
                ) : (
                  "Verify Domain"
                )}
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t">
        <Button className="w-full">Save Domain Settings</Button>
      </div>
    </div>
  )
}
