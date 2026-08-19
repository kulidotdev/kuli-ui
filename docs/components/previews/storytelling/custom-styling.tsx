"use client"

import * as React from "react"
import {
  Storytelling,
  StorytellingContent,
} from "@kuli-ui/components/components/ui/storytelling"

export function StorytellingCustomStyling() {
  return (
    <div className="w-full max-w-3xl">
      <Storytelling stepCount={2}>
        <StorytellingContent
          // Custom styling for the narrative text container
          narrativeClassName="rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-6 sm:p-10 border border-indigo-500/20 shadow-xl"
          // Custom styling for the preview card
          previewClassName="rounded-[2rem] border-2 border-fuchsia-500/30 bg-black/40 backdrop-blur-xl p-8 shadow-2xl ring-4 ring-fuchsia-500/10"
          steps={[
            {
              narrative: (
                <div className="space-y-4">
                  <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                    Total Aesthetic Freedom
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Because the component is entirely unopinionated about padding, borders, and backgrounds, you can apply extreme custom designs—like glassmorphism, glowing borders, and gradient text—without fighting built-in styles.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-square sm:aspect-[4/3] w-full items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-inner">
                  <span className="font-bold text-white text-2xl drop-shadow-md">Beautiful UI</span>
                </div>
              ),
            },
            {
              narrative: (
                <div className="space-y-4">
                  <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Bring Your Own Styles
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Notice how the preview card has a custom border radius (`rounded-[2rem]`), a double border, and ring effects. Everything flows perfectly with the animation engine.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-square sm:aspect-[4/3] w-full items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-inner">
                  <span className="font-bold text-white text-2xl drop-shadow-md">No Friction</span>
                </div>
              ),
            },
          ]}
        />
      </Storytelling>
    </div>
  )
}
