"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import {
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { useTranslations, useLocale } from "next-intl";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = useTranslations("Dashboard.nav");

  const menuItems = [
    { label: t("dashboard"), href: `/${locale}/dashboard`, icon: LayoutDashboard },
    { label: t("clients"), href: `/${locale}/dashboard/clients`, icon: Users },
    { label: t("settings"), href: `/${locale}/dashboard/settings`, icon: Settings },
  ];

  const handleLogout = () => router.push(`/${locale}/login`);

  return (
    <div className={cn(
      "relative flex flex-col bg-card border-r border-border text-foreground transition-all duration-300 z-50",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-6 py-4">
        {!isCollapsed && (
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            CRM PRO
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={20} className="shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors",
            isCollapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span>{t('logout')}</span>}
        </Button>
      </div>
    </div>
  );
}
