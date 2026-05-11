"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { LocaleSwitcher } from "@/src/components/LocaleSwitcher";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide border border-primary/20 animate-bounce">
          <Sparkles size={16} />
          {t('welcome')}
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight">
          {t('title').split(' ').slice(0, -2).join(' ')} <br />
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            {t('title').split(' ').slice(-2).join(' ')}
          </span>
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all"
          >
            {t('button')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-muted overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              <span className="text-foreground font-bold">500+</span> active users
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}





