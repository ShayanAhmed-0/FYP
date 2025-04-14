"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, Image, Server, Settings } from "lucide-react"
import { DatabaseConfig } from "@/components/database-config"

export default function SetupPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    {
      title: "Database Configuration",
      description: "Connect your NeonDB PostgreSQL database",
      icon: Database,
      component: <DatabaseConfig />,
    },
    {
      title: "Image Processing",
      description: "Configure image processing options",
      icon: Image,
      component: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For image processing, we recommend using Cloudinary for production environments. However, for development,
            we provide a client-side image processing solution.
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start">
              Use Client-Side Processing (Development)
            </Button>
            <Button variant="outline" className="justify-start">
              Configure Cloudinary (Production)
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Environment Variables",
      description: "Set up required environment variables",
      icon: Settings,
      component: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The following environment variables are required for the application to function properly.
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded-md">
              <span className="font-mono text-sm">DATABASE_URL</span>
              <span className="text-xs text-green-600">✓ Configured</span>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-md">
              <span className="font-mono text-sm">JWT_SECRET</span>
              <Button variant="outline" size="sm">
                Set Value
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Finalize Setup",
      description: "Complete the setup process",
      icon: Server,
      component: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your application is almost ready! Click the button below to finalize the setup.
          </p>
          <Button className="w-full">Complete Setup</Button>
        </div>
      ),
    },
  ]

  const handleCompleteStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }

    if (stepIndex < steps.length - 1) {
      setActiveStep(stepIndex + 1)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Portfolio AI Setup</h1>
        <p className="text-muted-foreground mb-8">
          Complete the following steps to set up your Portfolio AI application.
        </p>

        <div className="flex mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 relative ${index > 0 ? "ml-4" : ""}`}
              onClick={() => setActiveStep(index)}
            >
              <div
                className={`
                h-10 flex items-center justify-center rounded-full cursor-pointer
                ${
                  completedSteps.includes(index)
                    ? "bg-primary text-primary-foreground"
                    : index === activeStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }
              `}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                  absolute top-5 left-full w-4 h-0.5 -translate-y-1/2
                  ${completedSteps.includes(index) ? "bg-primary" : "bg-muted"}
                `}
                />
              )}
              <div className="mt-2 text-xs text-center">{step.title}</div>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[activeStep].title}</CardTitle>
            <CardDescription>{steps[activeStep].description}</CardDescription>
          </CardHeader>
          <CardContent>{steps[activeStep].component}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
              disabled={activeStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => handleCompleteStep(activeStep)}
              disabled={completedSteps.includes(activeStep) && activeStep < steps.length - 1}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
