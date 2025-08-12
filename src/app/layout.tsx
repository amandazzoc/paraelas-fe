import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Para Elas - Cadastro",
  description: "Cadastro das mulheres para o evento Para Elas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#a823d2",
            },
          }}
        >
            {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
