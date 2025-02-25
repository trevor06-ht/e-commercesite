import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Marketplace
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="grid gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Your One-Stop Marketplace</h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Buy and sell products from thousands of verified vendors. Join our marketplace today.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold">For Buyers</h3>
              <p className="mt-2 text-muted-foreground">Find unique products from verified sellers worldwide.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold">For Sellers</h3>
              <p className="mt-2 text-muted-foreground">Reach customers globally and grow your business.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="mt-2 text-muted-foreground">Safe and secure transactions with buyer protection.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

