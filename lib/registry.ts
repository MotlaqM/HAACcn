import registry from "@/registry.json"

type RegistryFile = {
  path: string
  type: string
  target?: string
}

export type RegistryItem = {
  name: string
  type: string
  title?: string
  description?: string
  docs?: string
  categories?: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
}

export const registryItems = registry.items as RegistryItem[]
export const componentItems = registryItems.filter(
  (item) => item.type === "registry:ui"
)

export const componentGroups = Object.entries(
  componentItems.reduce<Record<string, RegistryItem[]>>((groups, item) => {
    const category = item.categories?.[0] ?? "components"
    groups[category] ??= []
    groups[category].push(item)
    return groups
  }, {})
).sort(([a], [b]) => a.localeCompare(b))

export function getComponent(name: string) {
  return componentItems.find((item) => item.name === name)
}

export function installCommand(name: string) {
  return `npx shadcn@latest add MotlaqM/HAACcn/${name}`
}

export function stateGuidance(item: RegistryItem) {
  const category = item.categories?.[0]
  const common = [
    "Default uses semantic foreground, surface, and border roles from design.md.",
    "Keyboard focus is visible with the shared blue focus ring.",
    "Disabled state stays legible and prevents interaction.",
  ]

  if (category === "forms") {
    return [
      ...common,
      "Invalid state places the error signal beside the affected control.",
      "Labels and helper text explain requirements before submission.",
    ]
  }

  if (category === "overlays") {
    return [
      ...common,
      "Open and closed states use a short fade or scale transition.",
      "Content keeps its title, context, and dismissal path visible.",
    ]
  }

  if (category === "navigation") {
    return [
      ...common,
      "Current and selected state remains visible without relying on color alone.",
      "Collapsed or responsive modes preserve orientation and recovery.",
    ]
  }

  if (category === "data display") {
    return [
      ...common,
      "Empty and loading states preserve the collection's structure.",
      "Dense variants reduce decoration before they remove useful context.",
    ]
  }

  return [
    ...common,
    "Hover and active treatment reveals controls without competing with content.",
    "Loading, empty, and error states use calm copy and one recovery action.",
  ]
}
