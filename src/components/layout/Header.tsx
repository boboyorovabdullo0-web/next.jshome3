"use client";

import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ThemeToggle";
import { LocaleSwitcher } from "../LocaleSwitcher";
import { useTranslations, useLocale } from "next-intl";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Dashboard.header");
  const navT = useTranslations("Dashboard.nav");
  
  // Extract title from pathname
  const segments = pathname.split('/').filter(Boolean);
  const pageTitle = segments[segments.length - 1] || 'Dashboard';
  
  // Try to translate the title if possible
  const displayTitle = pageTitle === 'clients' ? navT('clients') : 
                       pageTitle === 'settings' ? navT('settings') : 
                       pageTitle === 'dashboard' ? navT('dashboard') : 
                       pageTitle;

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8 shadow-sm transition-colors duration-300">
      <h1 className="text-xl font-bold text-foreground">{displayTitle}</h1>
      
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <ThemeToggle />
        
        <div className="h-8 w-px bg-border hidden sm:block mx-1" />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border">
            <User size={18} />
          </div>
          <span className="font-medium hidden sm:inline">{t('admin')}</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push(`/${locale}/login`)} className="hidden sm:flex">
          {navT('logout')}
        </Button>
      </div>
    </header>
  );
}
