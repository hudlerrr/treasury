import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header page="dao" />
          <div className="m-auto flex w-full flex-1 flex-col gap-4 border pt-0 md:max-w-2xl">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
