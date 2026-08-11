import Link from "next/link"
import { ArrowUpRightIcon, Code2Icon } from "lucide-react"

import { ComponentPreview } from "@/components/component-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { componentGroups, componentItems } from "@/lib/registry"

const colors = [
  ["Primary", "bg-foreground", "#171717"],
  ["Secondary", "bg-muted-foreground", "#737373"],
  ["Brand", "bg-brand", "#FF591E"],
  ["Important", "bg-important", "Blue"],
  ["Success", "bg-success", "Green"],
  ["Warning", "bg-warning", "Amber"],
]

const coreComponents = [
  "button",
  "badge",
  "input",
  "textarea",
  "checkbox",
  "switch",
  "tabs",
  "alert",
  "progress",
  "avatar",
  "skeleton",
  "card",
]

export default function Page() {
  return (
    <main className="min-h-svh">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <span className="grid size-6 place-items-center rounded-md bg-linear-to-br from-brand to-[#fb432c] text-xs font-bold text-white">
              H
            </span>
            HAACcn
          </Link>
          <div className="flex items-center gap-1">
            <Button
              variant="plain"
              render={<Link href="https://github.com/MotlaqM/HAACcn" />}
            >
              <Code2Icon data-icon="inline-start" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <Badge variant="brand">Base UI · shadcn source registry</Badge>
          <h1 className="mt-6 max-w-3xl text-[40px] leading-[44px] font-bold tracking-[-0.035em] sm:text-[56px] sm:leading-[60px]">
            Calm components for serious products.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            The complete current shadcn component inventory, rebuilt around the
            semantic system in design.md and distributed as editable source.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              render={<a href="#components" />}
            >
              Browse {componentItems.length} components
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
            <Button
              variant="base"
              size="lg"
              render={<Link href="https://github.com/MotlaqM/HAACcn" />}
            >
              View source
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Foundation
            </p>
            <h2 className="mt-2 text-title-1">Meaning before decoration</h2>
          </div>
          <div className="grid gap-8">
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border bg-card sm:grid-cols-3">
              {colors.map(([label, color, value]) => (
                <div
                  key={label}
                  className="border-r border-b p-4 last:border-r-0"
                >
                  <div className={`h-14 rounded-md ${color}`} />
                  <div className="mt-3 text-sm font-medium">{label}</div>
                  <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border bg-card p-6 sm:p-8">
              <div className="text-large-title">Large title</div>
              <div className="mt-5 text-title-1">Title one</div>
              <div className="mt-4 text-title-2">Title two</div>
              <div className="mt-4 text-title-3">Title three</div>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Inter carries a small functional scale. Tone, grouping, and
                placement create hierarchy before size does.
              </p>
              <p className="mt-3 text-xs font-medium text-muted-foreground">
                Caption · Metadata and supporting state
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Core specimens
            </p>
            <h2 className="mt-2 text-title-1">
              Twelve components, useful states
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              These specimens show the system under normal, semantic, disabled,
              loading, selected, and invalid conditions.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {coreComponents.map((name) => (
              <article
                key={name}
                className="rounded-lg border bg-background p-5 sm:p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-medium capitalize">
                    <Link
                      href={`/components/${name}`}
                      className="group inline-flex items-center gap-1.5 hover:underline hover:underline-offset-4"
                    >
                      {name}
                      <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </h3>
                </div>
                <ComponentPreview name={name} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="components"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Full registry
          </p>
          <h2 className="mt-2 text-title-1">
            All {componentItems.length} components
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Every item installs its HAACcn dependencies, semantic theme, and
            Inter foundation through the shadcn CLI.
          </p>
        </div>

        <div className="mt-10 grid gap-10">
          {componentGroups.map(([category, items]) => (
            <section key={category}>
              <h3 className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {category} · {items.length}
              </h3>
              <div className="grid overflow-hidden rounded-lg border bg-card sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={`/components/${item.name}`}
                    className="group flex min-h-24 items-start justify-between gap-3 border-r border-b p-4 transition-colors duration-100 hover:bg-muted/60"
                  >
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>HAACcn · MIT licensed source components</span>
          <span>design.md is the source of truth</span>
        </div>
      </footer>
    </main>
  )
}
