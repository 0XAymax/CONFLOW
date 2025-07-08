
import { Compass, Globe,Inbox, LogOut, LucideIcon, ShieldCheck, UserCircle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import Logo from "./Logo"
import NavItem from "./nav-item"
interface NavItemInterface {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function AppSidebar({items, secondaryItems}: { items: NavItemInterface[], secondaryItems: NavItemInterface[] }) {
  return (
    <Sidebar>
        <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Logo width={100} height={100} />
        </div>
        </SidebarHeader>
      <SidebarContent>
        <NavItem items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavItem items={secondaryItems} />
      </SidebarFooter>
    </Sidebar>
  )
}