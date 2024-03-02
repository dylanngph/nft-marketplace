"use client";

import { NextUIProvider } from "@nextui-org/react";
import { LazyMotion, domMax } from "framer-motion";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax}>
      <NextUIProvider>{children}</NextUIProvider>
    </LazyMotion>
  );
}

export default ThemeProvider;
