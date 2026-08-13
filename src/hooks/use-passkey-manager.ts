import * as React from "react"

export interface Passkey {
  id: string
  name?: string
  createdAt: Date
  lastUsedAt?: Date
  deviceType?: string
  backedUp?: boolean
  [key: string]: any
}

export interface PasskeyContextValue {
  passkeys: Passkey[]
  isLoading: boolean
  onAddPasskey?: () => Promise<void> | void
  onRemovePasskey?: (id: string) => Promise<void> | void
  onUpdatePasskey?: (passkey: Passkey) => Promise<void> | void
}

export const PasskeyContext = React.createContext<PasskeyContextValue | undefined>(undefined)

export function usePasskeyContext() {
  const context = React.useContext(PasskeyContext)
  if (!context) {
    throw new Error("PasskeyManager components must be used within a PasskeyManager")
  }
  return context
}

export interface PasskeyItemContextValue {
  passkey: Passkey
}

export const PasskeyItemContext = React.createContext<PasskeyItemContextValue | undefined>(undefined)

export function usePasskeyItemContext() {
  const context = React.useContext(PasskeyItemContext)
  if (!context) {
    throw new Error("PasskeyManager item components must be used within a PasskeyManager.Item")
  }
  return context
}
