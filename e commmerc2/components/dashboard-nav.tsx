"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Package2, ShoppingCart, BarChart3, Users, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Marketplace</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-2 py-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start gap-2", {
                    "bg-secondary": pathname === item.href,
                  })}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package2,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

