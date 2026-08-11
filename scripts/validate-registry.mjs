import { access, readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const [inventory, registry] = await Promise.all([
  readJson("scripts/upstream-ui.json"),
  readJson("registry.json"),
])

const errors = []
const uiItems = registry.items.filter((item) => item.type === "registry:ui")
const names = uiItems.map((item) => item.name).sort()
const uniqueNames = new Set(registry.items.map((item) => item.name))

assert(
  uniqueNames.size === registry.items.length,
  "registry item names must be unique"
)
assert(
  JSON.stringify(names) === JSON.stringify([...inventory].sort()),
  "registry:ui items must exactly match scripts/upstream-ui.json"
)

for (const item of uiItems) {
  const dependencies = item.registryDependencies ?? []
  assert(
    dependencies.includes("MotlaqM/HAACcn/haac-theme"),
    `${item.name} must depend on the HAACcn theme`
  )
  assert(
    dependencies.includes("MotlaqM/HAACcn/inter"),
    `${item.name} must depend on Inter`
  )

  for (const dependency of dependencies) {
    assert(
      dependency.startsWith("MotlaqM/HAACcn/"),
      `${item.name} contains a non-HAACcn registry dependency: ${dependency}`
    )
  }

  if (item.name === "form") {
    assert(
      !item.files?.length,
      "form must remain metadata-only to match the current upstream contract"
    )
    assert(
      dependencies.includes("MotlaqM/HAACcn/field"),
      "form must route consumers to field"
    )
    continue
  }

  assert(item.files?.length === 1, `${item.name} must contain one source file`)
  for (const file of item.files ?? []) {
    try {
      await access(path.join(root, file.path))
    } catch {
      errors.push(`${item.name} points to missing file ${file.path}`)
    }
  }
}

const sourceNames = (await readdir(path.join(root, "components/ui")))
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.replace(/\.tsx$/, ""))
  .sort()

assert(
  JSON.stringify(sourceNames) ===
    JSON.stringify(inventory.filter((name) => name !== "form").sort()),
  "component sources must exactly match the inventory except metadata-only form"
)

for (const required of ["haac-theme", "inter", "utils", "use-mobile"]) {
  assert(uniqueNames.has(required), `registry is missing foundation item ${required}`)
}

if (errors.length) {
  console.error(`Registry validation failed:\n- ${errors.join("\n- ")}`)
  process.exit(1)
}

console.log(
  `Registry validation passed: ${uiItems.length} UI items, ${sourceNames.length} source components, ${registry.items.length} total items.`
)

function assert(condition, message) {
  if (!condition) errors.push(message)
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"))
}
