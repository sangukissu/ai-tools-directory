"use client"

import Link from "next/link"
import { Search, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Dialog from '@radix-ui/react-dialog'
import { ComponentPropsWithoutRef } from "react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "GPT Store", href: "/gpt-store" },
  { name: "Shorts Video", href: "/shorts-video" },
  { name: "Blog", href: "/blog" },
  { name: "Submit AI Tool", href: "/submit" },
]

const MotionDialogContent = motion.create(
  forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Dialog.Content>>(
    (props, ref) => <Dialog.Content ref={ref} {...props} />
  )
)

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="w-full bg-black text-white py-1 px-4 text-center border-b border-gray-800">
        🏆 Ranking #1 in AI Tools – Submit Your Tool Today! 🚀
      </div>
      <header className="sticky top-0 z-50 border-b bg-black border-gray-800">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg"
              alt="FindMyAITool"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white">findmyaitool</span>
          </Link>
          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-white cursor-pointer hover:text-gray-300 transition-colors" />
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </header>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-black/50 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <MotionDialogContent
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-black p-6 shadow-xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/placeholder.svg"
                      alt="FindMyAITool"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-xl font-bold text-white">findmyaitool</span>
                  </Link>
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6 text-white" />
                    </Button>
                  </Dialog.Close>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-gray-300 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </MotionDialogContent>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  )
}

