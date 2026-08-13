import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Fingerprint,
  Smartphone,
  Laptop,
  Trash2,
  KeyRound,
  Plus,
  Loader2,
  Pencil,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

import {
  type Passkey,
  PasskeyContext,
  usePasskeyContext,
  PasskeyItemContext,
  usePasskeyItemContext,
} from "@/hooks/use-passkey-manager"

export interface PasskeyManagerProps extends React.HTMLAttributes<HTMLDivElement> {
  passkeys: Passkey[]
  onAddPasskey?: () => Promise<void> | void
  onRemovePasskey?: (id: string) => Promise<void> | void
  onUpdatePasskey?: (passkey: Passkey) => Promise<void> | void
  isLoading?: boolean
}

export function PasskeyManager({
  passkeys,
  onAddPasskey,
  onRemovePasskey,
  onUpdatePasskey,
  isLoading = false,
  className,
  children,
  ...props
}: PasskeyManagerProps) {
  return (
    <PasskeyContext.Provider
      value={{ passkeys, isLoading, onAddPasskey, onRemovePasskey, onUpdatePasskey }}
    >
      <div className={cn("flex flex-col space-y-6", className)} {...props}>
        {children}
      </div>
    </PasskeyContext.Provider>
  )
}

// --- Header Components ---

PasskeyManager.Header = function PasskeyManagerHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  )
}

PasskeyManager.Title = function PasskeyManagerTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-2xl leading-none font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

PasskeyManager.Description = function PasskeyManagerDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

// --- List Component ---

PasskeyManager.List = function PasskeyManagerList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { passkeys } = usePasskeyContext()

  // Render function pattern (optional)
  if (typeof children === "function") {
    return (
      <ItemGroup className={className} {...props}>
        {(children as (props: { passkeys: Passkey[] }) => React.ReactNode)({
          passkeys,
        })}
      </ItemGroup>
    )
  }

  return (
    <ItemGroup className={className} {...props}>
      {children}
    </ItemGroup>
  )
}

// --- Item Component ---

export interface PasskeyItemProps extends React.HTMLAttributes<HTMLDivElement> {
  passkey: Passkey
}

PasskeyManager.Item = function PasskeyManagerItem({
  passkey,
  className,
  children,
  ...props
}: PasskeyItemProps & React.ComponentProps<typeof Item>) {
  return (
    <PasskeyItemContext.Provider value={{ passkey }}>
      <Item
        className={className}
        {...props}
      >
        {children}
      </Item>
    </PasskeyItemContext.Provider>
  )
}

// --- Item Details ---

PasskeyManager.ItemIcon = function PasskeyManagerItemIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { passkey } = usePasskeyItemContext()

  let Icon = KeyRound
  const deviceType = passkey.deviceType?.toLowerCase()
  if (deviceType?.includes("phone") || deviceType?.includes("mobile"))
    Icon = Smartphone
  else if (
    deviceType?.includes("mac") ||
    deviceType?.includes("windows") ||
    deviceType?.includes("laptop") ||
    deviceType?.includes("desktop")
  )
    Icon = Laptop
  else if (deviceType?.includes("fingerprint") || deviceType?.includes("touch"))
    Icon = Fingerprint

  return (
    <ItemMedia
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5" />
    </ItemMedia>
  )
}

PasskeyManager.ItemDetails = function PasskeyManagerItemDetails({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { passkey } = usePasskeyItemContext()

  return (
    <>
      <PasskeyManager.ItemIcon />
      <ItemContent className={className} {...props}>
        <ItemTitle>
          {passkey.name || "Passkey"}
        </ItemTitle>
        <ItemDescription>
          Added{" "}
          {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
            passkey.createdAt
          )}
          {passkey.lastUsedAt &&
            ` • Last used ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(passkey.lastUsedAt)}`}
        </ItemDescription>
      </ItemContent>
    </>
  )
}

// --- Actions ---

PasskeyManager.ItemRemoveAction = function PasskeyManagerItemRemoveAction({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { onRemovePasskey } = usePasskeyContext()
  const { passkey } = usePasskeyItemContext()
  const [isRemoving, setIsRemoving] = React.useState(false)

  if (!onRemovePasskey) return null

  const handleRemove = async () => {
    try {
      setIsRemoving(true)
      await onRemovePasskey(passkey.id)
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "shrink-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
        className
      )}
      onClick={handleRemove}
      disabled={isRemoving || props.disabled}
      {...props}
    >
      {isRemoving ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        children || <Trash2 className="h-4 w-4" />
      )}
      <span className="sr-only">Remove Passkey</span>
    </Button>
  )
}

PasskeyManager.ItemActions = function PasskeyManagerItemActions({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ItemActions>) {
  const { onRemovePasskey, onUpdatePasskey } = usePasskeyContext()
  const { passkey } = usePasskeyItemContext()

  if (children) {
    return (
      <ItemActions className={className} {...props}>
        {children}
      </ItemActions>
    )
  }

  if (!onRemovePasskey && !onUpdatePasskey) {
    return null
  }

  return (
    <ItemActions className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onUpdatePasskey && (
            <DropdownMenuItem
              onClick={() => onUpdatePasskey(passkey)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
          )}
          {onRemovePasskey && (
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              onClick={() => onRemovePasskey(passkey.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Remove</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </ItemActions>
  )
}

PasskeyManager.AddAction = function PasskeyManagerAddAction({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { onAddPasskey, isLoading } = usePasskeyContext()
  const [isAdding, setIsAdding] = React.useState(false)

  if (!onAddPasskey) return null

  const handleAdd = async () => {
    setIsAdding(true)
    try {
      await onAddPasskey()
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button
      className={cn("w-full sm:w-auto", className)}
      onClick={handleAdd}
      disabled={isAdding || isLoading || props.disabled}
      {...props}
    >
      {isAdding || isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      {children || "Register a new Passkey"}
    </Button>
  )
}

// --- Empty State ---

PasskeyManager.EmptyState = function PasskeyManagerEmptyState({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { passkeys } = usePasskeyContext()

  if (passkeys.length > 0) return null

  return (
    <Empty className={cn("border-dashed", className)} {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <KeyRound />
        </EmptyMedia>
        <EmptyTitle>No passkeys</EmptyTitle>
        <EmptyDescription>
          You haven't registered any passkeys yet. Add one to sign in securely
          without a password.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children || <PasskeyManager.AddAction />}</EmptyContent>
    </Empty>
  )
}
