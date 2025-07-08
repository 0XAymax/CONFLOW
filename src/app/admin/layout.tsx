"use client";
import AdminPage from "@/components/AdminPage";
import React from "react";
import { Globe, Inbox, LogOut } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";
function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminItems =[
    {
      title: "Conference Requests",
      url: "/admin/conference-requests",
      icon: Globe,
    },
    {
      title: "Inbox",
      url: "/admin/inbox",
      icon: Inbox,
    },
  ]
  const secondaryItems = [
  {
    title: "Logout",
    url: "/dashboard/sign-out",
    icon: LogOut,
  },
]
  return (
    <AdminPage>
      <SidebarProvider>
        <AppSidebar items={adminItems} secondaryItems={secondaryItems} />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AdminPage>
  );
}

export default AdminLayout;