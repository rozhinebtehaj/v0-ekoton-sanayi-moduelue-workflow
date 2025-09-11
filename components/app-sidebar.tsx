"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Leaf, Info, ClipboardList, BarChart3, FileText, TrendingUp, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Bilgi Paneli",
    url: "/dashboard/info",
    icon: Info,
  },
  {
    title: "Veri Girişi",
    url: "/dashboard/data-entry",
    icon: ClipboardList,
  },
  {
    title: "Değerlendirme",
    url: "/dashboard/assessment",
    icon: BarChart3,
  },
  {
    title: "Rapor",
    url: "/dashboard/report",
    icon: FileText,
  },
  {
    title: "İzleme",
    url: "/dashboard/monitoring",
    icon: TrendingUp,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center space-x-2 px-2 py-2">
          <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">EKOTON</h2>
            <p className="text-xs text-muted-foreground">Sanayi Modülü</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Yeşil Dönüşüm Süreci</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Hesap</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Ayarlar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center space-x-3 px-2 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Sanayi A.Ş.</p>
            <p className="text-xs text-muted-foreground truncate">admin@sanayias.com</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
