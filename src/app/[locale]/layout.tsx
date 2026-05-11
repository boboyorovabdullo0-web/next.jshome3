import { routing } from '@/src/i18n/routing';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { StoreProvider } from '@/src/store/StoreProvider';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import './globals.css';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased transition-colors duration-300">
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}