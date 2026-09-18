"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

const options: Array<{
  value: ThemePreference;
  label: string;
  icon: typeof Monitor;
}> = [
  { value: "system", label: "Samodejno", icon: Monitor },
  { value: "light", label: "Svetlo", icon: Sun },
  { value: "dark", label: "Temno", icon: Moon },
];

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(preference: ThemePreference) {
  const resolved = preference === "system" ? getSystemTheme() : preference;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("laztek-theme");
    const initialPreference: ThemePreference =
      stored === "light" || stored === "dark" ? stored : "system";

    setPreference(initialPreference);
    setResolvedTheme(applyTheme(initialPreference));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemThemeChange = () => {
      const currentPreference =
        document.documentElement.dataset.themePreference;
      if (!currentPreference || currentPreference === "system") {
        setResolvedTheme(applyTheme("system"));
      }
    };

    media.addEventListener("change", onSystemThemeChange);
    return () => media.removeEventListener("change", onSystemThemeChange);
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function selectPreference(nextPreference: ThemePreference) {
    if (nextPreference === "system") {
      window.localStorage.removeItem("laztek-theme");
    } else {
      window.localStorage.setItem("laztek-theme", nextPreference);
    }

    setPreference(nextPreference);
    setResolvedTheme(applyTheme(nextPreference));
    setOpen(false);
  }

  const ActiveIcon =
    preference === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div ref={wrapperRef} className="relative z-[300]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-200/15 bg-white/[0.045] text-cyan-100/70 transition hover:border-cyan-200/35 hover:bg-cyan-300/[0.10] hover:text-cyan-50"
        aria-label="Nastavitev barvnega načina"
        aria-haspopup="menu"
        aria-expanded={open}
        title={`Tema: ${options.find((option) => option.value === preference)?.label}`}
      >
        <ActiveIcon className="h-4 w-4" aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Barvni način"
          className="absolute right-0 top-[calc(100%+10px)] w-44 overflow-hidden rounded-xl border border-cyan-200/15 bg-[#061521]/[0.98] p-1.5 shadow-[0_20px_55px_rgba(0,5,12,.65)] backdrop-blur-xl"
        >
          {options.map((option) => {
            const Icon = option.icon;
            const selected = preference === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => selectPreference(option.value)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                  selected
                    ? "bg-cyan-300/[0.10] text-cyan-100"
                    : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 text-cyan-300/75" aria-hidden="true" />
                <span className="flex-1">{option.label}</span>
                {selected ? (
                  <Check
                    className="h-3.5 w-3.5 text-cyan-300"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
