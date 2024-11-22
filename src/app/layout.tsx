import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth/next";
import NextAuthProvider from "@/app/providers";

import Header from "@/app/_components/header/header";
import { nextAuthOptions } from "@/app/_utils/next-auth-options";
import { UIProvider } from "@yamada-ui/react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const mPlus = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-m-plus",
  display: "swap",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="ja">
      <body className={`${mPlus.className}`}>
        {/* YamadaUIの初期設定 ハイドレートエラーが出る　 */}
        {/* <YamadaUIScripts /> */}
        <UIProvider>
          <NextAuthProvider>
            <Header session={session} />
            {children}
          </NextAuthProvider>
        </UIProvider>
      </body>
    </html>
  );
}
