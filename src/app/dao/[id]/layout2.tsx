import { DaoProfileCard } from "@/components/dao/profile";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default function DaoLayout({ params: { id }, children }: Props) {
  return (
    <div className="w-screen overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header page="dao" />
          <div className="m-auto flex w-full flex-1 flex-col gap-4 border p-2">
            <DaoProfileCard id={id} />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
