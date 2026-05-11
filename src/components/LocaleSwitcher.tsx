"use client";

import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";

const locales = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "tj", name: "Тоҷикӣ" },
];

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as string;

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1 border border-border transition-colors">
      <Globe size={16} className="text-muted-foreground" />
      <select
        value={currentLocale}
        onChange={handleLocaleChange}
        className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-foreground"
      >
        {locales.map((loc) => (
          <option key={loc.code} value={loc.code} className="bg-card text-foreground">
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
