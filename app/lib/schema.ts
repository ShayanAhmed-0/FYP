import { pgTable, serial, text, timestamp, boolean, integer, json } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  title: text("title"),
  location: text("location"),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
  experience: text("experience"),
  availability: text("availability"),
  remote: text("remote"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
})

// User skills junction table
export const userSkills = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  skillId: integer("skill_id")
    .notNull()
    .references(() => skills.id, { onDelete: "cascade" }),
})

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  link: text("link"),
  github: text("github"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Work experience table
export const workExperience = pgTable("work_experience", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Education table
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Social links table
export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Portfolio templates table
export const portfolioTemplates = pgTable("portfolio_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  colorScheme: text("color_scheme"),
  layout: text("layout"),
  features: json("features").$type<string[]>(),
  category: text("category"),
  previewImage: text("preview_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// User portfolios table
export const userPortfolios = pgTable("user_portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  templateId: integer("template_id").references(() => portfolioTemplates.id),
  isAiGenerated: boolean("is_ai_generated").default(false),
  customizations: json("customizations").$type<Record<string, any>>(),
  html: text("html"),
  css: text("css"),
  js: text("js"),
  publishedUrl: text("published_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  skills: many(userSkills),
  projects: many(projects),
  workExperience: many(workExperience),
  education: many(education),
  socialLinks: many(socialLinks),
  portfolios: many(userPortfolios),
}))

export const skillsRelations = relations(skills, ({ many }) => ({
  users: many(userSkills),
}))

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
}))

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}))

export const workExperienceRelations = relations(workExperience, ({ one }) => ({
  user: one(users, {
    fields: [workExperience.userId],
    references: [users.id],
  }),
}))

export const educationRelations = relations(education, ({ one }) => ({
  user: one(users, {
    fields: [education.userId],
    references: [users.id],
  }),
}))

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  user: one(users, {
    fields: [socialLinks.userId],
    references: [users.id],
  }),
}))

export const userPortfoliosRelations = relations(userPortfolios, ({ one }) => ({
  user: one(users, {
    fields: [userPortfolios.userId],
    references: [users.id],
  }),
  template: one(portfolioTemplates, {
    fields: [userPortfolios.templateId],
    references: [portfolioTemplates.id],
  }),
}))
