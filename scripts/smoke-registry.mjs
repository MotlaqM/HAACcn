import { execFileSync } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

const registry = process.env.HAACCN_REGISTRY ?? "MotlaqM/HAACcn"
const consumer = await mkdtemp(path.join(os.tmpdir(), "haaccn-consumer-"))
const cases = [
  ["simple", "button", "components/ui/button.tsx"],
  ["dependent", "input-group", "components/ui/input-group.tsx"],
  ["form", "form", "components/ui/field.tsx"],
  ["overlay", "alert-dialog", "components/ui/alert-dialog.tsx"],
  ["chart", "chart", "components/ui/chart.tsx"],
  ["sidebar", "sidebar", "components/ui/sidebar.tsx"],
  ["calendar", "calendar", "components/ui/calendar.tsx"],
]

try {
  await createConsumer()
  run("npm", ["install", "--no-audit", "--no-fund", "--ignore-scripts"])

  for (const [family, item, expectedFile] of cases) {
    console.log(`Installing ${family} case: ${item}`)
    run("npx", [
      "--yes",
      "shadcn@latest",
      "add",
      `${registry}/${item}`,
      "--yes",
      "--overwrite",
    ])
    await readFile(path.join(consumer, expectedFile), "utf8")
  }

  run("npx", ["tsc", "--noEmit"])
  console.log(
    `Consumer smoke test passed for ${cases.length} representative registry families.`
  )
} finally {
  if (process.env.KEEP_HAACCN_SMOKE !== "1") {
    await rm(consumer, { recursive: true, force: true })
  } else {
    console.log(`Preserved smoke consumer at ${consumer}`)
  }
}

async function createConsumer() {
  await Promise.all([
    mkdir(path.join(consumer, "app"), { recursive: true }),
    mkdir(path.join(consumer, "lib"), { recursive: true }),
  ])

  await Promise.all([
    writeJson("package.json", {
      name: "haaccn-smoke-consumer",
      private: true,
      version: "0.0.0",
      dependencies: {
        next: "16.2.6",
        react: "19.2.4",
        "react-dom": "19.2.4",
      },
      devDependencies: {
        "@tailwindcss/postcss": "^4.1.0",
        "@types/node": "^22.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        tailwindcss: "^4.1.0",
        typescript: "^5.9.0",
      },
    }),
    writeJson("components.json", {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "base-nova",
      rsc: true,
      tsx: true,
      tailwind: {
        config: "",
        css: "app/globals.css",
        baseColor: "neutral",
        cssVariables: true,
        prefix: "",
      },
      iconLibrary: "lucide",
      rtl: false,
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
    }),
    writeJson("tsconfig.json", {
      compilerOptions: {
        target: "ES2022",
        lib: ["dom", "dom.iterable", "esnext"],
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        paths: { "@/*": ["./*"] },
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    }),
    writeFile(
      path.join(consumer, "app/globals.css"),
      '@import "tailwindcss";\n@import "tw-animate-css";\n'
    ),
    writeFile(
      path.join(consumer, "lib/utils.ts"),
      'export function placeholder() { return "consumer" }\n'
    ),
  ])
}

function run(command, args) {
  execFileSync(command, args, {
    cwd: consumer,
    env: process.env,
    stdio: "inherit",
  })
}

async function writeJson(relativePath, value) {
  await writeFile(
    path.join(consumer, relativePath),
    `${JSON.stringify(value, null, 2)}\n`
  )
}
