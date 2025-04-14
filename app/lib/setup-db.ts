import { db, runMigrations, testConnection } from "./db"
import { portfolioTemplates } from "./schema"

async function setupDatabase() {
  try {
    // Test the connection
    const connected = await testConnection()
    if (!connected) {
      console.error("Failed to connect to the database. Exiting...")
      process.exit(1)
    }

    // Run migrations
    await runMigrations()

    // Seed initial data
    await seedTemplates()

    console.log("Database setup completed successfully")
  } catch (error) {
    console.error("Error setting up database:", error)
    process.exit(1)
  }
}

async function seedTemplates() {
  // Check if templates already exist
  const existingTemplates = await db.select().from(portfolioTemplates)
  if (existingTemplates.length > 0) {
    console.log("Templates already seeded, skipping...")
    return
  }

  console.log("Seeding portfolio templates...")

  // Insert default templates
  await db.insert(portfolioTemplates).values([
    {
      name: "Modern Minimalist",
      description: "Clean, minimal design with focus on content and readability",
      colorScheme: "Monochromatic with accent colors",
      layout: "Header, Skills, Projects, Experience, Contact",
      features: ["Animated skill bars", "Project gallery", "Testimonials section"],
      category: "minimal",
      previewImage: "/placeholder.svg?height=160&width=300&text=Template+1",
    },
    {
      name: "Creative Bold",
      description: "Vibrant and eye-catching design for creative professionals",
      colorScheme: "Bold complementary colors",
      layout: "Hero banner, Work showcase, Skills, About me, Contact",
      features: ["Interactive project showcase", "Animated transitions", "Custom cursor"],
      category: "creative",
      previewImage: "/placeholder.svg?height=160&width=300&text=Template+2",
    },
    {
      name: "Professional Corporate",
      description: "Sophisticated and professional design for corporate environments",
      colorScheme: "Subtle blues and grays",
      layout: "About, Experience, Skills, Education, Projects, Contact",
      features: ["Timeline for experience", "Downloadable resume", "Testimonials carousel"],
      category: "professional",
      previewImage: "/placeholder.svg?height=160&width=300&text=Template+3",
    },
    {
      name: "Tech Innovator",
      description: "Modern tech-focused design with code elements",
      colorScheme: "Dark mode with neon accents",
      layout: "Terminal intro, Projects, Technical skills, GitHub stats, Contact",
      features: ["Code snippet showcases", "GitHub integration", "Terminal-style intro"],
      category: "tech",
      previewImage: "/placeholder.svg?height=160&width=300&text=Template+4",
    },
  ])

  console.log("Templates seeded successfully")
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Unhandled error during database setup:", error)
      process.exit(1)
    })
}

export default setupDatabase
