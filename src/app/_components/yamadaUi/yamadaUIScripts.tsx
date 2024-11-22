"use client";

// import { config } from "@/theme"
import {
  ColorModeScript,
  defaultConfig,
  ThemeSchemeScript,
} from "@yamada-ui/react";

export function YamadaUIScripts() {
  // 事細かに決めたい場合
  //   const { initialThemeScheme, initialColorMode } = { ...config };
  const { initialThemeScheme, initialColorMode } = { ...defaultConfig };
  return (
    <>
      <ThemeSchemeScript initialThemeScheme={initialThemeScheme} />
      <ColorModeScript initialColorMode={initialColorMode} />
    </>
  );
}
