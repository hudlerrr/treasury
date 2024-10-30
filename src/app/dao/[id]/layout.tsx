import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart3, FileText, GitFork, Menu, Moon, Search, Settings2, Wallet } from "lucide-react"
import Image from "next/image"

type Props = {
    children: React.ReactNode;
    params: {
      id: string;
    };
  };

export default function Component({ params: { id }, children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <span className="font-semibold">TreasuryDAO</span>
          </div>
          <div className="flex-1 flex items-center gap-4 ml-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search treasury metrics..."
                className="pl-8 w-full bg-muted"
              />
            </div>
          </div>
          <Button variant="outline">Connect Wallet</Button>
          <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:flex w-56 flex-col border-r h-[calc(100vh-4rem)]">
          <nav className="grid gap-1 p-4">
            <Link href={`/dao/${id}/overview`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wallet className="h-4 w-4" />
                Overview
              </Button>
            </Link>
            <Link href={`/dao/${id}/governance`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <GitFork className="h-4 w-4" />
                Governance
              </Button>
            </Link>
            <Link href={`/dao/${id}/analytics`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href={`/dao/${id}/reporting`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Reporting
              </Button>
            </Link>
            <Link href={`/dao/${id}/forecasting`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings2 className="h-4 w-4" />
                Scenario Planning
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header Banner */}
          <div className="h-40 bg-muted/30 relative">
            <div className="absolute bottom-4 left-4 flex items-end gap-4">
              <div className="h-20 w-20 rounded-full bg-background border-4 border-background overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="DAO Logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  TreasuryDAO
                  <Badge variant="secondary">Verified</Badge>
                </h1>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>$1.2M Total Value</span>
                  <span>•</span>
                  <span>24 Assets</span>
                  <span>•</span>
                  <span>156 Holders</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button>Follow</Button>
            </div>
          </div>

          {/* Render the children (default to Overview if no specific page is selected) */}
          {children}
        </main>
      </div>
    </div>
  )
}