"use client"

import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/config"
import { Info } from "@phosphor-icons/react"
import Image from "next/image"

const InfoContent = () => (
  <div className="space-y-4">
    <p className="text-foreground leading-relaxed">
      {APP_DESCRIPTION} Built with Vercel&apos;s AI SDK, Supabase, and prompt-kit
      components.
    </p>
    <p className="text-foreground leading-relaxed">
      The code is available on{" "}
      <a
        href="https://github.com/ajanraj/OpenChat"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        GitHub
      </a>
      . Edited by{" "}
      <a
        href="https://twitter.com/ajanraj25"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        @ibelick
      </a>
      .
    </p>
  </div>
)

const defaultTrigger = (
  <Button
    variant="ghost"
    size="icon"
    className="bg-background/80 hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
    aria-label={`About ${APP_NAME}`}
  >
    <Info className="size-4" />
  </Button>
)

type AppInfoProps = {
  trigger?: React.ReactNode
}

export function AppInfo({ trigger = defaultTrigger }: AppInfoProps) {
  const isMobile = useBreakpoint(768)

  if (isMobile) {
    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent className="bg-background border-border">
            <DrawerHeader>
              <Image
                src="/banner_ocean.jpg"
                alt={`calm paint generate by ${APP_NAME}`}
                className="h-32 w-full object-cover"
                width={400}
                height={128}
              />
              <DrawerTitle className="hidden">{APP_NAME}</DrawerTitle>
              <DrawerDescription className="hidden">
                Your minimalist AI chat companion
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-6">
              <InfoContent />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="[&>button:last-child]:bg-background gap-0 overflow-hidden rounded-3xl p-0 shadow-xs sm:max-w-md [&>button:last-child]:rounded-full [&>button:last-child]:p-1">
          <DialogHeader className="p-0">
            <Image
              src="/banner_ocean.jpg"
              alt={`calm paint generate by ${APP_NAME}`}
              className="h-32 w-full object-cover"
              width={400}
              height={128}
            />
            <DialogTitle className="hidden">{APP_NAME}</DialogTitle>
            <DialogDescription className="hidden">
              Your minimalist AI chat companion
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <InfoContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
