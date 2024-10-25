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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
