"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Code,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Twitter,
  Upload,
  User,
  Plus,
  Palette,
  Layout,
  FileCode,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { PageEditor } from "@/components/page-editor"
import { CodeEditor } from "@/components/code-editor"
import { DomainSettings } from "@/components/domain-settings"
import { generatePortfolioTemplates, type ProfileData, type PortfolioTemplate } from "../actions/generate-portfolio"
import { savePortfolioTemplate } from "../actions/save-portfolio"

export default function CreateProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiGenerated, setAiGenerated] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [generationMode, setGenerationMode] = useState<"template" | "ai">("template")
  const [templates, setTemplates] = useState<PortfolioTemplate[]>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [experience, setExperience] = useState("3-5")
  const [availability, setAvailability] = useState("fulltime")
  const [remote, setRemote] = useState("hybrid")
  const [projects, setProjects] = useState<ProfileData["projects"]>([
    {
      title: "",
      description: "",
      link: "",
      github: "",
    },
  ])
  const [workExperience, setWorkExperience] = useState<ProfileData["workExperience"]>([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ])
  const [education, setEducation] = useState<ProfileData["education"]>([
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    },
  ])
  const [social, setSocial] = useState<ProfileData["social"]>({
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

  const handleGenerateAI = async () => {
    setAiGenerating(true)

    try {
      // Collect all profile data
      const profileData: ProfileData = {
        firstName,
        lastName,
        title,
        location,
        bio,
        skills,
        experience,
        availability,
        remote,
        projects,
        workExperience,
        education,
        social,
      }

      // Call the server action to generate portfolio templates
      const generatedTemplates = await generatePortfolioTemplates(profileData)

      setTemplates(generatedTemplates)
      setAiGenerated(true)
      setSelectedTemplate(generatedTemplates[0].id)
    } catch (error) {
      console.error("Error generating portfolio:", error)
      // Handle error state
    } finally {
      setAiGenerating(false)
    }
  }

  const handleGenerateAiPortfolio = async () => {
    setAiPortfolioGenerating(true)

    try {
      // Simulate AI portfolio generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate sample AI portfolio options
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
    } catch (error) {
      console.error("Error generating AI portfolio:", error)
    } finally {
      setAiPortfolioGenerating(false)
    }
  }

  const handleFinish = async () => {
    if (generationMode === "template" && !selectedTemplate) {
      // Handle case where no template is selected
      return
    }

    if (generationMode === "ai" && !selectedAiOption) {
      // Handle case where no AI option is selected
      return
    }

    try {
      // Save the selected template or AI-generated portfolio
      const templateId = generationMode === "ai" ? selectedAiOption || 101 : selectedTemplate || 1
      const result = await savePortfolioTemplate("johndoe", templateId, generationMode === "ai")

      if (result.success) {
        // Redirect to the generated portfolio
        if(result.portfolioUrl)
        router.push(result.portfolioUrl)
      } else {
        // Handle error
        console.error(result.message)
      }
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
        <Link href="/signup" className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Signup
        </Link>

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
                    <User className="w-12 h-12 text-muted-foreground" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Upload className="w-3 h-3 mr-1" />
                    Upload Photo
                  </Button>
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
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="City, Country"
                      className="pl-8"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
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
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Press Enter or click Add to add multiple skills</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                      <button
                        className="ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet</p>}
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select defaultValue={experience} onValueChange={(value) => setExperience(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select defaultValue={availability} onValueChange={(value) => setAvailability(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="notavailable">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remote">Remote Preference</Label>
                  <Select defaultValue={remote} onValueChange={(value) => setRemote(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select remote preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote Only</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Projects & Experience</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Project #1</h4>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Add Image
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project1Title">Project Title</Label>
                    <Input
                      id="project1Title"
                      placeholder="e.g. E-commerce Website"
                      value={projects[0]?.title || ""}
                      onChange={(e) => {
                        const updatedProjects = [...projects]
                        updatedProjects[0] = { ...updatedProjects[0], title: e.target.value }
                        setProjects(updatedProjects)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project1Description">Description</Label>
                    <Textarea
                      id="project1Description"
                      placeholder="Describe your project, your role, and the technologies used"
                      rows={3}
                      value={projects[0]?.description || ""}
                      onChange={(e) => {
                        const updatedProjects = [...projects]
                        updatedProjects[0] = { ...updatedProjects[0], description: e.target.value }
                        setProjects(updatedProjects)
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project1Link">Project Link</Label>
                      <div className="relative">
                        <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="project1Link"
                          placeholder="https://..."
                          className="pl-8"
                          value={projects[0]?.link || ""}
                          onChange={(e) => {
                            const updatedProjects = [...projects]
                            updatedProjects[0] = { ...updatedProjects[0], link: e.target.value }
                            setProjects(updatedProjects)
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project1Github">GitHub Repository</Label>
                      <div className="relative">
                        <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="project1Github"
                          placeholder="https://github.com/..."
                          className="pl-8"
                          value={projects[0]?.github || ""}
                          onChange={(e) => {
                            const updatedProjects = [...projects]
                            updatedProjects[0] = { ...updatedProjects[0], github: e.target.value }
                            setProjects(updatedProjects)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setProjects([...projects, { title: "", description: "", link: "", github: "" }])
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Project
                  </Button>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium mb-4">Work Experience</h4>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="e.g. Acme Inc."
                        value={workExperience[0]?.company || ""}
                        onChange={(e) => {
                          const updatedExperience = [...workExperience]
                          updatedExperience[0] = { ...updatedExperience[0], company: e.target.value }
                          setWorkExperience(updatedExperience)
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        placeholder="e.g. Senior Developer"
                        value={workExperience[0]?.position || ""}
                        onChange={(e) => {
                          const updatedExperience = [...workExperience]
                          updatedExperience[0] = { ...updatedExperience[0], position: e.target.value }
                          setWorkExperience(updatedExperience)
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="month"
                          value={workExperience[0]?.startDate || ""}
                          onChange={(e) => {
                            const updatedExperience = [...workExperience]
                            updatedExperience[0] = { ...updatedExperience[0], startDate: e.target.value }
                            setWorkExperience(updatedExperience)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="month"
                          value={workExperience[0]?.endDate || ""}
                          onChange={(e) => {
                            const updatedExperience = [...workExperience]
                            updatedExperience[0] = { ...updatedExperience[0], endDate: e.target.value }
                            setWorkExperience(updatedExperience)
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Description</Label>
                      <Textarea
                        id="jobDescription"
                        placeholder="Describe your responsibilities and achievements"
                        rows={3}
                        value={workExperience[0]?.description || ""}
                        onChange={(e) => {
                          const updatedExperience = [...workExperience]
                          updatedExperience[0] = { ...updatedExperience[0], description: e.target.value }
                          setWorkExperience(updatedExperience)
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => {
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
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Experience
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Education & Social Links</h3>

                <div className="space-y-4 mb-6">
                  <h4 className="font-medium">Education</h4>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      placeholder="e.g. University of California"
                      value={education[0]?.institution || ""}
                      onChange={(e) => {
                        const updatedEducation = [...education]
                        updatedEducation[0] = { ...updatedEducation[0], institution: e.target.value }
                        setEducation(updatedEducation)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      placeholder="e.g. Bachelor of Science in Computer Science"
                      value={education[0]?.degree || ""}
                      onChange={(e) => {
                        const updatedEducation = [...education]
                        updatedEducation[0] = { ...updatedEducation[0], degree: e.target.value }
                        setEducation(updatedEducation)
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eduStartDate">Start Date</Label>
                      <Input
                        id="eduStartDate"
                        type="month"
                        value={education[0]?.startDate || ""}
                        onChange={(e) => {
                          const updatedEducation = [...education]
                          updatedEducation[0] = { ...updatedEducation[0], startDate: e.target.value }
                          setEducation(updatedEducation)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eduEndDate">End Date</Label>
                      <Input
                        id="eduEndDate"
                        type="month"
                        value={education[0]?.endDate || ""}
                        onChange={(e) => {
                          const updatedEducation = [...education]
                          updatedEducation[0] = { ...updatedEducation[0], endDate: e.target.value }
                          setEducation(updatedEducation)
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEducation([
                      ...education,
                      {
                        institution: "",
                        degree: "",
                        startDate: "",
                        endDate: "",
                      },
                    ])
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Education
                </Button>

                <div className="border-t pt-6 mt-6">
                  <h4 className="font-medium mb-4">Social Links</h4>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          placeholder="https://..."
                          className="pl-8"
                          value={social.website || ""}
                          onChange={(e) => setSocial({ ...social, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <div className="relative">
                        <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="github"
                          placeholder="https://github.com/..."
                          className="pl-8"
                          value={social.github || ""}
                          onChange={(e) => setSocial({ ...social, github: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/..."
                          className="pl-8"
                          value={social.linkedin || ""}
                          onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="relative">
                        <Twitter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="twitter"
                          placeholder="https://twitter.com/..."
                          className="pl-8"
                          value={social.twitter || ""}
                          onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="public@example.com"
                          className="pl-8"
                          value={social.email || ""}
                          onChange={(e) => setSocial({ ...social, email: e.target.value })}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">This email will be visible on your public profile</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">AI-Generated Portfolio</h3>
                <p className="text-muted-foreground">
                  Let our AI create a unique portfolio design based on your profile information. You can customize it
                  later.
                </p>

                {!aiGenerated ? (
                  <div className="border rounded-lg p-6 text-center space-y-4 bg-muted/30">
                    <Sparkles className="w-12 h-12 mx-auto text-primary" />
                    <h4 className="text-lg font-medium">Generate Your Unique Portfolio</h4>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Our AI will analyze your skills, projects, and experience to create a personalized portfolio
                      design that highlights your strengths.
                    </p>
                    <Button onClick={handleGenerateAI} disabled={aiGenerating} className="mt-2">
                      {aiGenerating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Portfolio Options
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Portfolio designs generated successfully!</span>
                    </div>

                    <div className="flex border rounded-md overflow-hidden mb-4">
                      <button
                        className={`flex-1 py-2 px-4 text-sm font-medium ${
                          generationMode === "template"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        onClick={() => setGenerationMode("template")}
                      >
                        Template-Based
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 text-sm font-medium ${
                          generationMode === "ai" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                        }`}
                        onClick={() => setGenerationMode("ai")}
                      >
                        AI-Powered
                      </button>
                    </div>

                    {generationMode === "template" ? (
                      <>
                        <h4 className="font-medium">Choose a Template</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {templates.map((template) => (
                            <div
                              key={template.id}
                              className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                                selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedTemplate(template.id)}
                            >
                              <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 relative">
                                <img
                                  src={
                                    template.previewImage ||
                                    `/placeholder.svg?height=160&width=300&text=${encodeURIComponent(template.name)}`
                                  }
                                  alt={template.name}
                                  className="w-full h-full object-cover"
                                />
                                {selectedTemplate === template.id && (
                                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                    <Check className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                              <div className="p-3">
                                <h5 className="font-medium text-sm">{template.name}</h5>
                                <p className="text-xs text-muted-foreground">{template.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-medium">AI-Powered Portfolio Generation</h4>
                        <p className="text-sm text-muted-foreground">
                          Our advanced AI will create a completely unique portfolio design tailored specifically to your
                          profile, skills, and projects.
                        </p>

                        {!aiPortfolioGenerated ? (
                          <div className="border rounded-lg p-4 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h5 className="font-medium">Enhanced AI Generation</h5>
                                <p className="text-xs text-muted-foreground">
                                  Creates a unique design based on your specific skills and experience
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="border rounded-md p-3 flex flex-col items-center text-center">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                                  <Code className="w-4 h-4 text-primary" />
                                </div>
                                <h6 className="text-sm font-medium">Custom Code</h6>
                                <p className="text-xs text-muted-foreground">Generates unique HTML, CSS, and JS</p>
                              </div>
                              <div className="border rounded-md p-3 flex flex-col items-center text-center">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                                  <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <h6 className="text-sm font-medium">Unique Design</h6>
                                <p className="text-xs text-muted-foreground">Not based on templates</p>
                              </div>
                            </div>

                            <Button
                              className="w-full"
                              onClick={handleGenerateAiPortfolio}
                              disabled={aiPortfolioGenerating}
                            >
                              {aiPortfolioGenerating ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Generating AI Portfolio...
                                </>
                              ) : (
                                "Generate AI Portfolio"
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                              <CheckCircle2 className="w-5 h-5" />
                              <span className="font-medium">AI portfolio options generated!</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {aiPortfolioOptions.map((option) => (
                                <div
                                  key={option.id}
                                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                                    selectedAiOption === option.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                                  }`}
                                  onClick={() => setSelectedAiOption(option.id)}
                                >
                                  <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 relative">
                                    <img
                                      src={option.previewImage || "/placeholder.svg"}
                                      alt={option.name}
                                      className="w-full h-full object-cover"
                                    />
                                    {selectedAiOption === option.id && (
                                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                        <Check className="w-4 h-4" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-3">
                                    <h5 className="font-medium text-sm">{option.name}</h5>
                                    <p className="text-xs text-muted-foreground">{option.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button variant="outline" size="sm" onClick={() => openDialog("theme")}>
                                <Palette className="w-4 h-4 mr-2" />
                                Customize Theme
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openDialog("pages")}>
                                <Layout className="w-4 h-4 mr-2" />
                                Edit Pages
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openDialog("code")}>
                                <FileCode className="w-4 h-4 mr-2" />
                                Edit Code
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {step < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleFinish}>
                Complete Profile
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Customization Dialogs */}
      <Dialog open={activeDialog !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-[600px]">
          {activeDialog === "theme" && <ThemeCustomizer onClose={closeDialog} />}
          {activeDialog === "pages" && <PageEditor onClose={closeDialog} />}
          {activeDialog === "code" && <CodeEditor onClose={closeDialog} />}
          {activeDialog === "domain" && <DomainSettings onClose={closeDialog} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

