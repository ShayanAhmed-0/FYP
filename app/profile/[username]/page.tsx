import Link from "next/link"
import { ArrowLeft, Github, Globe, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = {
    name: "Sarah Johnson",
    username: username,
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    bio: "Passionate frontend developer with 5+ years of experience building responsive and accessible web applications. Specialized in React, TypeScript, and modern CSS frameworks.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Jest",
      "Cypress",
      "Git",
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product listings, cart, checkout, and admin dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "/placeholder.svg?height=200&width=300&text=E-commerce",
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates and team features.",
        technologies: ["React", "Firebase", "Tailwind CSS"],
        image: "/placeholder.svg?height=200&width=300&text=Task+App",
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
        technologies: ["React", "TypeScript", "Weather API"],
        image: "/placeholder.svg?height=200&width=300&text=Weather+App",
      },
    ],
    experience: [
      {
        id: 1,
        company: "Tech Innovations Inc.",
        role: "Senior Frontend Developer",
        period: "2020 - Present",
        description:
          "Lead frontend development for multiple client projects, mentored junior developers, and implemented best practices.",
      },
      {
        id: 2,
        company: "Digital Solutions LLC",
        role: "Frontend Developer",
        period: "2018 - 2020",
        description:
          "Developed responsive web applications using React and collaborated with UX designers to implement user-friendly interfaces.",
      },
      {
        id: 3,
        company: "Web Creators Co.",
        role: "Junior Developer",
        period: "2016 - 2018",
        description: "Assisted in building and maintaining client websites, fixed bugs, and implemented new features.",
      },
    ],
    education: [
      {
        id: 1,
        institution: "University of California, Berkeley",
        degree: "B.S. Computer Science",
        period: "2012 - 2016",
      },
    ],
    social: {
      github: "https://github.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      website: "https://sarahjohnson.dev",
    },
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8 mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={`/placeholder.svg?height=128&width=128&text=${user.name.charAt(0)}`}
                      alt={user.name}
                      className="object-cover w-full h-full rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                  <p className="mt-1 font-medium">{user.title}</p>
                  <div className="flex items-center justify-center mt-2 gap-1.5">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{user.location}</span>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={user.social.github} target="_blank">
                        <Github className="w-4 h-4" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={user.social.linkedin} target="_blank">
                        <Linkedin className="w-4 h-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={user.social.twitter} target="_blank">
                        <Twitter className="w-4 h-4" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={user.social.website} target="_blank">
                        <Globe className="w-4 h-4" />
                        <span className="sr-only">Website</span>
                      </Link>
                    </Button>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2 mt-6">
                    <Button>Contact</Button>
                    <Button variant="outline">Resume</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">About</h2>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-background">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Contact</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">contact@{user.username}.dev</span>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {user.projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="object-cover w-full h-40"
                      />
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-background"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Demo
                          </Button>
                          <Button size="sm">Source Code</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {user.experience.map((exp) => (
                        <div key={exp.id} className="relative pl-6 border-l">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5"></div>
                          <h3 className="text-lg font-bold">{exp.role}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium">{exp.company}</span>
                            <span className="text-sm text-muted-foreground">• {exp.period}</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {user.education.map((edu) => (
                        <div key={edu.id} className="relative pl-6 border-l">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5"></div>
                          <h3 className="text-lg font-bold">{edu.degree}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium">{edu.institution}</span>
                            <span className="text-sm text-muted-foreground">• {edu.period}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

