'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">γ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">γ-Secretase Database</h1>
              <p className="text-xs text-slate-400">Comparative Analysis Platform</p>
            </div>
          </Link>



          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-cyan-400">
                  Subunits
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-[480px] gap-4 p-4 max-w-[90vw]">
                    {/* Left side - Main intro */}
                    <div className="flex-1">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-slate-800 to-slate-900 p-6 no-underline outline-none focus:shadow-md"
                          href="/subunits"
                         >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            γ-Secretase Subunits
                          </div>
                          <p className="text-sm leading-tight text-slate-400">
                            Explore the four essential subunits of the γ-secretase complex
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>

                    {/* Right side - Subunit list */}
                    <div className="flex-1 space-y-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/subunits/psen1"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400"
                         >
                          <div className="text-sm font-medium leading-none text-white">PSEN1</div>
                          <p className="text-xs leading-snug text-slate-400">
                            Catalytic subunit containing active site
                          </p>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/subunits/nct"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400"
                         >
                          <div className="text-sm font-medium leading-none text-white">NCT</div>
                          <p className="text-xs leading-snug text-slate-400">
                            Substrate receptor subunit
                          </p>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/subunits/aph1"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400"
                         >
                          <div className="text-sm font-medium leading-none text-white">APH-1</div>
                          <p className="text-xs leading-snug text-slate-400">
                            Stabilizing subunit
                          </p>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/subunits/pen2"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400"
                         >
                          <div className="text-sm font-medium leading-none text-white">PEN-2</div>
                          <p className="text-xs leading-snug text-slate-400">
                            Assembly cofactor subunit
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/species" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Species Index
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/evolution" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Evolution
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-cyan-400">
                  Complex
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[350px] md:w-[380px] lg:w-[420px] lg:grid-cols-[.75fr_1fr] max-w-[90vw]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-slate-800 to-slate-900 p-6 no-underline outline-none focus:shadow-md"
                          href="/complex"
                         >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            γ-Secretase Complex
                          </div>
                          <p className="text-sm leading-tight text-slate-400">
                            Assembly and interactions of the complete complex
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/interactions"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400"
                         >
                          <div className="text-sm font-medium leading-none text-white">Interactions</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                            Subunit-subunit interactions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/complex"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:bg-slate-800 focus:text-cyan-400"
                         >
                          <div className="text-sm font-medium leading-none text-white">Assembly</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                            Complex assembly pathway
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-300 hover:text-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md">
                Home
              </Link>
              <Link href="/species" className="px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md">
                Species Index
              </Link>
              <Link href="/evolution" className="px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-md">
                Evolution
              </Link>
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-slate-400 mb-2">Subunits</div>
                <div className="ml-4 space-y-1">
                  <Link href="/subunits/psen1" className="block py-1 text-slate-300 hover:text-cyan-400">PSEN1</Link>
                  <Link href="/subunits/nct" className="block py-1 text-slate-300 hover:text-cyan-400">NCT</Link>
                  <Link href="/subunits/aph1" className="block py-1 text-slate-300 hover:text-cyan-400">APH-1</Link>
                  <Link href="/subunits/pen2" className="block py-1 text-slate-300 hover:text-cyan-400">PEN-2</Link>
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-slate-400 mb-2">Complex</div>
                <div className="ml-4 space-y-1">
                  <Link href="/interactions" className="block py-1 text-slate-300 hover:text-cyan-400">Interactions</Link>
                  <Link href="/complex" className="block py-1 text-slate-300 hover:text-cyan-400">Assembly</Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
