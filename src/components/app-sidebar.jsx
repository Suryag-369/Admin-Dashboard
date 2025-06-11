import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconDoorExit,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: Users,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: IconChartBar,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Optional: Clear tokens or session storage
    localStorage.removeItem('accessToken')
    navigate("/login")
  }

  return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Kapil Agro</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                <Dialog open={open} onOpenChange={setOpen}>
                  <SidebarMenuItem>
                    <DialogTrigger asChild>
                      <SidebarMenuButton>
                        <IconDoorExit />
                        Log Out
                      </SidebarMenuButton>
                    </DialogTrigger>
                  </SidebarMenuItem>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure you want to log out?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleLogout}>
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
  )
}
