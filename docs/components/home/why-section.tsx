import { readPreviewSource } from "@/components/component-preview"
import { WhySectionClient } from "./why-section-client"

export function WhySection() {
  // Dynamically load the exact preview source code using component-preview.tsx
  const codeSnippet = readPreviewSource("signin/with-social")

  return <WhySectionClient codeSnippet={codeSnippet} />
}
