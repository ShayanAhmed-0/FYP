"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type PageType = {
  id: string
  title: string
  slug: string
  type: "custom" | "blog" | "projects" | "contact"
  isPublished: boolean
}

export function PageEditor({ onClose }: { onClose: () => void }) {
  const [pages, setPages] = useState<PageType[]>([
    {
      id: "1",
      title: "Home",
      slug: "/",
      type: "custom",
      isPublished: true,
    },
    {
      id: "2",
      title: "About",
      slug: "/about",
      type: "custom",
      isPublished: true,
    },
    {
      id: "3",
      title: "Projects",
      slug: "/projects",
      type: "projects",
      isPublished: true,
    },
  ])

  const [newPage, setNewPage] = useState<Omit<PageType, "id">>({
    title: "",
    slug: "",
    type: "custom",
    isPublished: true,
  })

  const handleAddPage = () => {
    if (!newPage.title || !newPage.slug) return

    setPages([
      ...pages,
      {
        id: Date.now().toString(),
        ...newPage,
      },
    ])

    setNewPage({
      title: "",
      slug: "",
      type: "custom",
      isPublished: true,
    })
  }

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id))
  }

  const handleTogglePublish = (id: string) => {
    setPages(pages.map((page) => (page.id === id ? { ...page, isPublished: !page.isPublished } : page)))
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manage Pages</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Add New Page</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="pageTitle">Page Title</Label>
              <Input
                id="pageTitle"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                placeholder="e.g. Contact Me"
              />
            </div>
            <div>
              <Label htmlFor="pageSlug">URL Slug</Label>
              <Input
                id="pageSlug"
                value={newPage.slug}
                onChange={(e) =>
                  setNewPage({
                    ...newPage,
                    slug: e.target.value.startsWith("/") ? e.target.value : `/${e.target.value}`,
                  })
                }
                placeholder="e.g. /contact"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="pageType">Page Type</Label>
            <Select
              value={newPage.type}
              onValueChange={(value) => setNewPage({ ...newPage, type: value as PageType["type"] })}
            >
              <SelectTrigger id="pageType">
                <SelectValue placeholder="Select page type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Page</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="contact">Contact Form</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddPage} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Page
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Current Pages</h4>
          <div className="space-y-2">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">{page.title}</div>
                  <div className="text-xs text-muted-foreground">{page.slug}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Switch
                      checked={page.isPublished}
                      onCheckedChange={() => handleTogglePublish(page.id)}
                      id={`publish-${page.id}`}
                    />
                    <Label htmlFor={`publish-${page.id}`} className="text-xs">
                      {page.isPublished ? "Published" : "Draft"}
                    </Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePage(page.id)}
                    disabled={page.slug === "/"}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

