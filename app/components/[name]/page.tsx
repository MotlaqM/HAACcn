import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, CopyIcon } from "lucide-react"

import { ComponentPreview } from "@/components/component-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  componentItems,
  getComponent,
  installCommand,
  stateGuidance,
} from "@/lib/registry"

export function generateStaticParams() {
  return componentItems.map((item) => ({ name: item.name }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getComponent(name)

  if (!item) notFound()

  const sourceDependencies = (item.registryDependencies ?? []).filter(
    (dependency) =>
      !dependency.endsWith("/haac-theme") && !dependency.endsWith("/inter")
  )

  return (
    <main className="min-h-svh">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Button variant="plain" render={<Link href="/" />}>
            <ArrowLeftIcon data-icon="inline-start" />
            All components
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:py-16">
        <article className="min-w-0">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{item.categories?.[0]}</Badge>
            <Badge variant="success">Registry valid</Badge>
          </div>
          <h1 className="mt-5 text-large-title">{item.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            {item.description}
          </p>

          <section className="mt-10">
            <h2 className="text-title-2">Preview</h2>
            <div className="mt-4 rounded-lg border bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:p-8">
              <ComponentPreview name={item.name} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-title-2">Install</h2>
            <div className="mt-4 flex items-center gap-3 overflow-x-auto rounded-lg border bg-[#171717] p-4 font-mono text-xs text-[#f5f5f5]">
              <code className="min-w-max flex-1">
                {installCommand(item.name)}
              </code>
              <CopyIcon className="size-4 shrink-0 text-[#a3a3a3]" />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-title-2">Required states</h2>
            <div className="mt-4 divide-y rounded-lg border bg-card">
              {stateGuidance(item).map((state, index) => (
                <div key={state} className="flex gap-4 p-4 text-sm leading-6">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{state}</span>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="h-fit rounded-lg border bg-card p-4 text-sm lg:sticky lg:top-20">
          <h2 className="font-medium">Registry contract</h2>
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">
                File
              </dt>
              <dd className="mt-1 font-mono text-xs">
                {item.files?.[0]?.target ?? "Metadata only"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">
                Package dependencies
              </dt>
              <dd className="mt-1 text-xs leading-5">
                {item.dependencies?.join(", ") || "None"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">
                HAACcn dependencies
              </dt>
              <dd className="mt-1 text-xs leading-5">
                {sourceDependencies.length
                  ? sourceDependencies
                      .map((dependency) => dependency.split("/").at(-1))
                      .join(", ")
                  : "Theme and Inter only"}
              </dd>
            </div>
          </dl>
          {item.docs ? (
            <p className="mt-4 border-t pt-4 text-xs leading-5 text-muted-foreground">
              {item.docs}
            </p>
          ) : null}
        </aside>
      </div>
    </main>
  )
}
