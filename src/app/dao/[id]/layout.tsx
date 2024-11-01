import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart3, FileText, GitFork, Menu, Moon, Search, Settings2, Wallet } from "lucide-react"
import Image from "next/image"
import { daos } from "@/server/db/daos";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default function Component({ params: { id }, children }: Props) {
  const currentDAO = daos.find((dao) => dao.id === id);
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
            <span className="font-semibold">TreasureCorp</span>
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
            <Link href={`/dao/${id}/simulation`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings2 className="h-4 w-4" />
                Simulation
              </Button>
            </Link>
          </nav>
          <div className="text-center mt-20 mb-4"> 
            <h3 className="text-sm font-semibold mb-1">Under Construction</h3> 
            <p className="text-sm">👩‍🏗️</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header Banner */}
          <div className="h-40 bg-muted/60 relative">
            <div className="absolute bottom-4 left-4 flex items-end gap-4">
              <div className="h-20 w-20 rounded-full bg-grey-500 border-4 border-grey-200 overflow-hidden">
                <img
                  src={currentDAO.avatarSrc}
                  alt="DAO Logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {currentDAO.name}
                  <Badge variant="secondary">Verified</Badge>
                </h1>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>${currentDAO.treasury} Total Value</span>
                  <span>•</span>
                  <span>{currentDAO.members} Holders</span>
                  <span>•</span>
                  <span className="text-purple-700">We're on our way to the moon (literally).</span>
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