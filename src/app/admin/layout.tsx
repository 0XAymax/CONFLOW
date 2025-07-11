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
      <header className="flex justify-between items-center h-16 py-3 px-5.5 border-border border-b-1">
        <Link href="/admin" className="flex items-center gap-2">
          <Logo height={120} width={110} />
          <span className="text-xl text-slate-900 font-bold">Admin</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/admin/conference-requests"
            className="text-[#64748b] hover:text-[#0f172a] transition-colors font-medium"
          >
            Conference Requests
          </Link>
          <Link
            href="/admin/inbox"
            className="text-[#64748b] hover:text-[#0f172a] transition-colors font-medium"
          >
            Inbox
          </Link>
        </nav>
        <div className="flex gap-4">
          <Button
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            Sign Out
          </Button>
          <ModeToggle />
        </div>
      </header>
      {children}
    </AdminPage>
  );
}

export default AdminLayout;