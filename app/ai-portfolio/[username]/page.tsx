import Link from "next/link"
import { ArrowLeft, Code, Download, Edit, Github, Globe, Linkedin, Mail, MapPin, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { db } from "@/app/lib/db"
import { users, userPortfolios, portfolioTemplates, userSkills, skills, socialLinks } from "@/app/lib/schema"
import { eq } from "drizzle-orm"
import { LocationMap } from "@/components/location-map"
import { ViewLocationButton } from "@/components/view-location-button"

export default async function AIPortfolioPage({ params }: { params: { username: string } }) {
  // Fetch user and portfolio data from the database
  const userData = await db
    .select({
      user: users,
      portfolio: userPortfolios,
      template: portfolioTemplates,
    })
    .from(users)
    .where(eq(users.username, params.username))
    .leftJoin(userPortfolios, eq(users.id, userPortfolios.userId))
    .leftJoin(portfolioTemplates, eq(userPortfolios.templateId, portfolioTemplates.id))
    .limit(1)

  if (!userData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground mb-6">
            The user you're looking for doesn't exist or hasn't created a portfolio yet.
          </p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const user = userData[0].user

  // Fetch user skills from the database
  const userSkillsData = await db
    .select({
      skill: skills.name,
    })
    .from(userSkills)
    .where(eq(userSkills.userId, user.id))
    .leftJoin(skills, eq(userSkills.skillId, skills.id))

  const userSkillsList = userSkillsData.map((item) => item.skill)

  // Fetch social links from the database
  const socialLinksData = await db
    .select({
      platform: socialLinks.platform,
      url: socialLinks.url,
    })
    .from(socialLinks)
    .where(eq(socialLinks.userId, user.id))

  // Convert social links to an object
  const socialLinksObj: Record<string, string> = {}
  socialLinksData.forEach((link) => {
    socialLinksObj[link.platform] = link.url
  })

  // Get portfolio customizations
  const customizations = userData[0]?.portfolio?.customizations || {
    theme: "dark",
    code: {
      html: "",
      css: "",
      js: "",
    },
  }

  // Get template info
  const template = userData[0]?.template || {
    id: 1,
    name: "Modern Minimalist",
    description: "Clean, minimal design with focus on content and readability",
    colorScheme: "Monochromatic with accent colors",
    layout: "Header, Skills, Projects, Experience, Contact",
    features: ["Animated skill bars", "Project gallery", "Testimonials section"],
    previewImage: "/placeholder.svg?height=160&width=300&text=Template+1",
  }

  // Apply theme class to the page
  const themeClass = customizations.theme === "light" ? "light" : "dark"

  // Default projects if none are found
  const defaultProjects = [
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
  ]

  // Get user's full name
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username

  // Get first letter for avatar
  const firstLetter = (user.firstName || user.username || "U").charAt(0).toUpperCase()

  return (
    <div className={`min-h-screen bg-gradient-to-b from-primary/5 to-background ${themeClass}`}>
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
              src={user.profileImageUrl || `/placeholder.svg?height=150&width=150&text=${firstLetter}`}
              alt={fullName}
              className="w-32 h-32 rounded-full mx-auto border-4 border-background shadow-lg object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{fullName}</h1>
          <p className="text-xl text-muted-foreground mb-6">{user.title || "Developer"}</p>
          <div className="flex items-center justify-center gap-1.5 mb-8">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{user.location || "Remote"}</span>
          </div>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            {user.bio || "A passionate developer with expertise in various technologies."}
          </p>
          <div className="flex justify-center gap-3">
            {socialLinksObj.github && (
              <Button variant="outline" size="icon" asChild>
                <Link href={socialLinksObj.github} target="_blank">
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            )}
            {socialLinksObj.linkedin && (
              <Button variant="outline" size="icon" asChild>
                <Link href={socialLinksObj.linkedin} target="_blank">
                  <Linkedin className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            )}
            {socialLinksObj.twitter && (
              <Button variant="outline" size="icon" asChild>
                <Link href={socialLinksObj.twitter} target="_blank">
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            )}
            {socialLinksObj.website && (
              <Button variant="outline" size="icon" asChild>
                <Link href={socialLinksObj.website} target="_blank">
                  <Globe className="w-5 h-5" />
                  <span className="sr-only">Website</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {userSkillsList.length > 0 ? (
              userSkillsList.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-background border shadow-sm hover:shadow-md transition-shadow"
                >
                  {skill}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No skills added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defaultProjects.map((project) => (
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

      {/* Location Section */}
      {user.location && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6">My Location</h2>
            <p className="text-center text-muted-foreground mb-8">Based in {user.location}</p>
            <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg relative">
              <LocationMap location={user.location} className="h-80 w-full" />
              <div className="absolute bottom-4 right-4">
                <ViewLocationButton location={user.location} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Interested in working together? Feel free to reach out to me for collaborations or just a friendly chat.
          </p>
          <Button size="lg" asChild>
            <Link href={`mailto:${user.email || `contact@${user.username}.dev`}`}>
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
            © {new Date().getFullYear()} {fullName} | Portfolio by Portfolio AI
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
