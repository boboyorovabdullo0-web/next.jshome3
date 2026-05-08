import Link from "next/link";
import "./globals.css"
import { Sparkles, Heart, ShoppingBag, Camera } from "lucide-react";
import {useTranslations} from 'next-intl';

export default function HomePage() {
const t = useTranslations('HomePage');
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fffcfd] text-zinc-800 selection:bg-pink-100 selection:text-pink-600">
      <div className="absolute -left-20 -top-20 h-[500px] w-[500px] animate-pulse rounded-full bg-pink-200/20 blur-[100px]"></div>
      <div className="absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full bg-purple-200/20 blur-[120px]"></div>
      
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center md:py-36">
        <div className="group mb-8 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/40 px-4 py-1.5 shadow-sm backdrop-blur-md transition-all hover:bg-white/80">
          <Sparkles className="h-4 w-4 animate-spin-slow text-pink-500" />
          <span className="text-sm font-medium tracking-wide text-zinc-600">
            {t('badge')}
          </span>
        </div>

        <h1 className="max-w-5xl bg-gradient-to-br from-zinc-900 via-pink-800 to-purple-900 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl md:text-8xl">
          {t('title')}
        </h1>

        <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-zinc-500 md:text-xl">
          {t('description')}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-zinc-900 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-xl"
          >
            <span className="relative z-10">{t('contactBtn')}</span>
            <Heart className="relative z-10 h-5 w-5 transition-transform group-hover:scale-110" />
          </Link>

          <button className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-10 py-4 text-lg font-bold shadow-sm transition-all hover:border-pink-200 hover:bg-pink-50/50">
            <ShoppingBag className="h-5 w-5" />
            {t('catalogBtn')}
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-center gap-4 mb-10">
           <Camera className="text-pink-400" />
           <h2 className="text-2xl font-bold italic text-zinc-400">#knitting_magic</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-64 rounded-[32px] bg-zinc-200 animate-pulse overflow-hidden group">
             <div className="w-full h-full bg-gradient-to-tr from-pink-100 to-purple-100 transition-transform duration-700 group-hover:scale-110"></div>
          </div>
          <div className="h-64 mt-8 rounded-[32px] bg-zinc-200 animate-pulse overflow-hidden group">
             <div className="w-full h-full bg-gradient-to-tr from-purple-100 to-blue-100 transition-transform duration-700 group-hover:scale-110"></div>
          </div>
          <div className="h-64 rounded-[32px] bg-zinc-200 animate-pulse overflow-hidden group">
             <div className="w-full h-full bg-gradient-to-tr from-rose-100 to-pink-200 transition-transform duration-700 group-hover:scale-110"></div>
          </div>
          <div className="h-64 mt-8 rounded-[32px] bg-zinc-200 animate-pulse overflow-hidden group">
             <div className="w-full h-full bg-gradient-to-tr from-orange-50 to-pink-100 transition-transform duration-700 group-hover:scale-110"></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-pink-50">
        <div className="flex flex-col gap-16 md:flex-row md:items-center">
          <div className="relative flex-1">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[40px] border-2 border-dashed border-pink-200"></div>
            <div className="relative overflow-hidden rounded-[40px] bg-white p-8 shadow-sm md:p-12">
              <h2 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">
                {t('aboutTitle')}
              </h2>
              <div className="space-y-4 text-lg text-zinc-600">
                <p>Мы используем только натуральные составы: меринос, хлопок и ангору.</p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6 pt-8 border-t border-zinc-50">
                <div>
                  <p className="text-3xl font-black text-pink-500">100%</p>
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-tighter">{t('statsHandmade')}</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-purple-500">500+</p>
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-tighter">{t('statsClients')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-zinc-900 rounded-[40px] p-10 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 italic text-pink-400">Handmade Quality</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Вязание — это не просто ремесло, а способ передать тепло рук тем, кто ценит уникальность. Каждая петелька пропитана заботой.
              </p>
              <div className="h-px bg-zinc-800 w-full mb-6"></div>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">Est. 2026 / Local Craft</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50/50 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">{t('faqTitle')}</h2>
          <div className="space-y-4">
            <details className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-zinc-800 list-none">
                Как заказать?
                <span className="text-pink-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-zinc-600 border-t pt-4">Просто нажмите кнопку "Связаться" и напишите нам в удобный мессенджер.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-zinc-100">
        <p className="text-sm text-zinc-400 tracking-widest uppercase">© 2026 Warm Knits Studio</p>
      </footer>
    </main>
  );
}