"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedPage from "@/components/ProtectedPage";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React from "react";
import DashboardHeader from "../../components/shared/DashboardHeader";
import {
  Compass,
  Globe,
  Inbox,
  LogOut,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userItems = [
    {
      title: "All Conferences",
      url: "/dashboard/all-conferences",
      icon: Globe,
    },
    {
      title: "My Conferences",
      url: "/dashboard/my-conferences",
      icon: Compass,
    },
    {
      title: "My Roles",
      url: "/dashboard/my-roles",
      icon: ShieldCheck,
    },
    {
      title: "Inbox",
      url: "/dashboard/inbox",
      icon: Inbox,
    },
  ];
  const secondaryItems = [
    {
      title: "My Account",
      url: "/dashboard/account",
      icon: UserCircle,
    },
    {
      title: "Logout",
      url: "/dashboard/sign-out",
      icon: LogOut,
    },
  ];
  return (
    <ProtectedPage>
      <SidebarProvider>
        <AppSidebar items={userItems} secondaryItems={secondaryItems} />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedPage>
  );
}

export default DashboardLayout;
