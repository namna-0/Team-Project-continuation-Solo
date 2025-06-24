"use client";

import * as React from "react";
import {
  Building2,
  Users,
  ShoppingCart,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";

interface AppSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function AppSidebar({ currentPage, setCurrentPage }: AppSidebarProps) {
  const [ordersOpen, setOrdersOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const { company } = useCompanyAuth();
  const menuItems = [
    {
      title: "Ажилчид",
      icon: Users,
      key: "employees",
      onClick: () => setCurrentPage("employees"),
    },
    {
      title: "Захиалгууд",
      icon: ShoppingCart,
      key: "orders",
      hasDropdown: true,
      isOpen: ordersOpen,
      setOpen: setOrdersOpen,
      subItems: [
        {
          title: "Бүх захиалга",
          key: "all-orders",
          onClick: () => setCurrentPage("all-orders"),
        },
        {
          title: "Ажилтны захиалга",
          key: "staff-orders",
          onClick: () => setCurrentPage("staff-orders"),
        },
      ],
    },
    {
      title: "Тохиргоо",
      icon: Settings,
      key: "settings",
      hasDropdown: true,
      isOpen: settingsOpen,
      setOpen: setSettingsOpen,
      subItems: [
        {
          title: "Ерөнхий мэдээлэл",
          key: "general-settings",
          onClick: () => setCurrentPage("general-settings"),
        },
        {
          title: "Компаний зураг",
          key: "images-settings",
          onClick: () => setCurrentPage("images-settings"),
        },
        {
          title: "Байршил",
          key: "location-settings",
          onClick: () => setCurrentPage("location-settings"),
        },
      ],
    },
  ];

  const isActive = (key: string) => currentPage === key;
  const isParentActive = (subItems: any[]) =>
    subItems.some((item) => currentPage === item.key);

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007FFF] text-white">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {company?.companyName}
            </span>
            <span className="text-xs text-muted-foreground">
              Компаний хяналтын самбар
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  {item.hasDropdown ? (
                    <Collapsible open={item.isOpen} onOpenChange={item.setOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "w-full justify-between hover:bg-[#007FFF]/10 hover:text-[#007FFF]",
                            (isParentActive(item.subItems || []) ||
                              item.isOpen) &&
                              "bg-[#007FFF] text-white hover:bg-[#007FFF] hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          {item.isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.key}>
                              <SidebarMenuSubButton
                                onClick={subItem.onClick}
                                className={cn(
                                  "hover:bg-[#007FFF]/10 hover:text-[#007FFF]",
                                  isActive(subItem.key) &&
                                    "bg-[#007FFF] text-white hover:bg-[#007FFF] hover:text-white"
                                )}
                              >
                                {subItem.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      onClick={item.onClick}
                      className={cn(
                        "hover:bg-[#007FFF]/10 hover:text-[#007FFF]",
                        isActive(item.key) &&
                          "bg-[#007FFF] text-white hover:bg-[#007FFF] hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
