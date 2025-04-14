import Link from "next/link"
import { ArrowLeft, Check, Code, Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Portfolio AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the ultimate platform for developers to showcase their skills, connect with peers, and find
            exciting opportunities.
          </p>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                Portfolio AI was created with a simple mission: to help developers showcase their work and connect with
                opportunities that match their unique skills and interests.
              </p>
              <p className="text-lg mb-6">
                We believe that talent should be discoverable, and that the best way to evaluate a developer's abilities
                is through their actual work and projects, not just their resume.
              </p>
              <p className="text-lg">
                Our platform leverages AI to help developers create stunning portfolios, match with relevant
                opportunities, and connect with like-minded professionals in their field.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=400&text=Mission+Illustration"
                alt="Our Mission"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Portfolios</h3>
                <p className="text-muted-foreground">
                  Create stunning, professional portfolios in minutes with our AI-powered tools that highlight your best
                  work.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Developer Community</h3>
                <p className="text-muted-foreground">
                  Connect with other developers, share knowledge, and collaborate on exciting projects within our
                  growing community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Opportunities</h3>
                <p className="text-muted-foreground">
                  Discover job opportunities, freelance projects, and collaboration requests from around the world that
                  match your skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-2xl font-bold text-primary">1</span>
                <div className="absolute top-1/2 left-full h-0.5 w-full bg-primary/20 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and build your developer profile with your skills, experience, and portfolio projects.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                <span className="text-2xl font-bold text-primary">2</span>
                <div className="absolute top-1/2 left-full h-0.5 w-full bg-primary/20 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Showcase Your Work</h3>
              <p className="text-muted-foreground">
                Upload your projects, add descriptions, and highlight your technical skills and achievements.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Grow</h3>
              <p className="text-muted-foreground">
                Get discovered by employers, connect with other developers, and find opportunities that match your
                skills.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Portfolio AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Portfolio Generation</h3>
                <p className="text-muted-foreground">
                  Our AI tools help you create professional portfolios in minutes, not hours, with templates tailored to
                  your skills and experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Intelligent Matching</h3>
                <p className="text-muted-foreground">
                  Our platform connects you with opportunities and collaborators that align with your specific skills
                  and career goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Developer-First Approach</h3>
                <p className="text-muted-foreground">
                  Built by developers for developers, our platform focuses on showcasing your technical skills in the
                  best possible light.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Growing Community</h3>
                <p className="text-muted-foreground">
                  Join thousands of developers who are already using Portfolio AI to showcase their work and advance
                  their careers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=128&width=128&text=JD"
                  alt="John Doe"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-primary">Founder & CEO</p>
              <p className="text-sm text-muted-foreground mt-2">
                Former tech lead at Google with 15+ years of experience in web development and AI.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=128&width=128&text=JS"
                  alt="Jane Smith"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-primary">CTO</p>
              <p className="text-sm text-muted-foreground mt-2">
                AI researcher and full-stack developer with expertise in machine learning and web technologies.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=128&width=128&text=MC"
                  alt="Michael Chen"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Michael Chen</h3>
              <p className="text-primary">Lead Developer</p>
              <p className="text-sm text-muted-foreground mt-2">
                Full-stack developer with a passion for creating intuitive and accessible web applications.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=128&width=128&text=SR"
                  alt="Sarah Rodriguez"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Rodriguez</h3>
              <p className="text-primary">UX/UI Designer</p>
              <p className="text-sm text-muted-foreground mt-2">
                Designer with 8+ years of experience creating beautiful and functional user interfaces.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Is Portfolio AI free to use?</h3>
              <p className="text-muted-foreground">
                Yes, Portfolio AI offers a free tier with all essential features. We also offer premium plans with
                advanced features for professionals and teams.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How does the AI portfolio generation work?</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your skills, experience, and projects to recommend the best templates and layouts for
                your portfolio, then helps you customize it to your preferences.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Can I customize my portfolio?</h3>
              <p className="text-muted-foreground">
                While our AI provides recommendations, you have full control over the design, layout, and content of
                your portfolio.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How do I get discovered by employers?</h3>
              <p className="text-muted-foreground">
                Complete your profile with relevant skills and projects, and our platform will match you with employers
                and opportunities that align with your expertise.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Can I use my own domain name?</h3>
              <p className="text-muted-foreground">
                Yes, premium users can connect their own custom domain to their portfolio for a more professional
                presence.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How do I get started?</h3>
              <p className="text-muted-foreground">
                Simply sign up for an account, complete your profile with your skills and experience, and start adding
                your projects. Our AI will guide you through the process.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Showcase Your Skills?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of developers who are using Portfolio AI to showcase their work and advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/explore">Explore Portfolios</Link>
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="max-w-md mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Have questions or feedback? We'd love to hear from you. Reach out to our team at:
            </p>
            <p className="text-lg font-medium mb-2">support@portfolioai.com</p>
            <p className="text-muted-foreground">We typically respond within 24 hours during business days.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
