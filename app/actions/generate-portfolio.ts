"use server"

export type ProfileData = {
  firstName: string
  lastName: string
  title: string
  location: string
  bio: string
  skills: string[]
  experience: string
  availability: string
  remote: string
  projects: Array<{
    title: string
    description: string
    link?: string
    github?: string
  }>
  workExperience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    startDate: string
    endDate: string
  }>
  social: {
    website?: string
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export type PortfolioTemplate = {
  id: number
  name: string
  description: string
  colorScheme: string
  layout: string
  features: string[]
  previewImage: string
}

export async function generatePortfolioTemplates(profileData: ProfileData): Promise<PortfolioTemplate[]> {
  try {
    // Instead of calling an external API, we'll generate templates based on the user's profile data
    // This approach doesn't require any API calls or costs

    // Extract key information from profile data to personalize templates
    const isCreative = isCreativeProfile(profileData)
    const isTechnical = isTechnicalProfile(profileData)
    const isBusinessFocused = isBusinessProfile(profileData)

    // Generate templates based on profile characteristics
    const templates = []

    // Always include a modern minimalist template
    templates.push({
      id: 1,
      name: "Modern Minimalist",
      description: `Clean, minimal design perfect for ${profileData.title}`,
      colorScheme: "Monochromatic with subtle accent colors",
      layout: "Header, Skills, Projects, Experience, Contact",
      features: [
        "Animated skill bars",
        "Project gallery",
        "Testimonials section",
        `Optimized for ${profileData.skills.slice(0, 3).join(", ")} showcase`,
      ],
      previewImage: "/placeholder.svg?height=160&width=300&text=Modern+Minimalist",
    })

    // Add a creative template if the profile seems creative
    if (isCreative) {
      templates.push({
        id: 2,
        name: "Creative Portfolio",
        description: "Bold and vibrant design for creative professionals",
        colorScheme: "Vibrant complementary colors with dynamic elements",
        layout: "Hero banner, Work showcase, Skills, About me, Contact",
        features: [
          "Interactive project showcase",
          "Animated transitions",
          "Custom cursor",
          "Visual skill representation",
        ],
        previewImage: "/placeholder.svg?height=160&width=300&text=Creative+Portfolio",
      })
    } else {
      // Add a corporate template if not creative
      templates.push({
        id: 2,
        name: "Professional Corporate",
        description: "Sophisticated and professional design for corporate environments",
        colorScheme: "Subtle blues and grays with professional accent colors",
        layout: "About, Experience, Skills, Education, Projects, Contact",
        features: [
          "Timeline for experience",
          "Downloadable resume",
          "Testimonials carousel",
          "Professional contact form",
        ],
        previewImage: "/placeholder.svg?height=160&width=300&text=Professional+Corporate",
      })
    }

    // Add a technical template if the profile is technical
    if (isTechnical) {
      templates.push({
        id: 3,
        name: "Tech Innovator",
        description: "Modern tech-focused design with code elements",
        colorScheme: "Dark mode with neon accents and code syntax highlighting",
        layout: "Terminal intro, Projects, Technical skills, GitHub stats, Contact",
        features: ["Code snippet showcases", "GitHub integration", "Terminal-style intro", "Tech stack visualization"],
        previewImage: "/placeholder.svg?height=160&width=300&text=Tech+Innovator",
      })
    } else if (isBusinessFocused) {
      // Add a business-focused template
      templates.push({
        id: 3,
        name: "Business Professional",
        description: "Results-oriented design for business professionals",
        colorScheme: "Rich neutrals with gold accents",
        layout: "Executive summary, Achievements, Experience, Testimonials, Contact",
        features: [
          "Metrics and results showcase",
          "Client testimonials",
          "Achievement timeline",
          "Professional headshot focus",
        ],
        previewImage: "/placeholder.svg?height=160&width=300&text=Business+Professional",
      })
    } else {
      // Add a versatile template as fallback
      templates.push({
        id: 3,
        name: "Versatile Portfolio",
        description: "Adaptable design suitable for various professions",
        colorScheme: "Customizable with preset themes",
        layout: "Flexible sections that can be reordered",
        features: [
          "Customizable section order",
          "Multiple theme options",
          "Responsive design",
          "Social media integration",
        ],
        previewImage: "/placeholder.svg?height=160&width=300&text=Versatile+Portfolio",
      })
    }

    // Add a fourth template based on specific skills or experience
    const fourthTemplate = generateSpecializedTemplate(profileData)
    if (fourthTemplate) {
      templates.push(fourthTemplate)
    }

    return templates
  } catch (error) {
    console.error("Error generating portfolio templates:", error)
    return getDefaultTemplates()
  }
}

// Helper functions to analyze profile data
function isCreativeProfile(profileData: ProfileData): boolean {
  const creativeKeywords = [
    "design",
    "creative",
    "art",
    "graphic",
    "ui",
    "ux",
    "visual",
    "artist",
    "illustrator",
    "photographer",
    "video",
    "animation",
    "content creator",
  ]

  // Check title
  const titleMatch = creativeKeywords.some((keyword) => profileData.title.toLowerCase().includes(keyword))

  // Check skills
  const skillsMatch = profileData.skills.some((skill) =>
    creativeKeywords.some((keyword) => skill.toLowerCase().includes(keyword)),
  )

  return titleMatch || skillsMatch
}

function isTechnicalProfile(profileData: ProfileData): boolean {
  const technicalKeywords = [
    "developer",
    "engineer",
    "programmer",
    "coding",
    "software",
    "web",
    "data",
    "backend",
    "frontend",
    "fullstack",
    "devops",
    "tech",
    "it",
    "javascript",
    "python",
    "java",
    "c#",
    "react",
    "node",
    "angular",
  ]

  // Check title
  const titleMatch = technicalKeywords.some((keyword) => profileData.title.toLowerCase().includes(keyword))

  // Check skills
  const skillsMatch = profileData.skills.some((skill) =>
    technicalKeywords.some((keyword) => skill.toLowerCase().includes(keyword)),
  )

  return titleMatch || skillsMatch
}

function isBusinessProfile(profileData: ProfileData): boolean {
  const businessKeywords = [
    "manager",
    "director",
    "executive",
    "ceo",
    "cto",
    "cfo",
    "founder",
    "business",
    "marketing",
    "sales",
    "product",
    "project",
    "consultant",
    "analyst",
    "strategist",
    "operations",
    "hr",
    "finance",
    "leadership",
  ]

  // Check title
  const titleMatch = businessKeywords.some((keyword) => profileData.title.toLowerCase().includes(keyword))

  // Check skills
  const skillsMatch = profileData.skills.some((skill) =>
    businessKeywords.some((keyword) => skill.toLowerCase().includes(keyword)),
  )

  return titleMatch || skillsMatch
}

function generateSpecializedTemplate(profileData: ProfileData): PortfolioTemplate | null {
  // Check for specific specializations and return a tailored template

  // For data scientists/analysts
  if (
    profileData.skills.some((skill) =>
      [
        "data science",
        "data analysis",
        "machine learning",
        "ai",
        "statistics",
        "python",
        "r",
        "tableau",
        "power bi",
      ].includes(skill.toLowerCase()),
    )
  ) {
    return {
      id: 4,
      name: "Data Scientist Portfolio",
      description: "Showcase your data projects and analytical skills",
      colorScheme: "Data visualization inspired colors with clean white space",
      layout: "Data projects, Visualizations, Technical skills, Research, Contact",
      features: [
        "Interactive data visualizations",
        "Jupyter notebook integration",
        "Case study format for projects",
        "Research publication highlights",
      ],
      previewImage: "/placeholder.svg?height=160&width=300&text=Data+Scientist",
    }
  }

  // For UX/UI designers
  if (
    profileData.skills.some((skill) =>
      ["ux", "ui", "user experience", "user interface", "figma", "sketch", "adobe xd", "design thinking"].includes(
        skill.toLowerCase(),
      ),
    )
  ) {
    return {
      id: 4,
      name: "UX/UI Designer Portfolio",
      description: "Highlight your design process and user-centered solutions",
      colorScheme: "Clean with accessibility-focused color palette",
      layout: "Case studies, Design process, UI components, User research, Contact",
      features: [
        "Case study storytelling",
        "Before/after comparisons",
        "Interactive prototypes",
        "User testing results",
      ],
      previewImage: "/placeholder.svg?height=160&width=300&text=UX/UI+Designer",
    }
  }

  // For content creators/writers
  if (
    profileData.skills.some((skill) =>
      ["content", "writing", "copywriting", "blogging", "journalism", "editing", "seo"].includes(skill.toLowerCase()),
    )
  ) {
    return {
      id: 4,
      name: "Content Creator Portfolio",
      description: "Showcase your writing and content creation skills",
      colorScheme: "Typography-focused with readable contrast",
      layout: "Featured articles, Writing samples, Client work, Blog, Contact",
      features: ["Article previews", "Content categories", "Reading time estimates", "Publication highlights"],
      previewImage: "/placeholder.svg?height=160&width=300&text=Content+Creator",
    }
  }

  return null
}

function getDefaultTemplates(): PortfolioTemplate[] {
  return [
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
}

