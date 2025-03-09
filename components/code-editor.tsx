"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CodeEditor({ onClose }: { onClose: () => void }) {
  const [htmlCode, setHtmlCode] = useState(`<div class="hero">
  <h1>Welcome to My Portfolio</h1>
  <p>I'm a passionate developer specializing in web technologies.</p>
  <button class="cta-button">View My Work</button>
</div>`)

  const [cssCode, setCssCode] = useState(`.hero {
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
}`)

  const [jsCode, setJsCode] = useState(`document.addEventListener('DOMContentLoaded', () => {
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
});`)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Edit Code</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <Tabs defaultValue="html">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        <TabsContent value="html" className="pt-4">
          <div className="relative">
            <textarea
              className="w-full h-80 font-mono text-sm p-4 bg-secondary/50 rounded-md"
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
            />
          </div>
        </TabsContent>
        <TabsContent value="css" className="pt-4">
          <div className="relative">
            <textarea
              className="w-full h-80 font-mono text-sm p-4 bg-secondary/50 rounded-md"
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
            />
          </div>
        </TabsContent>
        <TabsContent value="js" className="pt-4">
          <div className="relative">
            <textarea
              className="w-full h-80 font-mono text-sm p-4 bg-secondary/50 rounded-md"
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

