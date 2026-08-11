import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const registryAddress = "MotlaqM/HAACcn"
const registryDependency = (name) => `${registryAddress}/${name}`

const [inventory, packageJson] = await Promise.all([
  readJson("scripts/upstream-ui.json"),
  readJson("package.json"),
])

const componentFiles = (await readdir(path.join(root, "components/ui")))
  .filter((file) => file.endsWith(".tsx"))
  .sort()

const componentNames = componentFiles
  .map((file) => file.replace(/\.tsx$/, ""))
  .sort()
const expectedSourceComponents = inventory
  .filter((name) => name !== "form")
  .sort()

if (JSON.stringify(componentNames) !== JSON.stringify(expectedSourceComponents)) {
  throw new Error(
    `Component sources do not match the upstream inventory.\nExpected: ${expectedSourceComponents.join(", ")}\nActual: ${componentNames.join(", ")}`
  )
}

const componentItems = await Promise.all(
  inventory.map(async (name) => {
    if (name === "form") {
      return {
        name,
        type: "registry:ui",
        title: "Form",
        description:
          "Compatibility entry for shadcn's metadata-only form item. Installs HAACcn Field primitives for accessible form composition.",
        registryDependencies: [
          registryDependency("haac-theme"),
          registryDependency("inter"),
          registryDependency("field"),
        ],
        docs: "The current official shadcn form entry contains no files. HAACcn preserves that inventory contract and routes consumers to Field instead of recreating the deprecated wrapper API.",
        categories: ["forms"],
      }
    }

    const relativePath = `components/ui/${name}.tsx`
    const source = await readFile(path.join(root, relativePath), "utf8")
    const imports = collectImports(source)
    const internal = new Set([
      registryDependency("haac-theme"),
      registryDependency("inter"),
    ])
    const dependencies = new Set()

    for (const specifier of imports) {
      if (specifier.startsWith("@/components/ui/")) {
        const dependencyName = specifier.split("/").at(-1)
        if (dependencyName && dependencyName !== name) {
          internal.add(registryDependency(dependencyName))
        }
        continue
      }

      if (specifier === "@/lib/utils") {
        internal.add(registryDependency("utils"))
        continue
      }

      if (specifier === "@/hooks/use-mobile") {
        internal.add(registryDependency("use-mobile"))
        continue
      }

      if (
        specifier.startsWith("@/") ||
        specifier.startsWith("./") ||
        specifier.startsWith("../") ||
        specifier === "react" ||
        specifier === "react-dom" ||
        specifier.startsWith("react/") ||
        specifier.startsWith("next/")
      ) {
        continue
      }

      const packageName = getPackageName(specifier)
      if (packageName) dependencies.add(packageName)
    }

    return {
      name,
      type: "registry:ui",
      title: titleCase(name),
      description: `HAACcn ${titleCase(name)} built on Base UI and the design.md semantic system.`,
      dependencies: [...dependencies].sort().map(withVersion),
      registryDependencies: [...internal].sort(),
      files: [
        {
          path: relativePath,
          type: "registry:ui",
          target: `@ui/${name}.tsx`,
        },
      ],
      categories: categoriesFor(name),
    }
  })
)

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "haaccn",
  homepage: "https://github.com/MotlaqM/HAACcn",
  items: [
    {
      name: "inter",
      type: "registry:font",
      title: "Inter",
      description: "HAACcn's product typeface, installed through next/font.",
      font: {
        family: "Inter",
        provider: "google",
        import: "Inter",
        variable: "--font-inter",
        weight: ["400", "500", "600", "700"],
        subsets: ["latin"],
      },
    },
    {
      name: "haac-theme",
      type: "registry:theme",
      title: "HAACcn Theme",
      description:
        "Semantic light and dark color roles, compact radii, and restrained elevation from design.md.",
      cssVars: {
        theme: {
          "font-sans": "var(--font-inter)",
          "color-brand": "var(--brand)",
          "color-important": "var(--important)",
          "color-success": "var(--success)",
          "color-warning": "var(--warning)",
          "color-highlight": "var(--highlight)",
          "radius-sm": "4px",
          "radius-md": "6px",
          "radius-lg": "var(--radius)",
          "radius-xl": "10px",
        },
        light: lightTheme(),
        dark: darkTheme(),
      },
    },
    {
      name: "utils",
      type: "registry:lib",
      title: "Utilities",
      dependencies: [withVersion("clsx"), withVersion("tailwind-merge")],
      files: [
        {
          path: "lib/utils.ts",
          type: "registry:lib",
          target: "@lib/utils.ts",
        },
      ],
    },
    {
      name: "use-mobile",
      type: "registry:hook",
      title: "Use mobile",
      files: [
        {
          path: "hooks/use-mobile.ts",
          type: "registry:hook",
          target: "@hooks/use-mobile.ts",
        },
      ],
    },
    ...componentItems,
  ],
}

await writeFile(
  path.join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`
)

await mkdir(path.join(root, "public/r"), { recursive: true })

console.log(
  `Generated registry.json with ${componentItems.length} reconciled UI items and ${registry.items.length} total registry items.`
)

function collectImports(source) {
  const matches = source.matchAll(
    /(?:from\s+|import\s*\()\s*["']([^"']+)["']/g
  )
  return [...matches].map((match) => match[1])
}

function getPackageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/")
  return specifier.split("/")[0]
}

function withVersion(name) {
  const version =
    packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name]
  return version ? `${name}@${version}` : name
}

function titleCase(name) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
}

function categoriesFor(name) {
  const forms = new Set([
    "button",
    "button-group",
    "checkbox",
    "combobox",
    "field",
    "form",
    "input",
    "input-group",
    "input-otp",
    "label",
    "native-select",
    "radio-group",
    "select",
    "slider",
    "switch",
    "textarea",
    "toggle",
    "toggle-group",
  ])
  const overlays = new Set([
    "alert-dialog",
    "command",
    "context-menu",
    "dialog",
    "drawer",
    "dropdown-menu",
    "hover-card",
    "menubar",
    "popover",
    "sheet",
    "toast",
    "tooltip",
  ])
  const navigation = new Set([
    "breadcrumb",
    "navigation-menu",
    "pagination",
    "sidebar",
    "tabs",
  ])
  const data = new Set([
    "calendar",
    "carousel",
    "chart",
    "progress",
    "resizable",
    "scroll-area",
    "table",
  ])
  const communication = new Set([
    "attachment",
    "bubble",
    "message",
    "message-scroller",
    "questionnaire",
  ])

  if (forms.has(name)) return ["forms"]
  if (overlays.has(name)) return ["overlays"]
  if (navigation.has(name)) return ["navigation"]
  if (data.has(name)) return ["data display"]
  if (communication.has(name)) return ["communication"]
  return ["layout and feedback"]
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"))
}

function lightTheme() {
  return {
  background: "#f5f5f5",
  foreground: "#171717",
  card: "#ffffff",
  "card-foreground": "#171717",
  popover: "#ffffff",
  "popover-foreground": "#171717",
  primary: "#262626",
  "primary-foreground": "#ffffff",
  secondary: "#f0f0f0",
  "secondary-foreground": "#262626",
  muted: "#f0f0f0",
  "muted-foreground": "#737373",
  accent: "#f5f5f5",
  "accent-foreground": "#262626",
  destructive: "#dc2626",
  border: "#e5e5e5",
  input: "#d4d4d4",
  ring: "#3b82f6",
  brand: "#ff591e",
  "brand-secondary": "#fb432c",
  important: "#2563eb",
  success: "#16a34a",
  warning: "#d97706",
  highlight: "#fff2ed",
  "chart-1": "#ff591e",
  "chart-2": "#2563eb",
  "chart-3": "#16a34a",
  "chart-4": "#d97706",
  "chart-5": "#737373",
  radius: "8px",
  "duration-default": "100ms",
  "duration-overlay": "200ms",
  "button-shadow":
    "0 1px 2px rgb(0 0 0 / 0.08), inset 0 1px 0 rgb(255 255 255 / 0.35)",
  "popover-shadow": "0 12px 32px rgb(0 0 0 / 0.14)",
  sidebar: "#fcfcfc",
  "sidebar-foreground": "#171717",
  "sidebar-primary": "#262626",
  "sidebar-primary-foreground": "#ffffff",
  "sidebar-accent": "#f0f0f0",
  "sidebar-accent-foreground": "#262626",
  "sidebar-border": "#e5e5e5",
  "sidebar-ring": "#3b82f6",
  }
}

function darkTheme() {
  return {
  background: "#0d0d0d",
  foreground: "#f5f5f5",
  card: "#171717",
  "card-foreground": "#f5f5f5",
  popover: "#1e1e1e",
  "popover-foreground": "#f5f5f5",
  primary: "#f5f5f5",
  "primary-foreground": "#171717",
  secondary: "#262626",
  "secondary-foreground": "#f5f5f5",
  muted: "#262626",
  "muted-foreground": "#a3a3a3",
  accent: "#313131",
  "accent-foreground": "#f5f5f5",
  destructive: "#ef4444",
  border: "#313131",
  input: "#404040",
  ring: "#3b82f6",
  brand: "#ff591e",
  "brand-secondary": "#fb432c",
  important: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  highlight: "#321b14",
  "chart-1": "#ff591e",
  "chart-2": "#3b82f6",
  "chart-3": "#22c55e",
  "chart-4": "#f59e0b",
  "chart-5": "#a3a3a3",
  sidebar: "#171717",
  "sidebar-foreground": "#f5f5f5",
  "sidebar-primary": "#f5f5f5",
  "sidebar-primary-foreground": "#171717",
  "sidebar-accent": "#262626",
  "sidebar-accent-foreground": "#f5f5f5",
  "sidebar-border": "#313131",
  "sidebar-ring": "#3b82f6",
  }
}
