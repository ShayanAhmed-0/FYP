"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, User, Loader2, Trash2, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { processImage } from "../utils/client-image-processor"
import { useTheme } from "next-themes"
import { LocationPicker } from "@/components/location-picker"

// Define types for our data
type Project = {
  title: string
  description: string
  link?: string
  github?: string
}

type WorkExperience = {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

type Education = {
  institution: string
  degree: string
  startDate: string
  endDate: string
}

type Social = {
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
}

// Mock data for templates
const mockTemplates = [
  {
    id: 1,
    name: "Modern Minimalist",
    description: "Clean, minimal design with focus on content and readability",
    colorScheme: "Monochromatic with accent colors",
    layout: "Header, Skills, Projects, Experience, Contact",
    features: ["Animated skill bars", "Project gallery", "Testimonials section"],
    previewImage: "/placeholder.svg?height=160&width=300&text=Template+1",
  },
  {
    id: 2,
    name: "Creative Bold",
    description: "Vibrant and eye-catching design for creative professionals",
    colorScheme: "Bold complementary colors",
    layout: "Hero banner, Work showcase, Skills, About me, Contact",
    features: ["Interactive project showcase", "Animated transitions", "Custom cursor"],
    previewImage: "/placeholder.svg?height=160&width=300&text=Template+2",
  },
  {
    id: 3,
    name: "Professional Corporate",
    description: "Sophisticated and professional design for corporate environments",
    colorScheme: "Subtle blues and grays",
    layout: "About, Experience, Skills, Education, Projects, Contact",
    features: ["Timeline for experience", "Downloadable resume", "Testimonials carousel"],
    previewImage: "/placeholder.svg?height=160&width=300&text=Template+3",
  },
]

export default function CreateProfilePage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [step, setStep] = useState(1)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiGenerated, setAiGenerated] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [generationMode, setGenerationMode] = useState<"template" | "ai">("template")
  const [templates, setTemplates] = useState<typeof mockTemplates>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [experience, setExperience] = useState("3-5")
  const [availability, setAvailability] = useState("fulltime")
  const [remote, setRemote] = useState("hybrid")
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "",
      description: "",
      link: "",
      github: "",
    },
  ])
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ])
  const [education, setEducation] = useState<Education[]>([
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ])
  const [social, setSocial] = useState<Social>({
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    email: "",
  })

  // State for customization dialogs
  const [activeDialog, setActiveDialog] = useState<string | null>(null)

  // State for AI portfolio generation
  const [aiPortfolioGenerating, setAiPortfolioGenerating] = useState(false)
  const [aiPortfolioGenerated, setAiPortfolioGenerated] = useState(false)
  const [aiPortfolioOptions, setAiPortfolioOptions] = useState<
    {
      id: number
      name: string
      description: string
      previewImage: string
    }[]
  >([])
  const [selectedAiOption, setSelectedAiOption] = useState<number | null>(null)

  const totalSteps = 5

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [imageProcessingType, setImageProcessingType] = useState<"original" | "vectorize" | "cartoonize">("original")
  const [isProcessingImage, setIsProcessingImage] = useState(false)

  // State for template customization
  const [templateCustomizations, setTemplateCustomizations] = useState<{
    [templateId: number]: {
      theme: string
      code: {
        html: string
        css: string
        js: string
      }
    }
  }>({})

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show loading state
    setIsProcessingImage(true)

    try {
      // Always store the original image
      const reader = new FileReader()
      reader.onload = async (e) => {
        const originalDataUrl = e.target?.result as string
        setOriginalImage(originalDataUrl)

        // Process the image based on the selected type
        if (imageProcessingType !== "original") {
          const processedImageUrl = await processImage(file, imageProcessingType)
          setProfileImage(processedImageUrl)
        } else {
          setProfileImage(originalDataUrl)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      setIsProcessingImage(false)
    }
  }

  // Handle image processing type change
  useEffect(() => {
    const processExistingImage = async () => {
      if (!originalImage) return

      setIsProcessingImage(true)
      try {
        // Convert data URL to File object
        const response = await fetch(originalImage)
        const blob = await response.blob()
        const file = new File([blob], "profile-image.jpg", { type: blob.type })

        if (imageProcessingType !== "original") {
          const processedImageUrl = await processImage(file, imageProcessingType)
          setProfileImage(processedImageUrl)
        } else {
          setProfileImage(originalImage)
        }
      } catch (error) {
        console.error("Error processing image:", error)
      } finally {
        setIsProcessingImage(false)
      }
    }

    if (originalImage) {
      processExistingImage()
    }
  }, [imageProcessingType, originalImage])

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  // Fixed function to add a new project
  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        link: "",
        github: "",
      },
    ])
  }

  // Fixed function to add a new work experience
  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  // Fixed function to add a new education
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  // Function to update a project
  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setProjects(updatedProjects)
  }

  // Function to update a work experience
  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const updatedExperience = [...workExperience]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setWorkExperience(updatedExperience)
  }

  const handleGenerateAI = async () => {
    setAiGenerating(true)

    try {
      // In a real app, this would call an API
      // For this demo, we'll just use mock data
      setTimeout(() => {
        setTemplates(mockTemplates)
        setAiGenerated(true)
        setSelectedTemplate(mockTemplates[0].id)

        // Initialize template customizations
        const initialCustomizations: { [key: number]: any } = {}
        mockTemplates.forEach((template) => {
          initialCustomizations[template.id] = {
            theme: "dark",
            code: {
              html: `<div class="portfolio-container">
  <header>
    <h1>${firstName} ${lastName}</h1>
    <p>${title}</p>
  </header>
  <section class="bio">
    <p>${bio}</p>
  </section>
  <section class="skills">
    <h2>Skills</h2>
    <ul>
      ${skills.map((skill) => `<li>${skill}</li>`).join("")}
    </ul>
  </section>
</div>`,
              css: `.portfolio-container {
  font-family: sans-serif;
  padding: 20px;
  background-color: #222;
  color: #fff;
}

header {
  text-align: center;
}

.skills ul {
  list-style: none;
  padding: 0;
}

.skills li {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  }`,
              js: `console.log("Portfolio generated for ${firstName} ${lastName}");`,
            },
          }
        })
        setTemplateCustomizations(initialCustomizations)
        setAiGenerating(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating portfolio:", error)
      setAiGenerating(false)
    }
  }

  // Only generate AI portfolio when user clicks on AI tab
  const handleSwitchToAiMode = () => {
    setGenerationMode("ai")
    if (!aiPortfolioGenerated && !aiPortfolioGenerating) {
      handleGenerateAiPortfolio()
    }
  }

  const handleGenerateAiPortfolio = async () => {
    setAiPortfolioGenerating(true)

    try {
      // In a real app, this would call an API
      // For this demo, we'll just use mock data
      setTimeout(() => {
        const options = [
          {
            id: 101,
            name: "Modern Developer",
            description: "Clean, code-focused design with syntax highlighting and modern aesthetics",
            previewImage: "/placeholder.svg?height=160&width=300&text=Modern+Developer",
          },
          {
            id: 102,
            name: "Creative Showcase",
            description: "Bold, interactive design with animations and visual project displays",
            previewImage: "/placeholder.svg?height=160&width=300&text=Creative+Showcase",
          },
          {
            id: 103,
            name: "Professional Portfolio",
            description: "Elegant, business-focused layout emphasizing experience and achievements",
            previewImage: "/placeholder.svg?height=160&width=300&text=Professional+Portfolio",
          },
        ]

        setAiPortfolioOptions(options)
        setSelectedAiOption(options[0].id)
        setAiPortfolioGenerated(true)

        // Initialize AI option customizations
        const initialCustomizations: { [key: number]: any } = {}
        options.forEach((option) => {
          initialCustomizations[option.id] = {
            theme: "dark",
            code: {
              html: `<div class="portfolio-container">
  <header>
    <h1>${firstName} ${lastName}</h1>
    <p>${title}</p>
  </header>
  <section class="bio">
    <p>${bio}</p>
  </section>
  <section class="skills">
    <h2>Skills</h2>
    <ul>
      ${skills.map((skill) => `<li>${skill}</li>`).join("")}
    </ul>
  </section>
</div>`,
              css: `.portfolio-container {
  font-family: sans-serif;
  padding: 20px;
  background-color: #222;
  color: #fff;
}

header {
  text-align: center;
}

.skills ul {
  list-style: none;
  padding: 0;
}

.skills li {
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}`,
              js: `console.log("AI Portfolio generated for ${firstName} ${lastName}");`,
            },
          }
        })

        // Merge with existing customizations
        setTemplateCustomizations({
          ...templateCustomizations,
          ...initialCustomizations,
        })

        setAiPortfolioGenerating(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating AI portfolio:", error)
      setAiPortfolioGenerating(false)
    }
  }

  const handleFinish = async () => {
    // if (generationMode === "template" && !selectedTemplate) {
    //   // Handle case where no template is selected
    //   return
    // }

    // if (generationMode === "ai" && !selectedAiOption) {
    //   // Handle case where no AI option is selected
    //   return
    // }

    try {
      // Get the selected template ID
      // const templateId = generationMode === "ai" ? selectedAiOption || 101 : selectedTemplate || 1

      // In a real app, this would call an API
      // For this demo, we'll just redirect to a success page
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing profile:", error)
    }
  }

  const openDialog = (dialogType: string) => {
    setActiveDialog(dialogType)
  }

  const closeDialog = () => {
    setActiveDialog(null)
  }

  // Update template customizations when code is edited
  const handleCodeUpdate = (templateId: number, code: { html: string; css: string; js: string }) => {
    setTemplateCustomizations((prev) => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        code,
      },
    }))
  }

  // Update template theme
  const handleThemeUpdate = (templateId: number, newTheme: string) => {
    setTemplateCustomizations((prev) => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        theme: newTheme,
      },
    }))
  }

  // Reset AI portfolio options when switching to template mode
  useEffect(() => {
    if (generationMode === "template") {
      setAiPortfolioGenerated(false)
      setSelectedAiOption(null)
    }
  }, [generationMode])

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/signup" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Signup
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-sm">Theme:</span>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
            <CardDescription>
              Complete your profile to showcase your skills and get discovered by employers and collaborators
            </CardDescription>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {step} of {totalSteps}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="relative w-24 h-24 mb-4 bg-muted rounded-full flex items-center justify-center overflow-hidden border-2 border-muted">
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-muted-foreground" />
                    )}
                    {isProcessingImage && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2 w-full max-w-xs">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => document.getElementById("profile-upload")?.click()}
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Upload Photo
                      </Button>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {profileImage && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setProfileImage(null)
                            setOriginalImage(null)
                          }}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    {/* @ts-ignore */}
                    <Select value={imageProcessingType} onValueChange={setImageProcessingType}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Image Style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Original Photo</SelectItem>
                        <SelectItem value="vectorize">Vectorized (SVG)</SelectItem>
                        <SelectItem value="cartoonize">Cartoon Style</SelectItem>
                      </SelectContent>
                    </Select>
                    {imageProcessingType !== "original" && (
                      <p className="text-xs text-muted-foreground">
                        Your photo will be{" "}
                        {imageProcessingType === "vectorize" ? "converted to vector graphics" : "stylized as a cartoon"}{" "}
                        for a unique look.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Full Stack Developer, UX Designer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <LocationPicker
                    initialLocation={location}
                    onLocationChange={(selectedLocation) => {
                      console.log("Location selected:", selectedLocation)
                      setLocation(selectedLocation.address)
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself, your experience, and what you're looking for"
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be displayed at the top of your profile. Keep it concise and engaging.
                  </p>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleNext}>Next Step</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Skills & Expertise</h3>

                <div className="space-y-2">
                  <Label htmlFor="skills">Add Your Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      placeholder="e.g. JavaScript, React, UI Design"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddSkill()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Add Skill
                    </Button>
                  </div>
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Button key={skill} variant="secondary" size="sm" onClick={() => handleRemoveSkill(skill)}>
                        {skill}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous Step
                  </Button>
                  <Button onClick={handleNext}>Next Step</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Work Experience</h3>

                {workExperience.map((experienceItem, index) => (
                  <div key={index} className="space-y-2 border p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          type="text"
                          id={`company-${index}`}
                          placeholder="e.g. Google"
                          value={experienceItem.company}
                          onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${index}`}>Position</Label>
                        <Input
                          type="text"
                          id={`position-${index}`}
                          placeholder="e.g. Software Engineer"
                          value={experienceItem.position}
                          onChange={(e) => updateWorkExperience(index, "position", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                        <Input
                          type="date"
                          id={`startDate-${index}`}
                          value={experienceItem.startDate}
                          onChange={(e) => updateWorkExperience(index, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                        <Input
                          type="date"
                          id={`endDate-${index}`}
                          value={experienceItem.endDate}
                          onChange={(e) => updateWorkExperience(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Textarea
                        id={`description-${index}`}
                        placeholder="Describe your role and responsibilities"
                        rows={3}
                        value={experienceItem.description}
                        onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <Button type="button" onClick={handleAddWorkExperience}>
                  Add Work Experience
                </Button>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous Step
                  </Button>
                  <Button onClick={handleNext}>Next Step</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Education</h3>

                {education.map((educationItem, index) => (
                  <div key={index} className="space-y-2 border p-4 rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
                      <Input
                        type="text"
                        id={`institution-${index}`}
                        placeholder="e.g. University of Example"
                        value={educationItem.institution}
                        onChange={(e) => {
                          const updatedEducation = [...education]
                          updatedEducation[index] = { ...updatedEducation[index], institution: e.target.value }
                          setEducation(updatedEducation)
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        type="text"
                        id={`degree-${index}`}
                        placeholder="e.g. Bachelor of Science in Computer Science"
                        value={educationItem.degree}
                        onChange={(e) => {
                          const updatedEducation = [...education]
                          updatedEducation[index] = { ...updatedEducation[index], degree: e.target.value }
                          setEducation(updatedEducation)
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                        <Input
                          type="date"
                          id={`startDate-${index}`}
                          value={educationItem.startDate}
                          onChange={(e) => {
                            const updatedEducation = [...education]
                            updatedEducation[index] = { ...updatedEducation[index], startDate: e.target.value }
                            setEducation(updatedEducation)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                        <Input
                          type="date"
                          id={`endDate-${index}`}
                          value={educationItem.endDate}
                          onChange={(e) => {
                            const updatedEducation = [...education]
                            updatedEducation[index] = { ...updatedEducation[index], endDate: e.target.value }
                            setEducation(updatedEducation)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" onClick={handleAddEducation}>
                  Add Education
                </Button>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous Step
                  </Button>
                  <Button onClick={handleNext}>Next Step</Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choose a Template</h3>

                <div className="mb-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={generationMode === "template" ? "default" : "outline"}
                      onClick={() => setGenerationMode("template")}
                    >
                      Use a Template
                    </Button>
                    <Button
                      variant={generationMode === "ai" ? "default" : "outline"}
                      onClick={handleSwitchToAiMode}
                      disabled={aiPortfolioGenerating}
                    >
                      {aiPortfolioGenerating ? (
                        <>
                          Generating...
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Generate with AI"
                      )}
                    </Button>
                  </div>
                  {generationMode === "ai" && !aiPortfolioGenerated && !aiPortfolioGenerating && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Click "Generate with AI" to see AI-powered options.
                    </p>
                  )}
                </div>

                {generationMode === "template" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={selectedTemplate === template.id ? "border-2 border-primary" : ""}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardHeader>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <img
                            src={template.previewImage || "/placeholder.svg"}
                            alt={template.name}
                            className="rounded-md mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Color Scheme: {template.colorScheme}</p>
                          <p className="text-sm text-muted-foreground">Layout: {template.layout}</p>
                        </CardContent>
                      </Card>
                    ))}

                    {!aiGenerated && (
                      <div className="col-span-full text-center">
                        <Button variant="secondary" onClick={handleGenerateAI} disabled={aiGenerating}>
                          {aiGenerating ? (
                            <>
                              Generating Templates...
                              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            "Generate Templates"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {generationMode === "ai" && aiPortfolioGenerated && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiPortfolioOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={selectedAiOption === option.id ? "border-2 border-primary" : ""}
                        onClick={() => setSelectedAiOption(option.id)}
                      >
                        <CardHeader>
                          <CardTitle>{option.name}</CardTitle>
                          <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <img
                            src={option.previewImage || "/placeholder.svg"}
                            alt={option.name}
                            className="rounded-md mb-2"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous Step
                  </Button>
                  <Button onClick={handleFinish} disabled={aiPortfolioGenerating}>
                    {aiPortfolioGenerating ? (
                      <>
                        Finishing...
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
