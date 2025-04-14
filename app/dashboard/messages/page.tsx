"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Dummy messages data
const dummyConversations = [
  {
    id: 1,
    user: "Sarah Johnson",
    lastMessage: "Hi there! I'm interested in collaborating on a project. Would you be available for a quick chat?",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    user: "Michael Chen",
    lastMessage: "I saw your portfolio and was impressed by your work. I have a potential job opportunity for you.",
    time: "1d ago",
    unread: false,
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    lastMessage: "Thanks for sharing your code repository. I've made some suggestions in the pull request.",
    time: "3d ago",
    unread: false,
  },
  {
    id: 4,
    user: "David Kim",
    lastMessage: "Let's schedule a meeting to discuss the project requirements in more detail.",
    time: "1w ago",
    unread: false,
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [activeConversation, setActiveConversation] = useState<number | null>(null)

  useEffect(() => {
    setIsClient(true)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  if (!isClient) {
    return null
  }

  const selectedConversation = dummyConversations.find((c) => c.id === activeConversation)

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-2">
                {dummyConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-md cursor-pointer ${
                      activeConversation === conversation.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-muted border-transparent"
                    } border flex items-center gap-3`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.user}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {activeConversation ? (
              <>
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">{selectedConversation?.user}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">{selectedConversation?.lastMessage}</p>
                        <span className="text-xs text-muted-foreground">{selectedConversation?.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Select a conversation</h3>
                  <p className="text-sm text-muted-foreground">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
