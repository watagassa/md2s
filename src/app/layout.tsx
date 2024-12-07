import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
// import "./globals.css";

import { getServerSession } from "next-auth/next";
import NextAuthProvider from "@/app/providers";

import { nextAuthOptions } from "@/app/_utils/nextAuth/next-auth-options";
import { UIProvider } from "@yamada-ui/react";
import Header from "./_components/myHeader/myHeader";

export const metadata: Metadata = {
  title: "MD2S",
  description:
    "MD2Sは、知識を文書とスライドで記録・共有するためのサービスです。Markdownで書いた文章を入力することでスライドが自動で生成されます。",
  icons: {
    icon: '/favicon.ico',
  }
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
