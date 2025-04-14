"use client"

import { useState, useEffect } from "react"
import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function CodeEditor({
  onClose,
  portfolioData = {
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate developer with expertise in web technologies.",
    skills: ["JavaScript", "React", "Node.js"],
  },
  initialCode,
  onCodeUpdate,
}: {
  onClose: () => void
  portfolioData?: {
    name: string
    title: string
    bio: string
    skills: string[]
  }
  initialCode?: {
    html: string
    css: string
    js: string
  }
  onCodeUpdate?: (code: { html: string; css: string; js: string }) => void
}) {
  const [htmlCode, setHtmlCode] = useState(
    initialCode?.html ||
      `<div class="hero">
  <h1>Welcome to My Portfolio</h1>
  <p>I'm a passionate developer specializing in web technologies.</p>
  <button class="cta-button">View My Work</button>
</div>`,
  )

  const [cssCode, setCssCode] = useState(
    initialCode?.css ||
      `.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(to right, var(--primary), rgba(var(--primary), 0.7));
  color: white;
  border-radius: 0.5rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background-color: white;
  color: var(--primary);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}`,
  )

  const [jsCode, setJsCode] = useState(
    initialCode?.js ||
      `document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.cta-button');

  button.addEventListener('click', () => {
    alert('Thanks for checking out my work!');
  });

  // Add a simple animation to the hero section
  const hero = document.querySelector('.hero');
  hero.style.opacity = '0';
  hero.style.transform = 'translateY(20px)';

  setTimeout(() => {
    hero.style.transition = 'all 1s ease';
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
  }, 200);
});`,
  )

  const [theme, setTheme] = useState("dark")
  const [style, setStyle] = useState("modern")
  const [isGenerating, setIsGenerating] = useState(false)

  // Initialize with initial code if provided
  useEffect(() => {
    if (initialCode) {
      setHtmlCode(initialCode.html)
      setCssCode(initialCode.css)
      setJsCode(initialCode.js)
    }
  }, [initialCode])

  // Update parent component when code changes
  useEffect(() => {
    if (onCodeUpdate) {
      onCodeUpdate({
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      })
    }
  }, [htmlCode, cssCode, jsCode, onCodeUpdate])

  const handleGenerateCode = async () => {
    setIsGenerating(true)
    try {
      // Simulate AI code generation
      setTimeout(() => {
        const { name, title, bio, skills } = portfolioData

        const generatedHtml = `
<div class="portfolio-container">
  <header class="portfolio-header">
    <h1>${name}</h1>
    <p class="title">${title}</p>
  </header>
  
  <section class="about">
    <h2>About Me</h2>
    <p>${bio}</p>
  </section>
  
  <section class="skills">
    <h2>My Skills</h2>
    <ul class="skills-list">
      ${skills.map((skill) => `<li class="skill-item">${skill}</li>`).join("\n      ")}
    </ul>
  </section>
  
  <section class="cta">
    <button class="contact-button">Contact Me</button>
  </section>
</div>
`

        const generatedCss = `
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

.portfolio-header {
  text-align: center;
  padding: 4rem 0;
}

.portfolio-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.title {
  font-size: 1.5rem;
  opacity: 0.8;
}

section {
  margin: 4rem 0;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
}

h2:after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 4rem;
  height: 0.25rem;
  background-color: var(--primary);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.skill-item {
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.contact-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* ${theme === "dark" ? "Dark theme styles" : "Light theme styles"} */
`

        const generatedJs = `
document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on page load
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      section.style.transition = 'all 0.8s ease';
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 200 + (index * 200));
  });
  
  // Handle contact button click
  const contactButton = document.querySelector('.contact-button');
  contactButton.addEventListener('click', () => {
    alert('Thank you for your interest! This would open a contact form in a real portfolio.');
  });
});
`

        setHtmlCode(generatedHtml.trim())
        setCssCode(generatedCss.trim())
        setJsCode(generatedJs.trim())

        setIsGenerating(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating code:", error)
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    if (onCodeUpdate) {
      onCodeUpdate({
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      })
    }
    onClose()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Edit Code</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark Theme</SelectItem>
              <SelectItem value="light">Light Theme</SelectItem>
              <SelectItem value="colorful">Colorful</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full" onClick={handleGenerateCode} disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Code...
          </>
        ) : (
          <>Generate Code</>
        )}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="html-editor">HTML</Label>
          </div>
          <textarea
            id="html-editor"
            className="w-full h-64 p-3 font-mono text-sm bg-muted/50 border rounded-md"
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="css-editor">CSS</Label>
          </div>
          <textarea
            id="css-editor"
            className="w-full h-64 p-3 font-mono text-sm bg-muted/50 border rounded-md"
            value={cssCode}
            onChange={(e) => setCssCode(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="js-editor">JavaScript</Label>
          </div>
          <textarea
            id="js-editor"
            className="w-full h-64 p-3 font-mono text-sm bg-muted/50 border rounded-md"
            value={jsCode}
            onChange={(e) => setJsCode(e.target.value)}
            spellCheck="false"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      {/* Preview would go here in a more advanced implementation */}
    </div>
  )
}
