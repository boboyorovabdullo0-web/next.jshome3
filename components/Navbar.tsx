"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
  { label: "Тоҷикӣ", value: "tj" },
];

export default function Navbar() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    const newPath = `/${nextLocale}${pathname.replace(
      `/${locale}`,
      ""
    )}`;

    router.push(newPath);
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "16px 32px",
        borderBottom: "1px solid #eee",
      }}
    >
      <select
        value={locale}
        onChange={handleChange}
        className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
      >
        {locales.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}