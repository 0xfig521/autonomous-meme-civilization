import { useState, useCallback, type ReactNode } from "react";
import { en } from "./en";
import { zh, type TranslationMap } from "./zh";
import { I18nContext } from "./useI18n";
import type { Locale } from "./useI18n";

const translations: Record<Locale, TranslationMap> = { en, zh };

function resolvePath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{\{(.+?)\}\}/g, (_, key: string) => {
    const value = params[key.trim()];
    return value !== undefined ? String(value) : `{{${key.trim()}}}`;
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "zh" : "en"));
  }, []);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>): string => {
      const map = translations[locale];
      const value = resolvePath(map, path);
      if (typeof value === "string") {
        return interpolate(value, params);
      }
      if (Array.isArray(value)) {
        return String(value.length);
      }
      console.warn(`[i18n] Missing translation key: ${path} for locale: ${locale}`);
      return path;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
