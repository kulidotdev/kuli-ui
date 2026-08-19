import { readFileSync } from "node:fs"
import { join } from "node:path"
import { Tabs, Tab } from "fumadocs-ui/components/tabs"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { previewRegistry } from "./previews/registry"
import { registryUrl } from "@/lib/shared"
import { cn } from "@/lib/cn"

export function readPreviewSource(name: string): string {
  const filePath = join(process.cwd(), "components/previews", `${name}.tsx`)
  const raw = readFileSync(filePath, "utf8")

  // Strip 'use client' directive and blank line after it
  return (
    raw
      .replace(/^'use client';\n\n?/m, "")
      // Rewrite workspace import to be copy-paste friendly
      .replace(/@kuli-ui\/components\/components\//g, "@/components/")
      .replace(/@kuli-ui\/components\/hooks\//g, "@/hooks/")
      .replaceAll("REGISTRY_URL", registryUrl)
      .trim()
  )
}

interface ComponentPreviewProps {
  name: string
  centered?: boolean
  className?: string
}

export function ComponentPreview({
  name,
  centered = true,
  className,
}: ComponentPreviewProps) {
  const Component = previewRegistry[name]

  if (!Component) {
    return (
      <div className="rounded-xl border border-destructive p-4 text-sm text-destructive">
        Preview not found: <code>{name}</code>
      </div>
    )
  }

  const source = readPreviewSource(name)

  return (
    <Tabs
      items={["Preview", "Code"]}
      className={cn("not-prose my-6 overflow-visible", className)}
    >
      <Tab value="Preview">
        <div
          className={cn(
            "preview-root rounded-xl border px-4 py-12",
            centered && "flex items-center justify-center"
          )}
        >
          <Component />
        </div>
      </Tab>
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={source} />
      </Tab>
    </Tabs>
  )
}

export { previewRegistry as registry }
