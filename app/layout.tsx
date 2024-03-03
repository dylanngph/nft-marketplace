import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/libs/contexts/theme";
import { Web3Providers } from "@/libs/contexts/wagmi";
import AuthProvider from "@/libs/contexts/auth";
import ValidateProvider from "@/libs/contexts/auth/validate";
import AxiosProvider from "@/libs/contexts/axios";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/configs/wagmi";
import { headers } from "next/headers";
import { cn } from "@/libs/utils/cn";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "DegenSea - NFTs for the people, by the people",
  description:
    "Create and Launching your own NFTs Collections/Campaign with DegenSea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wagmiInitialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en">
      <body className={cn(kanit.variable, "antialiased")}>
        <Web3Providers initialState={wagmiInitialState}>
          <AuthProvider>
            <ValidateProvider>
              <AxiosProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </AxiosProvider>
            </ValidateProvider>
          </AuthProvider>
        </Web3Providers>
      </body>
    </html>
  );
}
