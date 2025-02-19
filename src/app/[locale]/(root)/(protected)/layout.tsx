import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import PageContainer from '@/components/layout/page-container';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <PageContainer>{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
