import Link from "next/link"
import { ArrowLeft, Code, Download, Edit, Github, Globe, Linkedin, Mail, MapPin, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
// import type { PortfolioTemplate } from "@/app/actions/generate-portfolio"

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = {
    name: "John Doe",
    username: username,
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    bio: "Passionate developer with expertise in React, Node.js, and cloud technologies. I love building scalable applications and solving complex problems.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Git",
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product listings, cart, checkout, and admin dashboard.",
        image: "/placeholder.svg?height=200&width=300&text=E-commerce",
      },
      {
        id: 2,
        title: "Social Media App",
        description: "A social networking application with real-time messaging, posts, and user profiles.",
        image: "/placeholder.svg?height=200&width=300&text=Social+App",
      },
      {
        id: 3,
        title: "Task Management Tool",
        description: "A collaborative task management tool with team features and progress tracking.",
        image: "/placeholder.svg?height=200&width=300&text=Task+App",
      },
    ],
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      website: "https://johndoe.dev",
    },
  }

  // In a real app, this would be fetched from a database
  // const template: PortfolioTemplate = {
  //   id: 1,
  //   name: "Modern Minimalist",
  //   description: "Clean, minimal design with focus on content and readability",
  //   colorScheme: "Monochromatic with accent colors",
  //   layout: "Header, Skills, Projects, Experience, Contact",
  //   features: ["Animated skill bars", "Project gallery", "Testimonials section"],
  //   previewImage: "/placeholder.svg?height=160&width=300&text=Template+1",
  // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/profile/${user.username}`}
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 mx-auto">
            <img
              src={`/placeholder.svg?height=150&width=150&text=${user.name.charAt(0)}`}
              alt={user.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-background shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{user.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">{user.title}</p>
          <div className="flex items-center justify-center gap-1.5 mb-8">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{user.location}</span>
          </div>
          <p className="max-w-2xl mx-auto text-lg mb-8">{user.bio}</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href={user.social.github} target="_blank">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={user.social.linkedin} target="_blank">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={user.social.twitter} target="_blank">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href={user.social.website} target="_blank">
                <Globe className="w-5 h-5" />
                <span className="sr-only">Website</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {user.skills.map((skill, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full bg-background border shadow-sm hover:shadow-md transition-shadow"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {user.projects.map((project) => (
              <div key={project.id} className="group">
                <div className="overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
                  <div className="relative h-48">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="secondary" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground mt-2">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Interested in working together? Feel free to reach out to me for collaborations or just a friendly chat.
          </p>
          <Button size="lg" asChild>
            <Link href={`mailto:contact@${user.username}.dev`}>
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {user.name} | AI-Generated Portfolio by DevPortfolio
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button variant="ghost" size="sm">
              <Code className="w-4 h-4 mr-2" />
              View Source
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

