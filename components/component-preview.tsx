"use client"

import { CheckCircle2Icon, InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const supported = new Set([
  "alert",
  "avatar",
  "badge",
  "button",
  "card",
  "checkbox",
  "input",
  "progress",
  "skeleton",
  "switch",
  "tabs",
  "textarea",
])

export function hasRichPreview(name: string) {
  return supported.has(name)
}

export function ComponentPreview({ name }: { name: string }) {
  if (name === "button") return <ButtonPreview />
  if (name === "badge") return <BadgePreview />
  if (name === "input") return <InputPreview />
  if (name === "textarea") return <TextareaPreview />
  if (name === "checkbox") return <CheckboxPreview />
  if (name === "switch") return <SwitchPreview />
  if (name === "tabs") return <TabsPreview />
  if (name === "alert") return <AlertPreview />
  if (name === "progress") return <ProgressPreview />
  if (name === "avatar") return <AvatarPreview />
  if (name === "skeleton") return <SkeletonPreview />
  if (name === "card") return <CardPreview />

  return (
    <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed bg-muted/30 p-6 text-center">
      <div className="max-w-sm">
        <div className="text-sm font-medium">Installable source specimen</div>
        <p className="mt-1 text-sm text-muted-foreground">
          This item is validated in the registry. Its page documents the source,
          dependencies, and required behavioral states.
        </p>
      </div>
    </div>
  )
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Create post</Button>
      <Button variant="base">Save draft</Button>
      <Button variant="flat">Preview</Button>
      <Button variant="important">Share</Button>
      <Button variant="brand">Get started</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Posting…</Button>
    </div>
  )
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Private</Badge>
      <Badge variant="unread">Unread</Badge>
      <Badge variant="success">Resolved</Badge>
      <Badge variant="warning">Follow up</Badge>
      <Badge variant="brand">Feedback requested</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  )
}

function InputPreview() {
  return (
    <div className="grid max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor="project-name">Project name</Label>
        <Input id="project-name" defaultValue="Product systems" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project-error">Required field</Label>
        <Input id="project-error" aria-invalid placeholder="Add a name" />
        <p className="text-xs text-destructive">A project name is required.</p>
      </div>
    </div>
  )
}

function TextareaPreview() {
  return (
    <div className="grid max-w-md gap-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        defaultValue="A calm place for product decisions and async work."
      />
      <p className="text-xs text-muted-foreground">
        Optional · visible to everyone in this project.
      </p>
    </div>
  )
}

function CheckboxPreview() {
  return (
    <div className="grid gap-3">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked /> Notify project members
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox /> Add to favorites
      </label>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Checkbox disabled /> Available after publishing
      </label>
    </div>
  )
}

function SwitchPreview() {
  return (
    <div className="grid max-w-sm gap-3">
      <label className="flex items-center justify-between gap-6 text-sm">
        <span>Public channel</span>
        <Switch defaultChecked />
      </label>
      <label className="flex items-center justify-between gap-6 text-sm">
        <span>Allow replies</span>
        <Switch />
      </label>
      <label className="flex items-center justify-between gap-6 text-sm text-muted-foreground">
        <span>Auto-archive</span>
        <Switch disabled />
      </label>
    </div>
  )
}

function TabsPreview() {
  return (
    <Tabs defaultValue="updates" className="max-w-md">
      <TabsList>
        <TabsTrigger value="updates">Updates</TabsTrigger>
        <TabsTrigger value="later">Later</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="updates" className="pt-3 text-muted-foreground">
        Three updates need your attention.
      </TabsContent>
      <TabsContent value="later" className="pt-3 text-muted-foreground">
        Two follow-ups are scheduled for later.
      </TabsContent>
      <TabsContent value="archived" className="pt-3 text-muted-foreground">
        Archived items remain searchable.
      </TabsContent>
    </Tabs>
  )
}

function AlertPreview() {
  return (
    <div className="grid max-w-lg gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Draft saved</AlertTitle>
        <AlertDescription>You can return to this post later.</AlertDescription>
      </Alert>
      <Alert>
        <CheckCircle2Icon className="text-success" />
        <AlertTitle>Call resolved</AlertTitle>
        <AlertDescription>The recording is ready to share.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Upload failed</AlertTitle>
        <AlertDescription>Try the attachment again.</AlertDescription>
      </Alert>
    </div>
  )
}

function ProgressPreview() {
  return (
    <div className="grid max-w-md gap-5">
      <Progress value={72}>
        <ProgressLabel>Uploading attachments</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Published</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}

function AvatarPreview() {
  return (
    <div className="flex items-end gap-3">
      <Avatar size="sm">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>NK</AvatarFallback>
        <AvatarBadge className="bg-success" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div className="flex max-w-md gap-3">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}

function CardPreview() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Weekly planning</CardTitle>
        <CardDescription>Updated 12 minutes ago by Nora</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Review the launch checklist and leave decisions in the thread.
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="plain">Preview</Button>
        <Button variant="primary">Open post</Button>
      </CardFooter>
    </Card>
  )
}
