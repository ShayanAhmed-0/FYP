"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, X } from "lucide-react"

export function PortfolioPreview({
  portfolioData,
  onClose,
  customizations,
}: {
  portfolioData: {
    name: string
    title: string
    bio: string
    skills: string[]
  }
  onClose: () => void
  customizations?: {
    theme: string
    code: {
      html: string
      css: string
      js: string
    }
  }
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  // Generate a simple HTML preview
  const generatePreviewHTML = () => {
    const { name, title, bio, skills } = portfolioData
    const theme = customizations?.theme || "dark"

    return `
      <!DOCTYPE html>
      <html class="${theme}">
      <head>
        <style>
          :root {
            --primary: ${theme === "dark" ? "#8b5cf6" : "#6d28d9"};
            --background: ${theme === "dark" ? "#1f1f23" : "#ffffff"};
            --foreground: ${theme === "dark" ? "#ffffff" : "#1f1f23"};
          }
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            background-color: var(--background);
            color: var(--foreground);
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .hero {
            text-align: center;
            padding: 4rem 2rem;
          }
          .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .hero p {
            font-size: 1.5rem;
            opacity: 0.8;
          }
          .section {
            margin: 4rem 0;
          }
          .section h2 {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
          .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .skill {
            background-color: var(--primary);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
          }
          ${customizations?.code?.css || ""}
        </style>
      </head>
      <body>
        <div class="container">
          <section class="hero">
            <h1>${name}</h1>
            <p>${title}</p>
          </section>
          
          <section class="section">
            <h2>About Me</h2>
            <p>${bio}</p>
          </section>
          
          <section class="section">
            <h2>Skills</h2>
            <div class="skills">
              ${skills.map((skill) => `<span class="skill">${skill}</span>`).join("")}
            </div>
          </section>
        </div>
        
        <script>
          // Simple animation
          document.addEventListener('DOMContentLoaded', () => {
            const hero = document.querySelector('.hero');
            hero.style.opacity = '0';
            setTimeout(() => {
              hero.style.transition = 'opacity 1s ease';
              hero.style.opacity = '1';
            }, 200);
          });
          ${customizations?.code?.js || ""}
        </script>
      </body>
      </html>
    `
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "desktop":
        return "100%"
      case "tablet":
        return "768px"
      case "mobile":
        return "375px"
      default:
        return "100%"
    }
  }

  return (
    <div className="p-4 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Portfolio Preview</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as "desktop" | "tablet" | "mobile")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="tablet">Tablet</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-md overflow-hidden bg-white h-[600px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Generating your portfolio preview...</p>
          </div>
        ) : (
          <div
            style={{
              width: getPreviewWidth(),
              height: "100%",
              margin: "0 auto",
              overflow: "auto",
            }}
          >
            <iframe
              srcDoc={generatePreviewHTML()}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Portfolio Preview"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onClose()}>
          Close
        </Button>
      </div>
    </div>
  )
}
